import { IOrder } from './../types/order';

export interface IComparer {
	(a:any, b:any, order:IOrder):number,
};