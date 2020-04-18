class Player {
	constructor(socket) {
		this.socket = socket;
		this.name = "";
		this.nameStatus = "no-name"; //no-name, bad-name, named
		this.role = null;
	}

	hasName = () => this.nameStatus === "named";

	getInfo = () => ({
		name: this.name,
		nameStatus: this.nameStatus,
		role: this.role,
	});
}

module.exports = Player;
