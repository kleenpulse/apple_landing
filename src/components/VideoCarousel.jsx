import { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { cn, pauseImg, playImg, replayImg } from "../utils";

gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
	const videoRef = useRef([]);
	const videoSpanRef = useRef([]);
	const videoDivRef = useRef([]);

	const [video, setVideo] = useState({
		isEnd: false,
		startPlay: false,
		videoId: 0,
		isLastVideo: false,
		isPlaying: false,
	});
	const [loadedData, setLoadedData] = useState([]);

	const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

	useGSAP(() => {
		gsap.to("#slider", {
			transform: `translateX(${-100 * videoId}%)`,
			duration: 2,
			ease: "power2.inOut",
		});

		gsap.to("#video", {
			scrollTrigger: {
				trigger: "#video",
				toggleActions: "restart none none none",
			},
			onComplete: () => {
				setVideo((prev) => ({ ...prev, startPlay: true, isPlaying: true }));
			},
		});
	}, [isEnd, videoId]);

	useEffect(() => {
		if (loadedData.length > 3) {
			if (!isPlaying) {
				videoRef.current[videoId].pause();
			} else {
				startPlay && videoRef.current[videoId].play();
			}
		}
	}, [startPlay, videoId, isPlaying, loadedData]);

	const hanleLoadedMetadata = (i, e) => {
		setLoadedData((prev) => [...prev, e]);
	};

	useEffect(() => {
		let currentProgress = 0;
		let span = videoSpanRef.current;

		if (span[videoId]) {
			// animate the video progress
			let anim = gsap.to(span[videoId], {
				onUpdate: () => {
					const progress = Math.ceil(anim.progress() * 100);
					if (progress != currentProgress) {
						currentProgress = progress;
						gsap.to(videoDivRef.current[videoId], {
							width:
								window.innerWidth < 760
									? "10vw"
									: window.innerWidth < 1200
									? "10vw"
									: "4vw",
						});
						gsap.to(span[videoId], {
							width: `${progress}%`,
							backgroundColor: "#fff",
						});
					}
				},
				onComplete: () => {
					if (isPlaying) {
						gsap.to(videoDivRef.current[videoId], {
							width: "12px",
						});
						gsap.to(span[videoId], {
							backgroundColor: "#afafaf",
						});
					}
				},
			});

			if (videoId === 0) {
				anim.restart();
			}

			const animUpdate = () => {
				anim.progress(
					videoRef.current[videoId].currentTime /
						hightlightsSlides[videoId].videoDuration
				);
			};

			if (isPlaying) {
				gsap.ticker.add(animUpdate);
			} else {
				gsap.ticker.remove(animUpdate);
			}
		}
	}, [videoId, startPlay]);

	const handleProcess = (type, i) => {
		switch (type) {
			case "video-end":
				setVideo((prev) => ({ ...prev, isEnd: true, videoId: i + 1 }));
				break;
			case "video-last":
				setVideo((prev) => ({ ...prev, isLastVideo: true }));
				break;
			case "video-reset":
				setVideo((prev) => ({ ...prev, isLastVideo: false, videoId: 0 }));
				break;
			case "play":
				setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
				break;
			case "pause":
				setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
				break;

			default:
				return video;
		}
	};

	return (
		<>
			<div className="flex items-center">
				{hightlightsSlides.map((list, idx) => (
					<div key={list.id} id="slider" className="sm:pr-20 pr-10">
						<div className="video-carousel_container">
							<div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
								<video
									ref={(el) => (videoRef.current[idx] = el)}
									onPlay={() =>
										setVideo((prevVideo) => ({ ...prevVideo, isPlaying: true }))
									}
									onLoadedMetadata={(e) => hanleLoadedMetadata(idx, e)}
									onEnded={() =>
										idx !== 3
											? handleProcess("video-end", idx)
											: handleProcess("video-last")
									}
									id="video"
									playsInline
									preload="auto"
									muted
									className={cn(
										"pointer-events-none",
										list.id === 2 ? "translate-x-44" : ""
									)}
								>
									<source
										src={list.video}
										type="video/mp4"
										className="w-full h-full"
									/>
								</video>
							</div>

							<div className="absolute top-12 left-[5%] z-10">
								{list.textLists.map((text) => (
									<p key={text} className=" text-xl md:text-2xl font-medium">
										{text}
									</p>
								))}
							</div>
						</div>
					</div>
				))}
			</div>

			<div className="flex-center mt-10 relative">
				<div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
					{videoRef.current.map((_, idx) => (
						<span
							key={idx}
							ref={(el) => (videoDivRef.current[idx] = el)}
							className="w-3 h-3 rounded-full bg-gray-200 mx-2 relative"
						>
							<span
								ref={(el) => (videoSpanRef.current[idx] = el)}
								className="w-full h-full rounded-full  absolute top-0 left-0"
							></span>
						</span>
					))}
				</div>
				<button className="control-btn">
					<img
						src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
						alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
						onClick={
							isLastVideo
								? () => handleProcess("video-reset")
								: !isPlaying
								? () => handleProcess("play")
								: () => handleProcess("pause")
						}
					/>
				</button>
			</div>
		</>
	);
};

export default VideoCarousel;
