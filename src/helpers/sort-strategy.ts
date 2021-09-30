import { throwInvalidConfigErrorIfTrue } from './invalid-config';
import { castComparer } from './../comparers/cast-comparer';
import { ISortByObjectSorter } from './../types/sortByObjectSorter';
import { IOrder } from './../types/order';
import { ISortBy } from './../types/sortBy';
import { IAnySortBy } from './../types/anySortBy';
import { IComparer } from './../interfaces/comparer';
import { multiPropertySorterProvider } from './multi-property-sorter-provider';
import { unpackObjectSorter } from './unpack-object-sorter';

export function sortStrategy( sortBy:IAnySortBy, comparer:IComparer, order:IOrder,) : (a, b) => number {
	// Flat array sorter
	if (sortBy === undefined || sortBy === true) {
		return (a, b) => comparer(a, b, order);
	}

	// Sort list of objects by single object key
	if (typeof sortBy === 'string') {
		throwInvalidConfigErrorIfTrue(sortBy.includes('.'), 'String syntax not allowed for nested properties.');
		return (a, b) => comparer(a[sortBy], b[sortBy], order);
	}

	// Sort list of objects by single function sorter
	if (typeof sortBy === 'function') {
		return (a, b) => comparer(sortBy(a), sortBy(b), order);
	}

	// Sort by multiple properties
	if (Array.isArray(sortBy)) {
		const multiPropSorter = multiPropertySorterProvider(comparer);
		return (a, b) => multiPropSorter(sortBy[0], sortBy, 1, order, comparer, a, b);
	}

	// Unpack object config to get actual sorter strategy
	const objectSorterConfig = unpackObjectSorter(sortBy as ISortByObjectSorter<any>);
	return sortStrategy(
		objectSorterConfig.sortBy,
		objectSorterConfig.comparer || comparer,
		objectSorterConfig.order,
	);
}