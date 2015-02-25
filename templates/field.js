// because a lot of html fields share the same structure this helper exists
module.exports = function(type, spec) {
  return [
    '<div class="form-group">',
    (spec.label ? '<label for="' + spec.id + '">' + spec.label + '</label>' : ''),
    '<input type="', spec.type, '" class="form-control" id="', spec.id, '" name="', spec.name, '"', (spec.value ? ' value="' + spec.value + '"' : ''), '>',
    '</div>'
  ].join('');
};
