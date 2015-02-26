module.exports = function(spec) {
  var parts = [
    '<div class="form-group">'
  ];

  if (spec.label) {
    parts.push('<label>' + spec.label + '</label>');
  }

  parts.push((spec.options || []).map(function(option) {
    return [
    '<div class="radio">',
    '<label for="', spec.id, '">',
    '<input type="radio" id="', spec.id, '" name="', spec.name, '" value="', option.value, '"', ( option.active ? ' checked="checked"' : ''), '>',
    (option.label ? ' ' + option.label : ''),
    '</label>',
    '</div>'
    ].join('');
  }).join(''));

  parts.push('</div>');
  
  return parts.join('');
};
