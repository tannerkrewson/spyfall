class Player {
	constructor(socket, id) {
		this.socket = socket;
		this.id = id;
		this.name = "";
		this.nameStatus = "no-name"; //no-name, bad-name, named
		this.connected = true;
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
		connected: this.connected,
	});
}

module.exports = Player;
