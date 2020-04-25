import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const PWAPrompt = dynamic(() => import("react-ios-pwa-prompt"), {
	ssr: false,
});

const AddAppButton = () => {
	const [isAlreadyPWA, setIsAlreadyPWA] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isiOS, setIsiOS] = useState(false);
	const [deferredPrompt, setDeferredPrompt] = useState();

	const [showiOS, setShowiOS] = useState(false);

	useEffect(() => {
		// https://stackoverflow.com/a/52695341
		setIsAlreadyPWA(
			window.matchMedia("(display-mode: standalone)").matches ||
				window.navigator.standalone ||
				document.referrer.includes("android-app://")
		);

		setIsiOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);

		// https://web.dev/customize-install/#beforeinstallprompt
		window.addEventListener("beforeinstallprompt", (e) => {
			// Prevent the mini-infobar from appearing on mobile
			e.preventDefault();
			// Stash the event so it can be triggered later.
			setDeferredPrompt(e);
		});
	});

	const handleAddApp = () => {
		setIsLoading(true);
		if (isiOS) {
			setShowiOS(true);
		} else if (deferredPrompt) {
			// https://web.dev/customize-install/#in-app-flow

			// Show the install prompt
			deferredPrompt.prompt();
			// Wait for the user to respond to the prompt
			deferredPrompt.userChoice.then(() => setIsLoading(false));
		} else {
			Swal.fire(
				"Oops...",
				"Can't add Drawphone as an app on this device. Try on your phone!",
				"error"
			).then(() => setIsLoading(false));
		}
	};

	return (
		<>
			{!isAlreadyPWA && (
				<button className="btn-small btn-vertical" onClick={handleAddApp}>
					{isLoading ? "Loading..." : "Add Spyfall as App"}
				</button>
			)}
			{showiOS && (
				<PWAPrompt
					debug={true}
					permanentlyHideOnDismiss={false}
					onCancel={() => {
						setShowiOS(false);
						setIsLoading(false);
					}}
				/>
			)}
		</>
	);
};

export default AddAppButton;
