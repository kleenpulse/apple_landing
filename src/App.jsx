import { ReactLenis } from "@studio-freight/react-lenis";
import Navbar from "./components/navigations/Navbar";
import Hero from "./components/sections/Hero";
import HighLights from "./components/sections/HightLights";
import Model from "./components/sections/Model";
import Features from "./components/sections/Features";
import HowItWorks from "./components/sections/HowItWorks";
import Footer from "./components/sections/Footer";
import Apple from "./components/Apple";
import { Suspense, useEffect, useState } from "react";

const App = () => {
	const [isLoaded, setIsLoaded] = useState(true);

	useEffect(() => {
		if ("ontouchstart" in window) {
			setIsLoaded(false);
		}
		window.addEventListener("load", () => {
			setIsLoaded(false);
		});
	}, []);
	return (
		<ReactLenis root>
			{isLoaded && <Apple />}
			<main className="">
				<Navbar />
				<Hero />
				<HighLights />
				<Model />
				<Features />
				<HowItWorks />
				<Footer />
			</main>
		</ReactLenis>
	);
};

export default App;
