var defaults = require('defaults');
var Handlebars = require('handlebars');

module.exports = Formii;

function Formii(specs, options) {
  options = defaults(options, {
    templates: {
      text: '<input type="text" id="{{name}}" name="{{name}}">',
      checkbox: '<input type="checkbox" id="{{name}}" name="{{name}}" value="{{#if value}}{{value}}{{else}}1{{/if}}">',
      password: '<input type="password" id="{{name}}" name="{{name}}">',
      radio: '{{#each options}}<div class="option"><input type="radio" name="{{../name}}" id="{{../name}}" value="{{value}}"><label>{{label}}</label></div>{{/each}}',
      select: '<select name="{{name}}" id="{{name}}">{{#each options}}<option value="{{value}}">{{label}}</option>{{/each}}</select>'
    }
  });

  Object.keys(options.templates).forEach(function(templateName) {
    options.templates[templateName] = Handlebars.compile(options.templates[templateName]);
  });

  if (!(this instanceof Formii)) {
    return new Formii(spec, options);
  }

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