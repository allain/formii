var assert = require('chai').assert;
var Formii = require('..');

describe('Formii', function () {
  it('can be created with minimal options', function (done) {
    var f = new Formii([]);

    assert(f instanceof Formii);
    done();
  });

  describe('field types', function (done) {
    it('text type', function (done) {
      var f = new Formii([
        {name: 'a', type: 'text'}
      ]);

      assert.equal('<div class="fields"><div class="field"><input type="text" id="a" name="a"></div></div>', f.html());
      done();
    });

    it('checkbox type', function (done) {
      var f = new Formii([
        {name: 'a', type: 'checkbox'}
      ]);

      assert.equal('<div class="fields"><div class="field"><input type="checkbox" id="a" name="a" value="1"></div></div>', f.html());
      done();
    });

    it('password type', function (done) {
      var f = new Formii([
        {name: 'a', type: 'password'}
      ]);

      assert.equal('<div class="fields"><div class="field"><input type="password" id="a" name="a"></div></div>', f.html());
      done();
    });

    it('radio type', function (done) {
      var f = new Formii([
        {name: 'a', type: 'radio', options: [
          {value: 'b', label: 'B'},
          {value: 'c', label: 'C'},
        ]}
      ]);

      assert.equal([
        '<div class="fields">',
        '<div class="field">',
        '<div class="option">',
        '<input type="radio" name="a" id="a" value="b">',
        '<label>B</label>',
        '</div>',
        '<div class="option">',
        '<input type="radio" name="a" id="a" value="c">',
        '<label>C</label>',
        '</div>',
        '</div>',
        '</div>'].join(''), f.html());
      done();
    });

    it('select type', function (done) {
      var f = new Formii([
        {name: 'a', type: 'select', options: [
          {value: 'b', label: 'B'},
          {value: 'c', label: 'C'},
        ]}
      ]);

      assert.equal([
        '<div class="fields">',
        '<div class="field">',
        '<select name="a" id="a">',
        '<option value="b">B</option>',
        '<option value="c">C</option>',
        '</select>',
        '</div>',
        '</div>'
      ].join(''), f.html());
      done();
    });
  });

});
