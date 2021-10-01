# forto-sorter

Fast easy to use and flexible sorting with TypeScript support.
For speed comparison of `forto-sorter` vs other popular sort libraries check [benchmark](#benchmark) section.
For list of all available features check [highlights](#highlights) section.

```javascript
  import { sort } from 'forto-sorter';

  // Sort flat arrays
  const ascSorted = sort([1,4,2]).asc(); // => [1, 2, 4]
  const descSorted = sort([1, 4, 2]).desc(); // => [4, 2, 1]

  // Sort users (array of objects) by firstName in descending order
  const sorted = sort(users).desc(u => u.firstName);

  // Sort users in ascending order by firstName and lastName
  const sorted = sort(users).asc([
    u => u.firstName,
    u => u.lastName
  ]);

  // Sort users ascending by firstName and descending by city
  const sorted = sort(users).by([
    { asc: u => u.firstName },
    { desc: u => u.address.city }
  ]);

  // Sort based on computed property
  const sorted = sort(repositories).desc(r => r.openIssues + r.closedIssues);

  // Sort using string for object key
  // Only available for root object properties
  const sorted = sort(users).asc('firstName');
```

Fore more examples check [unit tests](https://github.com/AkkiParekh007/Forto-sorter/blob/master/test/sort.spec.ts).

## Highlights

  * Sort flat arrays
  * Sort array of objects by one or more properties
  * Sort in multiple directions
  * [Natural sort](#natural-sorting--language-sensitive-sorting) support
  * Support for [custom sort](#custom-sorting) instances
  * Easy to read syntax
  * [Faster](#benchmark) than other popular sort alternatives
  * Undefined and null values are always sorted to bottom (with default comparer)
  * TypeScript support
  * Packed with features in small footprint with 0 dependencies (~ 850 bytes gzip)
  * Compatible with any JS environment as Node, Web, etc..

## In place sorting

By default `sort` does not mutate provided array it creates new "sorted" instance of array. `inPlaceSort` on other hand mutates provided array by sorting it without creating new array instance. Benefits of `inPlaceSort` is that it's slightly faster and more generous on memory as it's not creating new array instance every time sorting is done. Other than that there is no difference between using one or another.

```javascript
const { sort, inPlaceSort } = require('forto-sorter');

const array = [3, 1, 5];
const sorted = sort(array).asc();

// sorted => [1, 3, 5]
// array => [3, 1, 5]

inPlaceSort(array).asc();

// array => [1, 3, 5]
```

## Natural sorting / Language sensitive sorting

By default `forto-sorter` is not doing language sensitive sorting of strings.
e.g `'image-11.jpg'` will be sorted before `'image-2.jpg'` (in ascending sorting).
We can provide custom [Intl.Collator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Collator) comparer to forto-sorter for language sensitive sorting of strings.
Keep in mind that natural sort is slower then default sorting so recommendation is to use it
only when needed.

```javascript
  import { sort, createNewSortInstance } from 'forto-sorter';

  const testArr = ['image-2.jpg', 'image-11.jpg', 'image-3.jpg'];

  // By default forto-sorter is not doing natural sort
  sort(testArr).desc(); // => ['image-3.jpg', 'image-2.jpg', 'image-11.jpg']

  // We can use `by` sort to override default comparer
  // with the one that is doing language sensitive comparison
  sort(testArr).by({
    desc: true,
    comparer: new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' }).compare,
  }); // => ['image-11.jpg', 'image-3.jpg', 'image-2.jpg']

  // Or we can create new sort instance with language sensitive comparer.
  // Recommended if used in multiple places
  const naturalSort = createNewSortInstance({
    comparer: new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' }).compare,
  });

  naturalSort(testArr).asc(); // => ['image-2.jpg', 'image-3.jpg', 'image-11.jpg']
  naturalSort(testArr).desc(); // => ['image-11.jpg', 'image-3.jpg', 'image-2.jpg']
```

## Custom sorting

Fast sort can be tailored to fit any sorting need or use case by:
  * creating custom sorting instances
  * overriding default comparer in `by` sorter
  * custom handling in provided callback function
  * combination of any from above

For example we will sort `tags` by "custom" tag importance (e.g `vip` tag is of greater importance then `captain` tag).

```javascript
  import { sort, createNewSortInstance } from 'forto-sorter';

  const tags = ['influencer', 'unknown', 'vip', 'captain'];
  const tagsImportance = { // Domain specific tag importance
    vip: 3,
    influencer: 2,
    captain: 1,
  };

  // We can use power of computed prop to sort tags by domain specific importance
  const descTags = sort(tags).desc(tag => tagImportance[tag] || 0);
  // => ['vip', 'influencer', 'captain', 'unknown'];

  // Or we can create specialized tagSorter so we can reuse it in multiple places
  const tagSorter = createNewSortInstance({
    comparer: (a, b) => (tagImportance[a] || 0) - (tagImportance[b] || 0),
    inPlaceSorting: true, // default[false] => Check "In Place Sort" section for more info.
  });

  tagSorter(tags).asc(); // => ['unknown', 'captain', 'influencer', 'vip'];
  tagSorter(tags).desc(); // => ['vip', 'influencer', 'captain', 'unknown'];

  // Default sorter will sort tags by comparing string values not by their domain specific value
  const defaultSort = sort(tags).asc(); // => ['captain', 'influencer', 'unknown' 'vip']
```
## More examples

```javascript
  // Sorting values that are not sortable will return same value back
  sort(null).asc(); // => null
  sort(33).desc(); // => 33

  // By default forto-sorter sorts null and undefined values to the
  // bottom no matter if sorting is in asc or decs order.
  // If this is not intended behaviour you can check "Should create sort instance that sorts nil value to the top in desc order" test on how to override
  const addresses = [{ city: 'Split' }, { city: undefined }, { city: 'Zagreb'}];
  sort(addresses).asc(a => a.city); // => Split, Zagreb, undefined
  sort(addresses).desc(a => a.city); // => Zagreb, Split, undefined
```

## Benchmark

Five different benchmarks have been created to get better insight of how forto-sorter perform under different scenarios.
Each benchmark is run with different array sizes raging from small 100 items to large 100 000 items.

Every run of benchmark outputs different results but the results are constantly showing better scores compared to similar popular sorting libraries.

#### Benchmark scores

Benchmark has been run on:

  * 16 GB Ram
  * Intel® Core™ i5-4570 CPU @ 3.20GHz × 4
  * Ubuntu 16.04
  * Node 8.9.1

- Benchmark Results :

| Benchmark 1: Flat object high randomization                                                                       |
|-------------------------------------------------------------------------------------------------------------------|
|                                                                                                                   |
|                                                                                                                   |
| ┌─────────────┬─────────────────────┬─────────────────────┬──────────────────────┬───────────────────────┐        |
| │ Library     │ 1000 items          │ 5000 items          │ 20000 items          │ 100000 items          │        |
| ├─────────────┼─────────────────────┼─────────────────────┼──────────────────────┼───────────────────────┤        |
| │ fortoSorter │ 0.4783ms            │ 1.8937ms            │ 9.3904ms             │ 63.5228ms             │        |
| ├─────────────┼─────────────────────┼─────────────────────┼──────────────────────┼───────────────────────┤        |
| │ lodash      │ 2.5770ms (↓ 5.39x ) │ 4.3308ms (↓ 2.29x ) │ 25.5407ms (↓ 2.72x ) │ 195.1688ms (↓ 3.07x ) │        |
| ├─────────────┼─────────────────────┼─────────────────────┼──────────────────────┼───────────────────────┤        |
| │ arraySort   │ 2.1124ms (↓ 4.42x ) │ 4.5848ms (↓ 2.42x ) │ 23.5146ms (↓ 2.50x ) │ 143.1895ms (↓ 2.25x ) │        |
| ├─────────────┼─────────────────────┼─────────────────────┼──────────────────────┼───────────────────────┤        |
| │ sortArray   │ 1.7457ms (↓ 3.65x ) │ 3.0248ms (↓ 1.60x ) │ 15.5523ms (↓ 1.66x ) │ 105.5887ms (↓ 1.66x ) │        |
| ├─────────────┼─────────────────────┼─────────────────────┼──────────────────────┼───────────────────────┤        |
| │ native      │ 0.5949ms (↓ 1.24x ) │ 1.7837ms (↑ 1.06x ) │ 9.3987ms (↓ 1.00x )  │ 62.5260ms (↑ 1.02x )  │        |
| └─────────────┴─────────────────────┴─────────────────────┴──────────────────────┴───────────────────────┘        |
|                                                                                                                   |
|                                                                                                                   |
| Benchmark 2: Flat object low randomization                                                                        |
| ┌─────────────┬─────────────────────┬─────────────────────┬─────────────────────┬──────────────────────┐          |
| │ Library     │ 1000 items          │ 5000 items          │ 20000 items         │ 100000 items         │          |
| ├─────────────┼─────────────────────┼─────────────────────┼─────────────────────┼──────────────────────┤          |
| │ fortoSorter │ 0.4497ms            │ 1.0250ms            │ 4.2098ms            │ 23.9820ms            │          |
| ├─────────────┼─────────────────────┼─────────────────────┼─────────────────────┼──────────────────────┤          |
| │ lodash      │ 0.7290ms (↓ 1.62x ) │ 1.9728ms (↓ 1.92x ) │ 8.4351ms (↓ 2.00x ) │ 48.6720ms (↓ 2.03x ) │          |
| ├─────────────┼─────────────────────┼─────────────────────┼─────────────────────┼──────────────────────┤          |
| │ arraySort   │ 0.4291ms (↑ 1.05x ) │ 2.1713ms (↓ 2.12x ) │ 8.9329ms (↓ 2.12x ) │ 48.0973ms (↓ 2.01x ) │          |
| ├─────────────┼─────────────────────┼─────────────────────┼─────────────────────┼──────────────────────┤          |
| │ sortArray   │ 0.7913ms (↓ 1.76x ) │ 1.4493ms (↓ 1.41x ) │ 6.1061ms (↓ 1.45x ) │ 35.1751ms (↓ 1.47x ) │          |
| ├─────────────┼─────────────────────┼─────────────────────┼─────────────────────┼──────────────────────┤          |
| │ native      │ 0.1828ms (↑ 2.46x ) │ 0.9579ms (↑ 1.07x ) │ 3.9722ms (↑ 1.06x ) │ 21.5291ms (↑ 1.11x ) │          |
| └─────────────┴─────────────────────┴─────────────────────┴─────────────────────┴──────────────────────┘          |
|                                                                                                                   |
|                                                                                                                   |
| Benchmark 3: Flat array high randomization                                                                        |
|                                                                                                                   |
|                                                                                                                   |
| ┌─────────────┬─────────────────────┬─────────────────────┬──────────────────────┬───────────────────────┐        |
| │ Library     │ 1000 items          │ 5000 items          │ 20000 items          │ 100000 items          │        |
| ├─────────────┼─────────────────────┼─────────────────────┼──────────────────────┼───────────────────────┤        |
| │ fortoSorter │ 0.3900ms            │ 1.9571ms            │ 8.8333ms             │ 58.5259ms             │        |
| ├─────────────┼─────────────────────┼─────────────────────┼──────────────────────┼───────────────────────┤        |
| │ lodash      │ 1.6266ms (↓ 4.17x ) │ 4.3269ms (↓ 2.21x ) │ 20.6463ms (↓ 2.34x ) │ 169.4795ms (↓ 2.90x ) │        |
| ├─────────────┼─────────────────────┼─────────────────────┼──────────────────────┼───────────────────────┤        |
| │ arraySort   │ 0.6955ms (↓ 1.78x ) │ 4.9105ms (↓ 2.51x ) │ 33.5520ms (↓ 3.80x ) │ 283.6070ms (↓ 4.85x ) │        |
| ├─────────────┼─────────────────────┼─────────────────────┼──────────────────────┼───────────────────────┤        |
| │ sortArray   │ 1.3663ms (↓ 3.50x ) │ 2.7508ms (↓ 1.41x ) │ 12.5176ms (↓ 1.42x ) │ 76.8658ms (↓ 1.31x )  │        |
| ├─────────────┼─────────────────────┼─────────────────────┼──────────────────────┼───────────────────────┤        |
| │ native      │ 0.4929ms (↓ 1.26x ) │ 2.1239ms (↓ 1.09x ) │ 8.8922ms (↓ 1.01x )  │ 52.5742ms (↑ 1.11x )  │        |
| └─────────────┴─────────────────────┴─────────────────────┴──────────────────────┴───────────────────────┘        |
|                                                                                                                   |
|                                                                                                                   |
| Benchmark 4: Deep nested properties high randomization                                                            |
|                                                                                                                   |
|                                                                                                                   |
| ┌─────────────┬──────────────────────┬───────────────────────┬────────────────────────┬─────────────────────────┐ |
| │ Library     │ 1000 items           │ 5000 items            │ 20000 items            │ 100000 items            │ |
| ├─────────────┼──────────────────────┼───────────────────────┼────────────────────────┼─────────────────────────┤ |
| │ fortoSorter │ 0.4906ms             │ 2.5322ms              │ 13.3432ms              │ 138.7365ms              │ |
| ├─────────────┼──────────────────────┼───────────────────────┼────────────────────────┼─────────────────────────┤ |
| │ lodash      │ 0.9159ms (↓ 1.87x )  │ 3.8142ms (↓ 1.51x )   │ 18.8642ms (↓ 1.41x )   │ 192.0482ms (↓ 1.38x )   │ |
| ├─────────────┼──────────────────────┼───────────────────────┼────────────────────────┼─────────────────────────┤ |
| │ arraySort   │ 9.1748ms (↓ 18.70x ) │ 43.5922ms (↓ 17.22x ) │ 203.8649ms (↓ 15.28x ) │ 1474.3322ms (↓ 10.63x ) │ |
| ├─────────────┼──────────────────────┼───────────────────────┼────────────────────────┼─────────────────────────┤ |
| │ sortArray   │ 2.6341ms (↓ 5.37x )  │ 4.9801ms (↓ 1.97x )   │ 18.5747ms (↓ 1.39x )   │ 177.4684ms (↓ 1.28x )   │ |
| ├─────────────┼──────────────────────┼───────────────────────┼────────────────────────┼─────────────────────────┤ |
| │ native      │ 0.6785ms (↓ 1.38x )  │ 2.3185ms (↑ 1.09x )   │ 12.2377ms (↑ 1.09x )   │ 120.9437ms (↑ 1.15x )   │ |
| └─────────────┴──────────────────────┴───────────────────────┴────────────────────────┴─────────────────────────┘ |
|                                                                                                                   |
|                                                                                                                   |
| Benchmark 5: Multi property sort low randomization                                                                |
|                                                                                                                   |
|                                                                                                                   |
| ┌─────────────┬─────────────────────┬──────────────────────┬──────────────────────┬───────────────────────┐       |
| │ Library     │ 1000 items          │ 5000 items           │ 20000 items          │ 100000 items          │       |
| ├─────────────┼─────────────────────┼──────────────────────┼──────────────────────┼───────────────────────┤       |
| │ fortoSorter │ 1.0447ms            │ 4.3833ms             │ 23.1283ms            │ 153.3535ms            │       |
| ├─────────────┼─────────────────────┼──────────────────────┼──────────────────────┼───────────────────────┤       |
| │ lodash      │ 0.6692ms (↑ 1.56x ) │ 4.0048ms (↑ 1.09x )  │ 22.0228ms (↑ 1.05x ) │ 162.6015ms (↓ 1.06x ) │       |
| ├─────────────┼─────────────────────┼──────────────────────┼──────────────────────┼───────────────────────┤       |
| │ arraySort   │ 2.7746ms (↓ 2.66x ) │ 14.0422ms (↓ 3.20x ) │ 66.1206ms (↓ 2.86x ) │ 398.2346ms (↓ 2.60x ) │       |
| ├─────────────┼─────────────────────┼──────────────────────┼──────────────────────┼───────────────────────┤       |
| │ sortArray   │ 2.7253ms (↓ 2.61x ) │ 9.7852ms (↓ 2.23x )  │ 49.6170ms (↓ 2.15x ) │ 304.3122ms (↓ 1.98x ) │       |
| ├─────────────┼─────────────────────┼──────────────────────┼──────────────────────┼───────────────────────┤       |
| │ native      │ NOT SUPPORTED       │ NOT SUPPORTED        │ NOT SUPPORTED        │ NOT SUPPORTED         │       |
| └─────────────┴─────────────────────┴──────────────────────┴──────────────────────┴───────────────────────┘       |

#### Running benchmark

To run benchmark on your PC follow steps from below

1) git clone https://github.com/AkkiParekh007/Forto-sorter.git
2) cd forto-sorter/benchmark
3) npm install
4) npm start

In case you notice any irregularities in benchmark or you want to add sort library to benchmark score
please open issue [here](https://github.com/AkkiParekh007/Forto-sorter)
