// rails c で
// ```
// Uglifier.new(comments: :copyright).compress(SJISToUTF8のソース)
// ```
// で変換したもの。

function SJISToUTF8(n){config.init_JIS_TO_UTF8_TABLE();for(var T,g,t,e,_,i,l,o=[],h=0,c=n&&n.length;h<c;h++)T=n[h],o[o.length]=161<=T&&T<=223?(e=188|(t=T-64)>>6&3,_=128|63&t,o[o.length]=239,o[o.length]=255&e,255&_):128<=T?(g=T<<1,(t=n[++h])<159?(g-=g<319?225:97,t-=126<t?32:31):(g-=g<319?224:96,t-=126),i=((g&=255)<<8)+t,void 0===(l=EncodingTable.JIS_TO_UTF8_TABLE[i])?config.UNKNOWN_CHARACTER:(o[o.length]=(l<65535||(o[o.length]=l>>16&255),l>>8&255),255&l)):255&n[h];return o}

module.exports = SJISToUTF8;
