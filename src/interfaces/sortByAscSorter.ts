import { ISortBy } from './../types/sortBy';
import { ISortInstanceOptions } from './sortInstanceOptions';

export interface ISortByAscSorter<T> extends ISortInstanceOptions {
	asc:boolean | ISortBy<T>,
}