export const lockedMessage = (minutes) => ({
	icon: "error",
	title: "Oopsie woopsie",
	text:
		"The Spyfall server is pending an update, and will be restarted " +
		getTimeLeft(minutes) +
		". Try again then!",
	footer:
		"If you're the techy type, check the update status " +
		'<a href="https://github.com/tannerkrewson/spyfall/actions" ' +
		'target="_blank" rel="noopener noreferrer">here</a>.',
});

const getTimeLeft = (minutes) => {
	if (minutes <= 0) return "momentarily";
	return "in " + minutes + " minute" + (parseInt(minutes) !== 1 ? "s" : "");
};
