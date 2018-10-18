// 手動整形中...
function SJISToUTF8(data) {
  config.init_JIS_TO_UTF8_TABLE();

  var o = []; // results
  var h = 0; // i
  var len = data && data.length;
  var b, b1, b2, jis, utf8;

  for (var e, _; h < len; h++) {
    b = data[h];

    if (161 <= b && b <= 223) {
      o[o.length] = ((e = 188 | (((b2 = b - 64) >> 6) & 3)),
        (_ = 128 | (63 & b2)),
        (o[o.length] = 239),
        (o[o.length] = 255 & e),
        255 & _);
    } else if (128 <= b) {
      b1 = b << 1;
      b2 = data[++h];

      if (b2 < 159) {
        (b1 -= b1 < 319 ? 225 : 97);
        (b2 -= 126 < b2 ? 32 : 31);
      } else {
        (b1 -= b1 < 319 ? 224 : 96);
        (b2 -= 126);
      }

      b1 &= 255
      jis = (b1 << 8) + b2;

      o[o.length] = (
        void 0 === (utf8 = EncodingTable.JIS_TO_UTF8_TABLE[jis])
          ? config.UNKNOWN_CHARACTER
          : ((o[o.length] = (utf8 < 65535 || (o[o.length] = (utf8 >> 16) & 255),
            (utf8 >> 8) & 255)),
            255 & utf8)
      );
    } else {
      o[o.length] = 255 & data[h];
    }
  }

  return o;
}

// オリジナルから prettier で整形した直後
function _SJISToUTF8(n) {
  config.init_JIS_TO_UTF8_TABLE();
  for (var T, g, t, e, _, i, l, o = [], h = 0, c = n && n.length; h < c; h++)
    (T = n[h]),
      (o[o.length] =
        161 <= T && T <= 223
          ? ((e = 188 | (((t = T - 64) >> 6) & 3)),
            (_ = 128 | (63 & t)),
            (o[o.length] = 239),
            (o[o.length] = 255 & e),
            255 & _)
          : 128 <= T
            ? ((g = T << 1),
              (t = n[++h]) < 159
                ? ((g -= g < 319 ? 225 : 97), (t -= 126 < t ? 32 : 31))
                : ((g -= g < 319 ? 224 : 96), (t -= 126)),
              (i = ((g &= 255) << 8) + t),
              void 0 === (l = EncodingTable.JIS_TO_UTF8_TABLE[i])
                ? config.UNKNOWN_CHARACTER
                : ((o[o.length] = (l < 65535 || (o[o.length] = (l >> 16) & 255),
                  (l >> 8) & 255)),
                  255 & l))
            : 255 & n[h]);
  return o;
}

module.exports = SJISToUTF8;
