module.exports = function(spec) {
  return (spec.options || []).map(function(option) {
    return [
    '<div class="radio">',
    '<label for="', spec.id, '">',
    '<input type="radio" id="', spec.id, '" name="', spec.name, '" value="', option.value, '"', ( option.active ? ' checked="checked"' : ''), '>',
    (option.label ? ' ' + option.label : ''),
    '</label>',
    '</div>'
    ].join('');
  }).join('');
};
