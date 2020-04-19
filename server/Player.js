class Player {
	constructor(socket) {
		this.socket = socket;
		this.name = "";
		this.connected = true;
		this.reset();
	}

	reset = () => {
		this.role = null;
		this.isFirst = false;
	};

	getInfo = () => ({
		name: this.name,
		role: this.role,
		isFirst: this.isFirst,
		connected: this.connected,
	});
}

module.exports = Player;
