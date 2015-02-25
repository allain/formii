module.exports = function(spec) {
 return [
   '<textarea id="',
   spec.id,
   '" name="',
   spec.name,
   '">',
   spec.value,
   '</textarea>'
 ].join('');
};