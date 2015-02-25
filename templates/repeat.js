module.exports = function(spec) {
  return [
    '<div class="repeat">',
    spec.label ? ['<div class="repeat-heading">', spec.label, '</div>'].join('') : '',
    spec.repeated.map(function(r) {
      return [
        '<div class="repeated">',
        '<div class="fields">',
        r.fields,
        '</div>',
        r.removable ? [
          '<div class="actions">',
          '<button data-action="remove-repeated">Remove</button>',
          '</div>'
        ].join('') : '',
        '</div>'
      ].join('');
    }).join(''),
    '</div>'
  ].join('');
};
