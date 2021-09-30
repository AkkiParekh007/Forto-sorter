import { IOrder } from './../types/order';
import { IComparer } from './../interfaces/comparer';

export const castComparer = (comparer:IComparer) => (a, b, order:IOrder) => comparer(a, b, order) * order;