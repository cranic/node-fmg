## FakeMailGenerator

This is a package that can be used to interact with [FakeMailGenerator][0]

### Installing

Create your project and `npm install --save fmg2` and you are ready to go.

### Using

`fmg2` provides two methods, `watch` and `fetchDomains`.

```javascript
var fmg = require('fmg2');
fmg.watch('somefmgmail@rhyta.com').on('email', function(msg){
    console.log('We got e-mails!', msg);
});

// Grab all domains availables
fmg.fetchDomains(function(err, domains){
    if(err)
        throw err; //Oh oh..

    console.log('This is an array with domain names', domains);
});
```

### To do

* Tests
* Code cleaning
* Documentation
* More todos

### License

(The MIT License)

Copyright (c) 2009-2013 Leonardo Gatica

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


[0]: http://fakemailgenerator.com
