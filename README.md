# node-calais

Open Calais SDK for node.js.

## Install

Install using npm:
```sh
    $ npm install node-calais
```

## Usage

```javascript
const Calais = require('./index')
const calais = new Calais('<YOUR API KEY>')
const content = 'The Federal Reserve is the enemy of Ron Paul.'
calais.exec(content)
  .then(res => console.log(JSON.stringify(res)))
  .catch(err => console.error(err))
```

## Test

Run tests:
```sh
    $ npm test
```

Tested with node.js v4.0+

## License
The MIT License (MIT)

Copyright (c) 2016