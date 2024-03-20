import { ReactLenis } from "@studio-freight/react-lenis";
import Navbar from "./components/navigations/Navbar";
import Hero from "./components/sections/Hero";
import HighLights from "./components/sections/HightLights";
import Model from "./components/sections/Model";

const App = () => {
	return (
		<ReactLenis root>
			<main className="">
				<Navbar />
				<Hero />
				<HighLights />
				<Model />
			</main>
		</ReactLenis>
	);
};

export default App;
