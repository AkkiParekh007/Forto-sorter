import { IOrder } from './../types/order';
import { IAnySortBy } from './../types/anySortBy';
import { sortStrategy } from './sort-strategy';
import { IComparer } from './../interfaces/comparer';

export const sortArray = function(order:IOrder, ctx:any[], sortBy:IAnySortBy, comparer:IComparer) {
	if (!Array.isArray(ctx)) {
		return ctx;
	}
	// Unwrap sortBy if array with only 1 value to get faster sort strategy
	if (Array.isArray(sortBy) && sortBy.length < 2) {
		[sortBy] = sortBy;
	}
	return ctx.sort(sortStrategy(sortBy, comparer, order))
};