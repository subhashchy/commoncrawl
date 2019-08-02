A Node.js wrapper for the commoncrawl.org index

### Install

```commoncrawl``` is available on ```npm``` and as such, can be installed through ```npm``` with ease.

To install ```commoncrawl``` and add it to your ```package.json``` file, use the following command:

```sh
$ npm install --save commoncrawl
```


This node Library can be used to get information about a range of archive captures/mementos, including filtering, sorting, and pagination for bulk query. The actual archive files (WARC/ARC) files are not loaded during this query, only
the generated CDX index. 


### Usage

In order to use ```commoncrawl``` you will need to 1st install it and add to your project, use this command :

```sh
$ npm install --save commoncrawl
```

Once installed you need to instantiate a new copy of ```commoncrawl``` in your application, like so:

```js
const commoncrawl = require('commoncrawl')
```

Method - getIndex - to will return a list indexes from CommonCrawl index in Json.
```js
commoncrawl.getIndex().then((data) => {
  console.log(data);
});
```

Method - searchURL - to search and return list of matches for the given URL : 
```js
commoncrawl.searchURL('example.com')
    .then((data) => {
        console.log(data);
    });
```

You will get back a JSON Array response similar to the below. 


```json
[{
  "urlkey": "com,example)/your/path.html",
  "timestamp": "20190719170504",
  "url": "https://www.example.com/your/path.html",
  "mime": "text/html",
  "filename": "crawl-data/CC-MAIN-2019-30/segments/1563195526324.57/crawldiagnostics/CC-MAIN-20190719161034-20190719183034-00145.warc.gz",
  "length": "1177",
  "offset": "24936937",
  "mime-detected": "text/html",
  "digest": "B2LTWWPUOYAH7UIPQ7ZUPQ4VMBSVC36A",
  "status": "404"
}]
```

*Note: By default it uses the latest index to fetch data. You can override this in options parameter. 



You can override default behavior of search in by adding `options` parameter to `searchURL` call.


### Optional Settings.

### `index`

By default it will use the latest Index - `CC-MAIN-2019-30-index` 

You can manually change the `index` by overriding `index` parameter.  


A Json Array of indexes can be fetched with `getIndex()` method.


### `from` / `to`

Setting `from=<ts>` or `to=<ts>` will restrict the results to the given date/time range (inclusive).

Timestamps may be <=14 digits and will be padded to either lower or upper bound.

For example, `from : 2019, to : 2019` will return results of `example.com` that
have a timestamp between `20190101000000` and `20191231235959`

*Available from pywb 0.10.9*


### `matchType`

The CommonCrawl server supports the following `matchType`

- `exact` -- default setting, will return captures that match the url exactly

- `prefix` -- return captures that begin with a specified path, eg: `http://example.com/path/*`

- `host` -- return captures which for a begin host (the path segment is ignored if specified)

- `domain` -- return captures for the current host and all subdomains, eg. `*.example.com`



### `limit`

Setting `limit:` will limit the number of index lines returned. Limit must be set to a positive integer. If no limit is provided, all the matching lines are returned, which may be slow. 


### `output` (Default JSON output)

While CommonCrawl returns a text output of Json items separated by newline, the library will convert into a well-formmated json Array. 



### `page`

`page` is the current page number, and defaults to 0 if omitted. If the `page` exceeds the number of available `pages` from the page count query, a 400 error will be returned.


### `pageSize`

`pageSize` is an optional parameter which can increase or decrease the amount of data returned in each page.
The default setting can be configuration dependent.


### `showNumPages:true|false`

This will only show the count of total matches found, blocks, pages and PageSize.

```
{"blocks": 423, "pages": 85, "pageSize": 5}
```

In this result:
  - `pages` is the total number of pages available for this query. The `page` parameter may be between 0 and `pages - 1` 

  - `pageSize` is the total number of ZipNum compressed blocks that are read for each page.  

  - `blocks` is the actual number of compressed blocks that match the query. This can be used to quickly estimate the total number of captures, within a margin of error. In general, `blocks / pageSize + 1 = pages` (since there is always at least 1 page even if `blocks < pageSize`) 

If changing `pageSize`, the same value should be used for both the `showNumPages` query and the regular paged query. ex:
   

### Example with Options  

```js
const commoncrawl = require('commoncrawl')

let options = {
    index: 'CC-MAIN-2019-30-index',
    from: '2018',
    to: '2019',
    matchType: 'domain', // exact, prefix, host , domain,
    limit: 100,
    page: 1,
    pageSize: 100,
    showNumPages: false,
}


commoncrawl.searchURL('example.com',options)
    .then((data) => {
        console.log(data);
    });
```
