import PropTypes from "prop-types";
import { Html } from "@react-three/drei";

const LoadingSpinner = ({ color, innerColor }) => (
	<Html>
		<div className="grid h-full w-full place-items-center">
			<div className="relative h-9 w-9 sm:h-16 sm:w-16 ">
				<div
					className={`animate-loadspin rounded-full border-4 border-b-transparent border-r-transparent ${
						color || "border-primary"
					} absolute h-full w-full border-solid `}
				/>

				<div
					className={` rounded-full border-4  ${
						innerColor || "border-primary/30"
					} h-full w-full border-solid`}
				/>
			</div>
		</div>
	</Html>
);
LoadingSpinner.propTypes = {
	color: PropTypes.string,
	innerColor: PropTypes.string,
};
export default LoadingSpinner;
