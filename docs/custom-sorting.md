Fast sort can be tailored to fit any sorting need or use case by:
  * creating custom sorting instances
  * overriding default comparer in `by` sorter
  * custom handling in provided callback function
  * combination of any from above

For example we will sort `tags` by "custom" tag importance (e.g `vip` tag is of greater importance then `captain` tag).

```javascript
  import { sort, createNewSortInstance } from 'fast-sort';

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