module.exports = function(spec) {
  return [
    '<fieldset>',
    spec.label ? ['<legend>', spec.label, '</legend>'].join('') : '',
    spec.fields,
    '</fieldset>'
  ].join('');
};
