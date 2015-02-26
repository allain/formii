module.exports = function(spec) {
  return [
    '<div class="repeat form-group">',
    spec.label ? ['<label>', spec.label, '</label>'].join('') : '',
    spec.repeated.map(function(r, index) {
      return [
        '<div class="repeated">',
        '<div class="fields">',
        r.fields,
        '</div>',
        r.removable ? [
          '<div class="actions">',
          '<button data-action="delete" data-path="', r.id , '" type="button">Remove</button>',
          '</div>'
        ].join('') : '',
        '</div>'
      ].join('');
    }).join(''),
    '</div>'
  ].join('');
};
