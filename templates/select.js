module.exports = function(spec) {
  return [
    '<div class="form-group">',
    (spec.label ? '<label for="' + spec.id + '">' + spec.label + '</label>' : ''),
    '<select id="', spec.id, '" name="', spec.name, '">',
    spec.options.map(function(s) {
      return [
        '<option value="', s.value, '"',
        s.active ? ' selected="selected"' : '',
        '>',
        s.label,
        '</option>'
      ].join('');
    }).join(''),
    '</select>',
    '</div>'
  ].join('');
};
