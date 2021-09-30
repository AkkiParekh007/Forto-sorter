import { IComparer } from './comparer';

export interface ISortInstanceOptions {
	comparer?:IComparer,
	inPlaceSorting?:boolean,
	algorithm?:String,
};