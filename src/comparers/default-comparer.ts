export const defaultComparer = (a, b, order):number => {
	if (a == null) return order;
	if (b == null) return -order;
	if (a < b) return -1;
	if (a === b) return 0;

	return 1;
}