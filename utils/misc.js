export const lockedMessage = (minutes) =>
	"The Spyfall server is pending an update, and will be restarted in " +
	minutes +
	" minute" +
	(parseInt(minutes) !== 1 ? "s" : "") +
	". Try again then!";
