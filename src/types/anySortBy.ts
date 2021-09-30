import { ISortBy } from './sortBy';
import { ISortByObjectSorter } from './sortByObjectSorter';

export type IAnySortBy<T = any> = ISortBy<T> | ISortBy<T>[] | ISortByObjectSorter<T> | ISortByObjectSorter<T>[] | boolean;