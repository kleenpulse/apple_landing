import { navLists } from "../../constants";
import { appleImg, bagImg, searchImg } from "../../utils";

const Navbar = () => {
	return (
		<header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
			<nav className="flex  w-full screen-max-width">
				<img src={appleImg} alt="apple" width={18} height={18} />

				<div className="flex flex-1 justify-center max-sm:hidden">
					{navLists.map((item) => (
						<span
							tabIndex={0}
							role="button"
							key={item}
							className="px-4 xl:px-5 text-sm text-gray hover:text-white transition-colors duration-300"
						>
							{item}
						</span>
					))}
				</div>

				<div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
					<img src={searchImg} alt="search" width={18} height={18} />
					<img src={bagImg} alt="bag" width={18} height={18} />
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
