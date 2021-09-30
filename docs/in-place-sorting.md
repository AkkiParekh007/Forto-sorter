By default `sort` does not mutate provided array it creates new "sorted" instance of array. `inPlaceSort` on other hand mutates provided array by sorting it without creating new array instance. Benefits of `inPlaceSort` is that it's slightly faster and more generous on memory as it's not creating new array instance every time sorting is done. Other than that there is no difference between using one or another.

```javascript
const { sort, inPlaceSort } = require('fast-sort');

const array = [3, 1, 5];
const sorted = sort(array).asc();

// sorted => [1, 3, 5]
// array => [3, 1, 5]

inPlaceSort(array).asc();

// array => [1, 3, 5]
```
