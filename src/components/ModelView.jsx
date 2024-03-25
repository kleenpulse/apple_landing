import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import React, { Suspense } from "react";
import { cn } from "../utils";
import Lights from "./Lights";
import LoadingSpinner from "./LoadingSpinner";
import IPhone from "./IPhone";
import * as THREE from "three";

const ModelView = ({
	index,
	groupRef,
	gsapType,
	controlRef,
	setRotationState,
	item,
	size,
}) => {
	return (
		<View
			index={index}
			id={gsapType}
			className={cn(
				"w-full h-full absolute overflow-hidden",

				index === 2 ? "right-[-100%] " : ""
			)}
		>
			<ambientLight intensity={0.4} />

			<PerspectiveCamera makeDefault position={[0, 0, 4]} />
			<Lights />
			<OrbitControls
				makeDefault
				ref={controlRef}
				enableZoom={false}
				enablePan={false}
				rotateSpeed={0.5}
				target={new THREE.Vector3(0, 0, 0)}
				onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
			/>

			<group
				ref={groupRef}
				name={index === 1 ? "large" : "small"}
				position={[0, 0, 0]}
			>
				<Suspense fallback={<LoadingSpinner />}>
					<IPhone
						scale={index === 1 ? [16, 16, 16] : [19, 19, 19]}
						item={item}
						size={size}
					/>
				</Suspense>
			</group>
		</View>
	);
};

export default ModelView;
