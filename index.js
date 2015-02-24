var defaults = require('defaults');
var Handlebars = require('handlebars');

module.exports = Formii;

function Formii(specs, options) {
  if (!(this instanceof Formii)) {
    return new Formii(spec, options);
  }

  options = defaults(options, {
    templates: {
      text: '<input type="text" id="{{name}}" name="{{name}}">',
      checkbox: '<input type="checkbox" id="{{name}}" name="{{name}}" value="{{#if value}}{{value}}{{else}}1{{/if}}">',
      password: '<input type="password" id="{{name}}" name="{{name}}">',
      radio: '{{#each options}}<div class="option"><input type="radio" id="{{../name}}" name="{{../name}}" value="{{value}}"><label>{{label}}</label></div>{{/each}}',
      select: '<select id="{{name}}" name="{{name}}">{{#each options}}<option value="{{value}}">{{label}}</option>{{/each}}</select>',
      textarea: '<textarea id="{{name}}" name="{{name}}">{{value}}</textarea>'
    }
  });

  Object.keys(options.templates).forEach(function(templateName) {
    options.templates[templateName] = Handlebars.compile(options.templates[templateName]);
  });



  this.html = function() {
    return flatten([
      '<div class="fields">',
      specs.map(function(spec) {
        var generator = options.templates[spec.type];

        if (!generator) {
          return '<!-- unknown type: ' + spec.type + ' -->';
        }

        return ['<div class="field">', generator(spec, options), '</div>'];
      }),
      '</div>'
    ]).filter(Boolean).join('');
  };
}

function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}