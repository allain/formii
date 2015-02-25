module.exports = function(spec) {
  return [
    '<div class="checkbox">',
    '<label for="', spec.id, '">',
    '<input type="checkbox" id="', spec.id, '" name="', spec.name, '" value="1"', ( spec.value ? ' checked="checked"' : ''), '>',
    (spec.label ? ' ' + spec.label : ''),
    '</label>',
    '</div>'
  ].join('');
};
