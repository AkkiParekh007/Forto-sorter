import { ISortByFunction } from './../interfaces/sortByFunction';

export type ISortBy<T> = keyof T | ISortByFunction<T> | (keyof T | ISortByFunction<T>)[];