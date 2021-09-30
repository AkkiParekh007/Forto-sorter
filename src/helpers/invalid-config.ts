export const throwInvalidConfigErrorIfTrue = function(condition:boolean, context:string) {
	if (condition) throw Error(`Invalid sort config: ${context}`);
};