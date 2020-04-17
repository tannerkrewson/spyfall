import Page from "../components/Page";

export default function Home() {
	return (
		<Page>
			<div className="main-menu">
				<h4>Welcome to Spyfall</h4>

				<hr />

				<div className="button-container">
					<button id="btn-new-game">New Game</button>
					<button id="btn-join-game">Join Game</button>
				</div>

				<hr />
			</div>
		</Page>
	);
}
