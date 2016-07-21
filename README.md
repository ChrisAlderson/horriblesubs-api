# horriblesubs-api

[![Build Status](https://travis-ci.org/ChrisAlderson/horriblesubs-api.svg?branch=master)]()
[![Dependency Status](https://david-dm.org/ChrisAlderson/horriblesubs-api.svg)](https://david-dm.org/ChrisAlderson/horriblesubs-api)
[![devDependency Status](https://david-dm.org/ChrisAlderson/horriblesubs-api/dev-status.svg)](https://david-dm.org/ChrisAlderson/horriblesubs-api#info=devDependencies)

An HorribleSubs API wrapper to get data from [horriblesubs.info](https://horriblesubs.info/).

## Usage

#### Setup
```
npm install --save horriblesubs-api
```

#### Initialize
```js
const HorribleSubsAPI = require("../horriblesubs-api");

// Create an instance of the API wrapper.
const horriblesubsAPI = new HorribleSubsAPI({[options, debug]});
```

#### Example usage
```js
// Get all available shows on eztv.
horriblesubsAPI.getAllAnime().then(res => {
  const data = res[0];
  console.log(data);

  // Get data including episodes from eztv.
  horriblesubsAPI.getAnimeData(data)
    .then(res => console.log(res));
}).catch(err => console.error(err));
```

# License

MIT License

Copyright (c) 2016 - horriblesubs-api - Released under the MIT license.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
