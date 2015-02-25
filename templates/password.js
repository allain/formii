module.exports = function(spec) {
  return [
    '<input type="password" id="',
    spec.id,
    '" name="',
    spec.name,
    '"',
    spec.value ? ' value="' + spec.value + '"' : '',
    '>'
  ].join('');
};