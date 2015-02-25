module.exports = function(spec) {
  return [
    '<input type="text" id="',
    spec.id,
    '" name="',
    spec.name,
    '"',
    spec.value ? ' value="' + spec.value + '"' : '',
    '>'
  ].join('');
};