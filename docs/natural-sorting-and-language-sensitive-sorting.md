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