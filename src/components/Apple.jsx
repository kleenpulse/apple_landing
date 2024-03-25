import React from "react";
import { appleImg } from "../utils";

const Apple = () => {
	return (
		<div className="w-full min-h-screen bg-black grid place-items-center fixed z-50">
			<div className="flex flex-col items-center gap-y-6">
				<img
					src={appleImg}
					width={200}
					height={200}
					alt="apple"
					className="size-[100px] md:size-[200px]"
				/>
				<p>iPhone 15 Pro</p>
			</div>
		</div>
	);
};

export default Apple;
