import React, { useRef } from "react";
import { chipImg, frameImg, frameVideo } from "../../utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { animateWithGsap } from "../../utils/animations";
import { ScrollTrigger } from "gsap/all";
// gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
	const videoRef = useRef();

	useGSAP(() => {
		animateWithGsap(
			"#hiw-video",
			{ scale: 1, ease: "power2.inOut", opacity: 1 },
			{ scrub: 1.5, start: "top bottom", end: "bottom 90%" }
		);

		gsap.to(videoRef.current, {
			scrollTrigger: {
				trigger: videoRef.current,
				toggleActions: "play pause reverse restart",
				start: "-10% bottom",
			},
			onComplete: () => {
				videoRef.current.play();
			},
		});

		gsap.from("#chip", {
			scrollTrigger: {
				trigger: "#chip",
				start: "20% bottom",
			},
			opacity: 0,
			scale: 2,
			ease: "power2.inOut",
		});

		animateWithGsap(".g_fadeIn", {
			opacity: 1,
			y: 0,
			duration: 1,
			ease: "power2.inOut",
		});
	}, []);

	return (
		<section className="common-padding">
			<div className="screen-max-width">
				<div id="chip" className="flex-center w-full my-20">
					<img src={chipImg} width={180} height={180} alt="chip" />
				</div>

				<div className="flex flex-col items-center">
					<h2 className="hiw-title">
						A17 Pro chip. <br /> A monster win for gaming.
					</h2>
					<p className="hiw-subtitle">
						It's here. The biggest redesign in the history of Apple GPUs.
					</p>
				</div>

				<div className="mt-10 md:mt-20 mb-14">
					<div
						id="hiw-video"
						className="relative h-full flex-center scale-[2] opacity-0"
					>
						<div className="overflow-hidden">
							<img
								src={frameImg}
								alt="frame"
								className="bg-transparent relative z-10"
								draggable={false}
							/>
						</div>
						<div className="hiw-video">
							<video
								className="pointer-events-none "
								playsInline
								preload="none"
								ref={videoRef}
								autoPlay
								muted
							>
								<source src={frameVideo} type="video/mp4" />
							</video>
						</div>
					</div>

					<p className="text-gray font-semibold text-center mt-3">
						Honkai: Star Rail
					</p>
				</div>
				<div className="hiw-text-container">
					<div className="flex-1 flex justify-center flex-col gap-y-2 lg:gap-y-4">
						<p className="hiw-text g_fadeIn">
							A17 Pro is an entirely new class of iPhone chip that delivers our{" "}
							<span className="text-white">
								best graphic performance by far.
							</span>
						</p>

						<p className="hiw-text g_fadeIn">
							Mobile
							<span className="text-white mx-1">
								games will look and feel so immersive
							</span>
							with incredibly detailed scenery and characters.
						</p>
					</div>

					<div className="flex-1 flex justify-center flex-col g_fadeIn">
						<p className="hiw-text">New</p>
						<p className="hiw-bigtext">Pro-Class GPU</p>
						<p className="hiw-text">with 6 cores</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HowItWorks;
