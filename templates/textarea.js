module.exports = function(spec) {
 return [
   '<div class="form-group">',
   (spec.label ? '<label for="' + spec.id + '">' + spec.label + '</label>' : ''),
   '<textarea id="',
   spec.id,
   '" name="',
   spec.name,
   '" class="form-control">',
   spec.value,
   '</textarea>',
   '</div>'
 ].join('');
};
