module.exports = Formii;

function Formii(specs, options) {
  if (!(this instanceof Formii)) {
    return new Formii(specs, options);
  }

  options = options || {};

  var templates = {
    text: require('./templates/text'),
    email: require('./templates/email'),
    checkbox: require('./templates/checkbox'),
    password: require('./templates/password'),
    radio: require('./templates/radio'),
    select: require('./templates/select'),
    textarea: require('./templates/textarea'),
    fieldset: require('./templates/fieldset'),
    repeat: require('./templates/repeat'),
    field: require('./templates/field')
  };

  // Override built-in templates
  Object.keys(options.templates || {}).forEach(function(templateName) {
    templates[templateName] = options.templates[templateName];
  });

  this.html = function(doc) {
    return flatten([
      '<div class="form">',
      generateFields(specs, doc || {}),
      '</div>'
    ]).filter(Boolean).join('');
  };

  function generateFields(specs, doc, prefix) {
    prefix = prefix || '';

    var field = templates.field;

    var generatedFields = specs.map(function(spec) {
      if (typeof spec === 'string') {
        return spec;
      }

      var generator = templates[spec.type];

      if (!generator) {
        return '<!-- unknown type: ' + spec.type + ' -->';
      }

      if (spec.type === 'fieldset') {
        return generator({label: spec.label, fields: generateFields(spec.fields, doc, prefix)}, options);
      }

      if (spec.type === 'repeat') {
        var repeated = (doc[spec.name] || []).map(function(item, index) {
          return {removable: true, fields: generateFields(spec.fields, item, p([prefix, spec.name, index]))};
        });
        repeated.push({removable: false, fields: generateFields(spec.fields, {}, p([prefix, spec.name, (doc[spec.name] || []).length]))});

        return generator({label: spec.label, repeated: repeated});
      }

      spec.value = doc[spec.name];
      spec.id = p([prefix, spec.name]);

      if (spec.type === 'radio' || spec.type === 'select') {
        activateOption(spec.options, hasValue(spec.value)) || activateOption(spec.options, isDefault);
      }

      return field({name: spec.name, label: spec.label, control: generator(spec)});
    });

    return flatten(generatedFields).filter(Boolean).join('');
  }
}

function p(parts) {
  return parts.filter(function(part) {
    return part !== '';
  }).join('-');
}

function hasValue(value) {
  return function(obj) {
    return obj.value === value;
  };
}

function isDefault(obj) {
  return !!obj.default;
}

function activateOption(options, criteria) {
  var activeOption = options.filter(criteria)[0];
  if (activeOption) {
    activeOption.active = true;
  }
  return !!activeOption;
}

function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}
