module.exports = function(spec) {
  return [
    '<div class="repeat form-group">',
    spec.label ? ['<label>', spec.label, '</div>'].join('') : '',
    spec.repeated.map(function(r) {
      return [
        '<div class="repeated">',
        '<div class="fields">',
        r.fields,
        '</div>',
        r.removable ? [
          '<div class="actions">',
          '<button data-action="remove-repeated" type="button">Remove</button>',
          '</div>'
        ].join('') : '',
        '</div>'
      ].join('');
    }).join(''),
    '</div>'
  ].join('');
};
