import { throwInvalidConfigErrorIfTrue } from './invalid-config';
import { castComparer } from './../comparers/cast-comparer';
import { ISortByObjectSorter } from './../types/sortByObjectSorter';
import { IOrder } from './../types/order';
import { ISortBy } from './../types/sortBy';

export const unpackObjectSorter = function(sortByObj:ISortByObjectSorter<any>) {
	const { asc, desc } = sortByObj as any || {};
	const order = asc ? 1 : -1 as IOrder;
	const sortBy = (asc || desc) as boolean | ISortBy<any>;

	// Validate object config
	throwInvalidConfigErrorIfTrue(!sortBy, 'Expected `asc` or `desc` property');
	throwInvalidConfigErrorIfTrue(asc && desc, 'Ambiguous object with `asc` and `desc` config properties');

	const comparer = sortByObj.comparer && castComparer(sortByObj.comparer);

	return { order, sortBy, comparer };
};