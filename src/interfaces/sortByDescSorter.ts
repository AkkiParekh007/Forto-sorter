import { ISortBy } from './../types/sortBy';
import { ISortInstanceOptions } from './sortInstanceOptions';

export interface ISortByDescSorter<T> extends ISortInstanceOptions {
	desc:boolean | ISortBy<T>,
}