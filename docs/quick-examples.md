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
