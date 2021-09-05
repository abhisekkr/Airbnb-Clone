import "tailwindcss/tailwind.css";
import "../styles/global.css";
import Router from "next/router";
import ProgressBar from "@badrap/bar-of-progress";
import { Provider as AuthProvider } from "next-auth/client";
import { store } from "../app/store";
import { Provider } from "react-redux";

const progress = new ProgressBar({
	size: 4,
	color: "#FE595E",
	className: "z-50",
	delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<AuthProvider session={pageProps.session}>
				<Component {...pageProps} />
			</AuthProvider>
		</Provider>
	);
}

export default MyApp;
