module.exports = function(spec) {
  return [
    '<div class="field">',
    spec.label ? ['<label for="', spec.name, '">', spec.label, '</label>'].join('') : '',
    spec.control,
    '</div>'
  ].join('');
};