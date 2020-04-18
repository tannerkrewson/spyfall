class Player {
	constructor(socket) {
		this.socket = socket;
		this.name = "";
		this.nameStatus = "no-name"; //no-name, bad-name, named
	}

	hasName = () => this.nameStatus === "named";

	getInfo = () => ({
		name: this.name,
		nameStatus: this.nameStatus,
	});
}

module.exports = Player;
