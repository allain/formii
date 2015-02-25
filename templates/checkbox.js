module.exports = function(spec) {
  return [
    '<input type="checkbox" id="' + spec.id + '" name="' + spec.name + '" value="1"',
    spec.value ? ' checked="checked"' : '',
    '>'
  ].join('');
};