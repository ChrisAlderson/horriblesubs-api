# horriblesubs-api

[![Build Status][travis-image]][travis-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Dependency Status][david-image]][david-url]
[![devDependency Status][dev-david-image]][dev-david-url]

[travis-url]: https://travis-ci.org/ChrisAlderson/horriblesubs-apii
[travis-image]: https://travis-ci.org/ChrisAlderson/horriblesubs-apii.svg?branch=master
[coverage-url]: https://coveralls.io/github/ChrisAlderson/horriblesubs-apii?branch=master
[coverage-image]: https://coveralls.io/repos/github/ChrisAlderson/horriblesubs-apii/badge.svg?branch=master
[david-url]: https://david-dm.org/ChrisAlderson/horriblesubs-apii
[david-image]: https://david-dm.org/ChrisAlderson/horriblesubs-apii.svg
[dev-david-url]: https://david-dm.org/ChrisAlderson/horriblesubs-apii?type=dev
[dev-david-image]: https://david-dm.org/ChrisAlderson/horriblesubs-apii/dev-status.svg

An HorribleSubs API wrapper to get data from [horriblesubs.info](https://horriblesubs.info/).

## Usage

#### Setup
```
npm install --save horriblesubs-api
```

#### Initialize
```js
const HorribleSubsApi = require('horriblesubs-api')

// Create a new instance of the module.
const horriblesubs = new HorribleSubsApi({
  baseUrl, // The base url of horriblesubs. Defaults to 'https://horriblesubs.info/'.
  debug // Show extra output. Defaults to 'false'.
})
```

#### Example usage
```js
// Get all available shows on horriblesubs.
horriblesubs.getAllAnime().then(res => {
  const [ data ] = res
  console.log(data)

  // Get data including episodes from horriblesubs.
  return horriblesubs.getAnimeData(data)
}).then(res => console.log(res))
  .catch(err => console.error(err))
```

## Output

#### getAllAnime
```js
[{
  link: '/shows/91-days',
  slug: '91-days',
  title: '91 Days'
}, {
  link: '/shows/absolute-duo',
  slug: 'absolute-duo',
  title: 'Absolute Duo'
}, ...]
```

#### getAnimeData
```js
{ link: '/shows/91-days',
  slug: 'ninety-one-days',
  title: '91 Days',
  hs_showid: '731',
  episodes:
   { '1':
      { '1':
        { '480':
          { url: 'magnet:?xt=urn:btih:AYIJKPLP5WVVF36O25JBB3FFPNJEBBPQ&tr=http://open.nyaatorrents.info:6544/announce&tr=udp://tracker.openbittorrent.com:80/announce&tr=udp://tracker.coppersurfer.tk:6969/announce',
          seeds: 0,
          peers: 0,
          provider: 'HorribleSubs' } },
        ...
      }
    }
}
```

Nested within the `episodes` property there is the `season number`
within the `season number` is the `episode number` and within the
`episode number` are the different `qualities` of the torrent.

## Testing

You can run tests with the following npm command:
```
 $ npm test
```

# License

MIT License

Copyright (c) 2017 - horriblesubs-api - Released under the MIT license.

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
