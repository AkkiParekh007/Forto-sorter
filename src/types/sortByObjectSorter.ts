import { ISortByAscSorter }  from './../interfaces/sortByAscSorter';
import { ISortByDescSorter } from './../interfaces/sortByDescSorter';

export type ISortByObjectSorter<T> = ISortByAscSorter<T> | ISortByDescSorter<T>;