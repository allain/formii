module.exports = function(spec) {
  return (spec.options || []).map(function(option) {
    return [
      '<div class="option">',
      '<input type="radio" id="',
      spec.id,
      '" name="',
      spec.name,
      '" value="',
      option.value,
      '"',
      option.active ? ' checked="checked"' : '',
      '>',
      '<label>',
      option.label,
      '</label>',
      '</div>'
    ].join('');
  }).join('');
};

