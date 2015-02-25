var Formii = require('..');

var form = new Formii([
  '<h2>Standard Form Fields</h2>',
  '<h3>Email Fields</h3>',
  {type: 'email', name: 'email1'},
  {type: 'email', name: 'email2', label: 'Labelled'},

  '<h3>Password Fields</h3>',
  {type: 'password', name: 'password'},
  {type: 'password', name: 'password2', label: 'Labelled'},

  '<h3>Select</h3>',
  {type: 'select', name: 'select1', label: 'Favorite Fruit', options: [
    {value: 'apple', label: 'Apple'},
    {value: 'orange', label: 'Orange'}
  ]},
  {type: 'select', name: 'select2', options: [
    {value: 'apple', label: 'Apple'},
    {value: 'orange', label: 'Orange'}
  ]},

  '<h3>Radio</h3>',
  {type: 'radio', name: 'radio1', label: 'Favorite Fruit', options: [
    {value: 'apple', label: 'Apple'},
    {value: 'orange', label: 'Orange'}
  ]},
  {type: 'radio', name: 'radio2', options: [
    {value: 'apple', label: 'Apple'},
    {value: 'orange', label: 'Orange'}
  ]},

  '<h3>Checkbox</h3>',
  {type: 'checkbox', name: 'rememberMe', label: 'remember me'},

  '<h2>Dyanmic Fields</h2>',
  '<h3>Repeat</h3>',
  {type: 'repeat', label: 'Items', name: 'items', fields: [
    {type: 'text', name: 'item'}
  ]}
]);

document.getElementById('container').innerHTML = form.html({
  email: 'allain.lalonde@gmail.com',
  favoriteFruit: 'orange',
  rememberMe: 1,
  items: [
    {item: 'item A'},
    {item: 'item B'}
  ]
});
