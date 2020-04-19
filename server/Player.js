class Player {
	constructor(socket) {
		this.socket = socket;
		this.name = "";
		this.nameStatus = "no-name"; //no-name, bad-name, named
		this.reset();
	}

	hasName = () => this.nameStatus === "named";

	reset = () => {
		this.role = null;
		this.isFirst = false;
	};

	getInfo = () => ({
		name: this.name,
		nameStatus: this.nameStatus,
		role: this.role,
		isFirst: this.isFirst,
	});
}

module.exports = Player;
