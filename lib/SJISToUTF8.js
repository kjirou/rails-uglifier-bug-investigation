function SJISToUTF8(data) {
  config.init_JIS_TO_UTF8_TABLE();

  var results = [];
  var i = 0;
  var len = data && data.length;
  var b, b1, b2, u2, u3, jis, utf8;

  for (; i < len; i++) {
    b = data[i];
    if (b >= 0xA1 && b <= 0xDF) {
      b2 = b - 0x40;
      u2 = 0xBC | ((b2 >> 6) & 0x03);
      u3 = 0x80 | (b2 & 0x3F);

      results[results.length] = 0xEF;
      results[results.length] = u2 & 0xFF;
      results[results.length] = u3 & 0xFF;
    } else if (b >= 0x80) {
      b1 = b << 1;
      b2 = data[++i];

      if (b2 < 0x9F) {
        if (b1 < 0x13F) {
          b1 -= 0xE1;
        } else {
          b1 -= 0x61;
        }

        if (b2 > 0x7E) {
          b2 -= 0x20;
        } else {
          b2 -= 0x1F;
        }
      } else {
        if (b1 < 0x13F) {
          b1 -= 0xE0;
        } else {
          b1 -= 0x60;
        }
        b2 -= 0x7E;
      }

      b1 &= 0xFF;
      jis = (b1 << 8) + b2;

      utf8 = EncodingTable.JIS_TO_UTF8_TABLE[jis];
      if (utf8 === void 0) {
        results[results.length] = config.UNKNOWN_CHARACTER;
      } else {
        if (utf8 < 0xFFFF) {
          results[results.length] = utf8 >> 8 & 0xFF;
          results[results.length] = utf8 & 0xFF;
        } else {
          results[results.length] = utf8 >> 16 & 0xFF;
          results[results.length] = utf8 >> 8 & 0xFF;
          results[results.length] = utf8 & 0xFF;
        }
      }
    } else {
      results[results.length] = data[i] & 0xFF;
    }
  }

  return results;
}

module.exports = SJISToUTF8;
