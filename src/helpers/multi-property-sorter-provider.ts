import { IOrder } from './../types/order';
import { ISortBy } from './../types/sortBy';
import { IAnySortBy } from './../types/anySortBy';
import { ISortByObjectSorter } from './../types/sortByObjectSorter';
import { IComparer } from './../interfaces/comparer';
import { castComparer } from './../comparers/cast-comparer';
import { unpackObjectSorter } from './unpack-object-sorter';

export const multiPropertySorterProvider = function(defaultComparer:IComparer) {
	return function multiPropertySorter(
		sortBy:IAnySortBy,
		sortByArr:ISortBy<any>[] | ISortByObjectSorter<any>[],
		depth:number,
		order:IOrder,
		comparer:IComparer,
		a,
		b,
	):number {
		let valA;
		let valB;

		if (typeof sortBy === 'string') {
			valA = a[sortBy];
			valB = b[sortBy];
		} else if (typeof sortBy === 'function') {
			valA = sortBy(a);
			valB = sortBy(b);
		} else {
			const objectSorterConfig = unpackObjectSorter(sortBy as ISortByObjectSorter<any>);
			return multiPropertySorter(
				objectSorterConfig.sortBy,
				sortByArr,
				depth,
				objectSorterConfig.order,
				objectSorterConfig.comparer || defaultComparer,
				a,
				b,
			);
		}

		const equality = comparer(valA, valB, order);

		if (
			(equality === 0 || (valA == null && valB == null)) &&
			sortByArr.length > depth
		) {
			return multiPropertySorter(sortByArr[depth], sortByArr, depth + 1, order, comparer, a, b);
		}

		return equality;
	};
};