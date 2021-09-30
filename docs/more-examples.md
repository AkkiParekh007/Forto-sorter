```javascript
  // Sorting values that are not sortable will return same value back
  sort(null).asc(); // => null
  sort(33).desc(); // => 33

  // By default fast-sort sorts null and undefined values to the
  // bottom no matter if sorting is in asc or decs order.
  // If this is not intended behaviour you can check "Should create sort instance that sorts nil value to the top in desc order" test on how to override
  const addresses = [{ city: 'Split' }, { city: undefined }, { city: 'Zagreb'}];
  sort(addresses).asc(a => a.city); // => Split, Zagreb, undefined
  sort(addresses).desc(a => a.city); // => Zagreb, Split, undefined
```