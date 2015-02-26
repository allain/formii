var Formii = require('..');

var form = new Formii([
  '<h2>Standard Form Fields</h2>',
  '<h3>Email Fields</h3>',
  {type: 'email', name: 'email', label: 'Email'},
  {type: 'password', name: 'password', label: 'Password'},
  {type: 'select', name: 'select1', label: 'Favorite Fruit', options: [
    {value: 'apple', label: 'Apple'},
    {value: 'orange', label: 'Orange'}
  ]},

  {type: 'radio', name: 'radio1', label: 'Favorite Colour', value: 'yellow', options: [
    {value: 'yellow', label: 'Yellow'},
    {value: 'green', label: 'Green'}
  ]},

  {type: 'checkbox', name: 'rememberMe', label: 'remember me'},
  '<h3>Dynamic Todos</h3>',
  {type: 'repeat', label: 'Items', name: 'items', fields: [
    {type: 'text', name: 'item'},
    {type: 'textarea', name: 'notes'}
  ]}
]);


var binding = form.bind(document.getElementById('container'), {
  email: 'allain.lalonde@gmail.com',
  favoriteFruit: 'orange',  
  rememberMe: 1,
  items: [
    {item: 'item A'},
    {item: 'item B'}
  ]
});

var jsonElement = document.getElementById('json');
binding.on('change', function(doc) {
  jsonElement.value = JSON.stringify(doc, undefined, 2);
});

jsonElement.addEventListener("change", function() {
  var newJSON = JSON.parse(this.value);
  binding.update(newJSON);
});
