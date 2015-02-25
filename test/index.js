'use strict';

var assert = require('chai').assert;
var Formii = require('..');

describe('Formii', function () {
  it('can be created with minimal options', function (done) {
    var f = new Formii([]);

    assert(f instanceof Formii);
    done();
  });

  it('renders with label if field specifies one', function(done) {
    var f = new Formii([
      {type: 'text', name: 'a', label: 'A'}
    ]);

    assert.equal(
      '<div class="form"><div class="field"><label for="a">A</label><input type="text" id="a" name="a"></div></div>',
      f.html()
    );
    done();
  });

  it('specifying html string injects as is', function(done) {
    var f = new Formii([
      '<section>',
      '</section>'
    ]);

    assert.equal(
      '<div class="form"><section></section></div>',
      f.html()
    );
    done();
  });

  describe('field types', function () {
    describe('text', function() {
      it('renders simple case', function (done) {
        var f = new Formii([
          {name: 'a', type: 'text'}
        ]);

        assert.equal('<div class="form"><div class="field"><input type="text" id="a" name="a"></div></div>', f.html());
        done();
      });

      it('renders with value from doc', function (done) {
        var f = new Formii([
          {name: 'a', type: 'text'}
        ]);

        assert.equal('<div class="form"><div class="field"><input type="text" id="a" name="a" value="hello"></div></div>', f.html({a: 'hello'}));
        done();
      });
    });

    describe('email', function() {
      it('renders simple case', function (done) {
        var f = new Formii([
          {name: 'a', type: 'email'}
        ]);

        assert.equal('<div class="form"><div class="field"><input type="email" id="a" name="a"></div></div>', f.html());
        done();
      });
      
      it('renders with value from doc', function (done) {
        var f = new Formii([
          {name: 'a', type: 'email'}
        ]);

        assert.equal('<div class="form"><div class="field"><input type="email" id="a" name="a" value="hello@a.com"></div></div>', f.html({a: 'hello@a.com'}));
        done();
      });
    });

    describe('checkbox', function(done) {
      it('renders simple case', function (done) {
        var f = new Formii([
          {name: 'a', type: 'checkbox'}
        ]);

        assert.equal('<div class="form"><div class="field"><input type="checkbox" id="a" name="a" value="1"></div></div>', f.html());
        done();
      });

      it('renders with value', function(done) {
        var f = new Formii([
          {name: 'a', type: 'checkbox'}
        ]);

        assert.equal(
          '<div class="form"><div class="field"><input type="checkbox" id="a" name="a" value="1" checked="checked"></div></div>',
          f.html({a: 1})
        );

        assert.equal(
          '<div class="form"><div class="field"><input type="checkbox" id="a" name="a" value="1"></div></div>',
          f.html({a: 0})
        );
        done();
      });

    });

    describe('password', function() {
      it('renders simple case', function (done) {
        var f = new Formii([
          {name: 'a', type: 'password'}
        ]);

        assert.equal(
          '<div class="form"><div class="field"><input type="password" id="a" name="a"></div></div>',
          f.html()
        );

        done();
      });

      it('renders with value', function (done) {
        var f = new Formii([
          {name: 'a', type: 'password'}
        ]);

        assert.equal(
          '<div class="form"><div class="field"><input type="password" id="a" name="a" value="test"></div></div>',
          f.html({a: 'test'})
        );

        done();
      });
    });

    describe('textarea', function() {
      it('renders simple case', function(done) {
        var f = new Formii([
          {name: 'a', type: 'textarea'}
        ]);

        assert.equal(
          '<div class="form"><div class="field"><textarea id="a" name="a"></textarea></div></div>',
          f.html()
        );
        done();
      });

      it('renders with value', function(done) {
        var f = new Formii([
          {name: 'a', type: 'textarea'}
        ]);

        assert.equal(
          '<div class="form"><div class="field"><textarea id="a" name="a">Testing</textarea></div></div>',
          f.html({a: 'Testing'})
        );
        done();
      });

    });

    describe('radio', function() {
      it('renders simple case', function (done) {
        var f = new Formii([
          {name: 'a', type: 'radio', options: [
            {value: 'b', label: 'B'},
            {value: 'c', label: 'C'}
          ]}
        ]);

        assert.equal([
          '<div class="form">',
          '<div class="field">',
          '<div class="option">',
          '<input type="radio" id="a" name="a" value="b">',
          '<label>B</label>',
          '</div>',
          '<div class="option">',
          '<input type="radio" id="a" name="a" value="c">',
          '<label>C</label>',
          '</div>',
          '</div>',
          '</div>'].join(''), f.html());
        done();
      });

      it('supports value', function (done) {
        var f = new Formii([
          {name: 'a', type: 'radio', options: [
            {value: 'b', label: 'B'},
            {value: 'c', label: 'C'}
          ]}
        ]);

        assert.equal([
          '<div class="form">',
          '<div class="field">',
          '<div class="option">',
          '<input type="radio" id="a" name="a" value="b">',
          '<label>B</label>',
          '</div>',
          '<div class="option">',
          '<input type="radio" id="a" name="a" value="c" checked="checked">',
          '<label>C</label>',
          '</div>',
          '</div>',
          '</div>'].join(''),
          f.html({a: 'c'})
        );
        done();
      });

      it('supports default value', function (done) {
        var f = new Formii([
          {name: 'a', type: 'radio', options: [
            {value: 'b', label: 'B', default: true},
            {value: 'c', label: 'C'}
          ]}
        ]);

        assert.equal([
          '<div class="form">',
          '<div class="field">',
          '<div class="option">',
          '<input type="radio" id="a" name="a" value="b" checked="checked">',
          '<label>B</label>',
          '</div>',
          '<div class="option">',
          '<input type="radio" id="a" name="a" value="c">',
          '<label>C</label>',
          '</div>',
          '</div>',
          '</div>'].join(''),
          f.html()
        );
        done();
      });
    });

    describe('select', function() {
      it('renders basic case', function (done) {
        var f = new Formii([
          {name: 'a', type: 'select', options: [
            {value: 'b', label: 'B'},
            {value: 'c', label: 'C'}
          ]}
        ]);

        assert.equal([
          '<div class="form">',
          '<div class="field">',
          '<select id="a" name="a">',
          '<option value="b">B</option>',
          '<option value="c">C</option>',
          '</select>',
          '</div>',
          '</div>'
        ].join(''), f.html());
        done();
      });

      it('supports value', function (done) {
        var f = new Formii([
          {name: 'a', type: 'select', options: [
            {value: 'b', label: 'B'},
            {value: 'c', label: 'C'}
          ]}
        ]);

        assert.equal([
          '<div class="form">',
          '<div class="field">',
          '<select id="a" name="a">',
          '<option value="b">B</option>',
          '<option value="c" selected="selected">C</option>',
          '</select>',
          '</div>',
          '</div>'
        ].join(''), f.html({a: 'c'}));
        done();
      });

      it('supports default', function (done) {
        var f = new Formii([
          {name: 'a', type: 'select', options: [
            {value: 'b', label: 'B', default: true},
            {value: 'c', label: 'C'}
          ]}
        ]);

        assert.equal([
          '<div class="form">',
          '<div class="field">',
          '<select id="a" name="a">',
          '<option value="b" selected="selected">B</option>',
          '<option value="c">C</option>',
          '</select>',
          '</div>',
          '</div>'
        ].join(''), f.html());
        done();
      });
    });

    describe('fieldset', function() {
      it('renders simple case', function(done) {
        var f = new Formii([
          {
            type: 'fieldset',
            fields: [
              {type: 'text', name: 'a'}
            ]
          }
        ]);

        assert.equal([
          '<div class="form">',
          '<fieldset>',
          '<div class="field">',
          '<input type="text" id="a" name="a">',
          '</div>',
          '</fieldset>',
          '</div>'
        ].join(''), f.html());
        done();
      });

      it('renders label as legend', function(done) {
        var f = new Formii([
          {
            type: 'fieldset',
            label: 'Fieldset',
            fields: [
              {type: 'text', name: 'a'}
            ]
          }
        ]);

        assert.equal([
          '<div class="form">',
          '<fieldset>',
          '<legend>Fieldset</legend>',
          '<div class="field">',
          '<input type="text" id="a" name="a">',
          '</div>',
          '</fieldset>',
          '</div>'
        ].join(''), f.html());
        done();
      });
    });

    describe('repeat', function() {
      it('renders simple case', function(done) {
        var f = new Formii([
          {
            type: 'repeat',
            name: 'items',
            fields: [
              {type: 'text', name: 'item'}
            ]
          }
        ]);

        assert.equal(
          f.html(), [
            '<div class="form">',
            '<div class="repeat">',
            '<div class="repeated">',
            '<div class="fields">',
            '<div class="field">',
            '<input type="text" id="items-0-item" name="item">',
            '</div>',
            '</div>',
            '</div>',
            '</div>',
            '</div>'
          ].join(''));
        done();
      });

      it('renders multiple when items given', function(done) {
        var f = new Formii([
          {
            type: 'repeat',
            name: 'items',
            fields: [
              {type: 'text', name: 'item'}
            ]
          }
        ]);

        assert.equal([
          '<div class="form">',
          '<div class="repeat">',
          '<div class="repeated">',
          '<div class="fields">',
          '<div class="field">',
          '<input type="text" id="items-0-item" name="item" value="A">',
          '</div>',
          '</div>',
          '<div class="actions">',
          '<button data-action="remove-repeated">Remove</button>',
          '</div>',
          '</div>',
          '<div class="repeated">',
          '<div class="fields">',
          '<div class="field">',
          '<input type="text" id="items-1-item" name="item" value="B">',
          '</div>',
          '</div>',
          '<div class="actions">',
          '<button data-action="remove-repeated">Remove</button>',
          '</div>',
          '</div>',
          '<div class="repeated">',
          '<div class="fields">',
          '<div class="field">',
          '<input type="text" id="items-2-item" name="item">',
          '</div>',
          '</div>',
          '</div>',
            '</div>',
          '</div>'
        ].join(''), f.html({
          items: [
            {item: 'A'},
            {item: 'B'}
          ]
        }));
        done();
      });
    });

  });

});
