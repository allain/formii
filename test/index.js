'use strict';

var assert = require('chai').assert;
var Formii = require('..');

describe('Formii', function () {
  it('can be created with minimal options', function () {
    var f = new Formii([]);

    assert(f instanceof Formii);
  });

  it.skip('renders with label if field specifies one', function() {
    var f = new Formii([
      {type: 'text', name: 'a', label: 'A'}
    ]);

    assert.equal(
      '<form class="form"><div class="field"><label for="a">A</label><input type="text" id="a" name="a"></div></form>',
      f.html()
    );
  });

  it('specifying html string injects as is', function() {
    var f = new Formii([
      '<section>',
      '</section>'
    ]);

    assert.equal(
      '<form class="form"><section></section></form>',
      f.html()
    );
  });

  describe('field types', function () {
    describe('text,password,email', function() {
      it('renders simple case', function () {
        ['email', 'text', 'password'].forEach(function(type) {
          var f = new Formii([
            {name: 'a', type: type}
          ]);

          assert.equal([
              '<form class="form">',
              '<div class="form-group">',
              '<input type="', type, '" class="form-control" id="a" name="a">',
              '</div>',
              '</form>'
          ].join(''), f.html());
        });
      });

      it('renders with value from doc', function () {
        ['email', 'text', 'password'].forEach(function(type) {
          var f = new Formii([
            {name: 'a', type: type}
          ]);

          assert.equal([
              '<form class="form">',
              '<div class="form-group">',
              '<input type="', type, '" class="form-control" id="a" name="a" value="T">',
              '</div>',
              '</form>'
          ].join(''), f.html({a: 'T'}));
        });
      });
    });

    describe('checkbox', function() {
      it('renders simple case', function () {
        var f = new Formii([
          {name: 'a', type: 'checkbox'}
        ]);

        assert.equal('<form class="form"><div class="checkbox"><label for="a"><input type="checkbox" id="a" name="a" value="1"></label></div></form>', f.html());
      });

      it('renders with label properly', function () {
        var f = new Formii([
          {name: 'a', type: 'checkbox', label: 'Test'}
        ]);

        assert.equal('<form class="form"><div class="checkbox"><label for="a"><input type="checkbox" id="a" name="a" value="1"> Test</label></div></form>', f.html());
      });

      it('renders with value', function() {
        var f = new Formii([
          {name: 'a', type: 'checkbox'},
          {name: 'b', type: 'checkbox'},
          {name: 'c', type: 'checkbox'},
        ]);

        assert.equal(
          [
            '<form class="form">',
            '<div class="checkbox">',
            '<label for="a"><input type="checkbox" id="a" name="a" value="1" checked="checked"></label>',
            '</div>',
            '<div class="checkbox">',
            '<label for="b"><input type="checkbox" id="b" name="b" value="1"></label>',
            '</div>',
            '<div class="checkbox">',
            '<label for="c"><input type="checkbox" id="c" name="c" value="1"></label>',
            '</div>',
            '</form>'
          ].join(''),
          f.html({a: 1, b: 0})
        );
      });
    });

    describe('textarea', function() {
      it('renders simple case', function() {
        var f = new Formii([
          {name: 'a', type: 'textarea'}
        ]);

        assert.equal(
          '<form class="form"><div class="form-group"><textarea id="a" name="a"></textarea></div></form>',
          f.html()
        );
      });

      it('renders with value', function() {
        var f = new Formii([
          {name: 'a', type: 'textarea'}
        ]);

        assert.equal(
          '<form class="form"><div class="form-group"><textarea id="a" name="a">Testing</textarea></div></form>',
          f.html({a: 'Testing'})
        );
      });

    });

    describe('radio', function() {
      it('renders simple case', function () {
        var f = new Formii([
          {name: 'a', type: 'radio', options: [
            {value: 'b', label: 'B'},
            {value: 'c', label: 'C'}
          ]}
        ]);

        assert.equal([
          '<form class="form">',
          '<div class="radio">',
          '<label for="a"><input type="radio" id="a" name="a" value="b"> B</label>',
          '</div>',
          '<div class="radio">',
          '<label for="a"><input type="radio" id="a" name="a" value="c"> C</label>',
          '</div>',
          '</form>'
        ].join(''), f.html());
      });

      it('supports value', function () {
        var f = new Formii([
          {name: 'a', type: 'radio', options: [
            {value: 'b', label: 'B'},
            {value: 'c', label: 'C'}
          ]}
        ]);

        assert.equal([
          '<form class="form">',
          '<div class="radio">',
          '<label for="a"><input type="radio" id="a" name="a" value="b"> B</label>',
          '</div>',
          '<div class="radio">',
          '<label for="a"><input type="radio" id="a" name="a" value="c" checked="checked"> C</label>',
          '</div>',
          '</form>'
        ].join(''), f.html({a: 'c'}));
      });

      it('supports default value', function () {
        var f = new Formii([
          {name: 'a', type: 'radio', options: [
            {value: 'b', label: 'B', default: true},
            {value: 'c', label: 'C'}
          ]}
        ]);

        assert.equal([
          '<form class="form">',
          '<div class="radio">',
          '<label for="a"><input type="radio" id="a" name="a" value="b" checked="checked"> B</label>',
          '</div>',
          '<div class="radio">',
          '<label for="a"><input type="radio" id="a" name="a" value="c"> C</label>',
          '</div>',
          '</form>'
        ].join(''), f.html());
      });
    });

    describe('select', function() {
      it('renders basic case', function () {
        var f = new Formii([
          {name: 'a', type: 'select', options: [
            {value: 'b', label: 'B'},
            {value: 'c', label: 'C'}
          ]}
        ]);

        assert.equal([
          '<form class="form">',
          '<div class="form-group">',
          '<select id="a" name="a">',
          '<option value="b">B</option>',
          '<option value="c">C</option>',
          '</select>',
          '</div>',
          '</form>'
        ].join(''), f.html());
      });

      it('supports value', function () {
        var f = new Formii([
          {name: 'a', type: 'select', options: [
            {value: 'b', label: 'B'},
            {value: 'c', label: 'C'}
          ]}
        ]);

        assert.equal([
          '<form class="form">',
          '<div class="form-group">',
          '<select id="a" name="a">',
          '<option value="b">B</option>',
          '<option value="c" selected="selected">C</option>',
          '</select>',
          '</div>',
          '</form>'
        ].join(''), f.html({a: 'c'}));
      });

      it('supports default', function () {
        var f = new Formii([
          {name: 'a', type: 'select', options: [
            {value: 'b', label: 'B', default: true},
            {value: 'c', label: 'C'}
          ]}
        ]);

        assert.equal([
          '<form class="form">',
          '<div class="form-group">',
          '<select id="a" name="a">',
          '<option value="b" selected="selected">B</option>',
          '<option value="c">C</option>',
          '</select>',
          '</div>',
          '</form>'
        ].join(''), f.html());
      });
    });

    describe('fieldset', function() {
      it('renders simple case', function() {
        var f = new Formii([
          {
            type: 'fieldset',
            fields: [
              '<test>'
            ]
          }
        ]);

        assert.equal([
          '<form class="form">',
          '<fieldset>',
          '<test>',
          '</fieldset>',
          '</form>'
        ].join(''), f.html());
      });

      it('renders label as legend', function() {
        var f = new Formii([
          {
            type: 'fieldset',
            label: 'Fieldset',
            fields: [
              '<test>'
            ]
          }
        ]);

        assert.equal([
          '<form class="form">',
          '<fieldset>',
          '<legend>Fieldset</legend>',
          '<test>',
          '</fieldset>',
          '</form>'
        ].join(''), f.html());
      });
    });

    describe('repeat', function() {
      it('renders simple case', function() {
        var f = new Formii([
          {
            type: 'repeat',
            name: 'items',
            fields: [
              '<test>'
            ]
          }
        ]);

        assert.equal(
          f.html(), [
            '<form class="form">',
            '<div class="repeat">',
            '<div class="repeated">',
            '<div class="fields">',
            '<test>',
            '</div>',
            '</div>',
            '</div>',
            '</form>'
          ].join(''));
      });

      it('renders multiple when items given', function() {
        var f = new Formii([
          {
            type: 'repeat',
            name: 'items',
            fields: [
              '<test>'
            ]
          }
        ]);

        assert.equal([
          '<form class="form">',
          '<div class="repeat">',
          '<div class="repeated">',
          '<div class="fields">',
          '<test>',
          '</div>',
          '<div class="actions">',
          '<button data-action="remove-repeated">Remove</button>',
          '</div>',
          '</div>',
          '<div class="repeated">',
          '<div class="fields">',
          '<test>',
          '</div>',
          '<div class="actions">',
          '<button data-action="remove-repeated">Remove</button>',
          '</div>',
          '</div>',
          '<div class="repeated">',
          '<div class="fields">',
          '<test>',
          '</div>',
          '</div>',
          '</div>',
          '</form>'
        ].join(''), f.html({
          items: [
            {item: 'A'},
            {item: 'B'}
          ]
        }));
      });
    });
  });
});
