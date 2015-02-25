module.exports = function(spec) {
  return [
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
    '</select>'
  ].join('');
};