var Formii = require('..');

var form = new Formii([
  {type: 'email', name: 'email', label: 'Email'},
  {type: 'password', name: 'password', label: 'Password'},
  {type: 'fieldset', label: 'Options', fields: [
    {type: 'select', name: 'favoriteFruit', options: [
      {value: 'apple', label: 'Apple'},
      {value: 'orange', label: 'Orange'}
    ]},
    {type: 'checkbox', name: 'rememberMe', value: 1}
  ]},
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