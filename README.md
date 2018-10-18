# rails-uglifier-bug-investigation

## これは何？

業務で Rails に乗ってる `uglifier == 4.1.9` で圧縮した関数が壊れてるっぽくて、壊れてることの確定と、可能ならどういう構文が壊れるのかを調査するために作ったリポジトリ。

`lib/SJISToUTF8.js` は、圧縮する前のあるライブラリのある一関数。
それを `rails console` から `Uglifier.new(comments: :copyright).compress(src)` で圧縮したのが `SJISToUTF8-compressed.js`。
それを読みやすいように prettier や手で整形してたのが `SJISToUTF8-compressed-and-formatted.js`。

手で整形した時にロジックが変わらないことを検証するために、 `npm run test` で回帰テストが動くようにした。


## 結果

非圧縮のこの部分が、

```
51         if (utf8 < 0xFFFF) {
52           results[results.length] = utf8 >> 8 & 0xFF;
53           results[results.length] = utf8 & 0xFF;
54         } else {
55           results[results.length] = utf8 >> 16 & 0xFF;
56           results[results.length] = utf8 >> 8 & 0xFF;
57           results[results.length] = utf8 & 0xFF;
58         }
```

こう圧縮されてるところがおかしい、というところまではわかった。

```
39         o[o.length] = (
40           (o[o.length] = (utf8 < 65535 || (o[o.length] = (utf8 >> 16) & 255),
41           (utf8 >> 8) & 255)),
42           255 & utf8
43         );
```

`if (utf8 < 0xFFFF) {` と等価になりそうな部分が圧縮先にない。
どうやら `utf8 < 65535 || ` という風に OR になってそう。

というところまでしかわかってない。単体では再現できない。


## 関連

- https://github.com/lautis/uglifier/issues/153
- https://github.com/polygonplanet/encoding.js
  - 今回の SJISToUTF8 の元
