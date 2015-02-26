# formii

A simple form data-binding and builder tool for use with browserify.

Performs data binding against a JSON object that changes based on what the form looks like.

## Installation

This module is installed via npm:

``` bash
$ npm install --save formii
```

## Example Usage

``` js
var Formii = require('formii');

var form = new Formii([
  {type: 'email', name: 'email', label: 'Email'},
  {type: 'password', name: 'password', label: 'Password'},
  {type: 'text', name: 'tick', label: 'Tick'},
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

var doc = {
  email: 'allain.lalonde@gmail.com',
  favoriteFruit: 'orange',
  rememberMe: true,
  tick: 0,
  items: [
    {item: 'item A'},
    {item: 'item B'}
  ]
};

var binding = form.bind(document.getElementById('container'), doc);

binding.on('change', function(doc) {
  console.log(doc);
});

setInterval(function() {
  doc.tick ++;
  binding.update(doc);
}, 10000);
```
