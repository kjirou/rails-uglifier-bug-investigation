const assert = require('assert');
const fs = require('fs');

global.config = {
  UNKNOWN_CHARACTER: 34,
  init_JIS_TO_UTF8_TABLE: () => {},
};
global.EncodingTable = {
  JIS_TO_UTF8_TABLE: JSON.parse(fs.readFileSync(__dirname + '/../data/JIS_TO_UTF8_TABLE-dev.json')),
};

const compressed = require('../lib/SJISToUTF8-compressed-and-formatted');
const original = require('../lib/SJISToUTF8');

const SAMPLE_INPUT_JSON = JSON.parse(fs.readFileSync(__dirname + '/../data/input.json'));
const SAMPLE_INPUT = new Uint8Array(
  Object.assign({}, SAMPLE_INPUT_JSON, {
    length: Object.keys(SAMPLE_INPUT_JSON).length,
  })
);
const SAMPLE_VALID_OUTPUT = JSON.parse(fs.readFileSync(__dirname + '/../data/output-valid.json'));
const SAMPLE_INVALID_OUTPUT = JSON.parse(fs.readFileSync(__dirname + '/../data/output-invalid.json'));

describe('rails-uglifier-bug-investigation', function() {
  describe('compressed', function() {
    it('間違った挙動が間違ったままである', function() {
      assert.deepStrictEqual(
        compressed(SAMPLE_INPUT),
        SAMPLE_INVALID_OUTPUT
      );
    });
  });

  describe('original', function() {
    it('正しい挙動が正しいままである', function() {
      assert.deepStrictEqual(
        original(SAMPLE_INPUT),
        SAMPLE_VALID_OUTPUT
      );
    });
  });
});
