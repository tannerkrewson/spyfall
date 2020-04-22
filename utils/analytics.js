import ReactGA from "react-ga";

export const initGA = () => {
	ReactGA.initialize("UA-82444397-11");
};

export const logPageView = () => {
	ReactGA.set({ page: window.location.pathname });
	ReactGA.pageview(window.location.pathname);
};

export const logEvent = (category = "", action = "") => {
	if (category && action) {
		ReactGA.event({ category, action: String(action) });
	}
};

export const logException = (description = "", fatal = false) => {
	if (description) {
		ReactGA.exception({ description, fatal });
	}
};
