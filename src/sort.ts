// Types
import { IOrder } from './types/order';
import { ISortBy } from './types/sortBy';
import { IAnySortBy } from './types/anySortBy';
import { ISortByObjectSorter } from './types/sortByObjectSorter';

// Interfaces
import { IComparer } from './interfaces/comparer';
import { ISortInstanceOptions } from './interfaces/sortInstanceOptions';
import { ISortByFunction } from './interfaces/sortByFunction';
import { ISortByAscSorter } from './interfaces/sortByAscSorter';
import { ISortByDescSorter } from './interfaces/sortByDescSorter';

// Comparers
import { defaultComparer } from './comparers/default-comparer';
import { castComparer } from './comparers/cast-comparer';

// Helpers
import { sortArray } from './helpers/sort-array';

// Algorithm Helpers
import { sortByAlgo } from './helpers/sort-by-algo';
import { bubbleSort } from './algorithms/bubbleSort';
import { insertionSort } from './algorithms/insertionSort';
import { selectionSort } from './algorithms/selectionSort';
import { radixSort } from './algorithms/radixSort';
import { heapSort } from './algorithms/heapSort';
import { quickSort } from './algorithms/quickSort';
import { mergeSort } from './algorithms/mergeSort';

export const createNewSortInstance = function(opts:ISortInstanceOptions) {
	const comparer = castComparer(opts.comparer);

	return function<T>(_ctx:T[]) {
		const ctx = Array.isArray(_ctx) && !opts.inPlaceSorting ? _ctx.slice() : _ctx;
		return {
			/**
			 * Sort array in ascending order.
			 * @example
			 * sort([3, 1, 4]).asc();
			 * sort(users).asc(u => u.firstName);
			 * sort(users).asc([
			 *   U => u.firstName
			 *   u => u.lastName,
			 * ]);
			 */
			asc(sortBy?:ISortBy<T> | ISortBy<T>[]):T[] {
				return sortArray(1, ctx, sortBy, comparer);
			},
			/**
			 * Sort array in descending order.
			 * @example
			 * sort([3, 1, 4]).desc();
			 * sort(users).desc(u => u.firstName);
			 * sort(users).desc([
			 *   U => u.firstName
			 *   u => u.lastName,
			 * ]);
			 */
			desc(sortBy?:ISortBy<T> | ISortBy<T>[]):T[] {
				return sortArray(-1, ctx, sortBy, comparer);
			},
			/**
			 * Sort array in ascending or descending order. It allows sorting on multiple props
			 * in different order for each of them.
			 * @example
			 * sort(users).by([
			 *  { asc: u => u.score }
			 *  { desc: u => u.age }
			 * ]);
			 */
			by(sortBy:ISortByObjectSorter<T> | ISortByObjectSorter<T>[]):T[] {
				return sortArray(1, ctx, sortBy, comparer);
			},
		};
	};
}

export const sort = createNewSortInstance({
	comparer: defaultComparer,
});

export const inPlaceSort = createNewSortInstance({
	comparer       : defaultComparer,
	inPlaceSorting : true,
});

export const sortByAlgorithm = (algorithmName, list, compare) => {
	switch (algorithmName) {
		case 'bubble':
			sortByAlgo(bubbleSort, { list }, compare);
			break;
		case 'insertion':
			sortByAlgo(insertionSort, { list }, compare);
			break;
		case 'selection':
			sortByAlgo(selectionSort, { list }, compare);
			break;
		case 'radix':
			sortByAlgo(radixSort, { list }, compare);
			break;
		case 'heap':
			sortByAlgo(heapSort, { list }, compare);
			break;
		case 'quick':
			sortByAlgo(quickSort, { list }, compare);
			break;
		case 'merge':
			sortByAlgo(mergeSort, { list }, compare);
			break;
	}
};