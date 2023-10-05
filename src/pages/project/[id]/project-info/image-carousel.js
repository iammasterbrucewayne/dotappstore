import React, { Fragment, useRef } from "react";
import Slider from "react-slick";
import { Box, Image as ChakraImage } from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./image-carousel.css";
import { size } from "lodash";

const ImageCarousel = ({
	imageUrls = [
		"https://i.imgur.com/fdAa2rf.png",
		"https://i.imgur.com/WIZn6gk.png",
		"https://i.imgur.com/XNoZidz.png",
	],
	...props
}) => {
	const mainSlider = useRef();
	const navSlider = useRef();

	const settingsMain = {
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		asNavFor: navSlider.current,
	};

	const settingsThumbs = {
		slidesToShow: size(imageUrls),
		slidesToScroll: 1,
		asNavFor: mainSlider.current,
		dots: false,
		centerMode: true,
		swipeToSlide: true,
		focusOnSelect: true,
		centerPadding: "10px",
		responsive: [
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2,
				},
			},
		],
	};

	const imagesToDisplay = imageUrls.slice(0, 6);

	return (
		<Box
			w="100%"
			maxW="100%"
			height="fit-content"
			position="relative"
			my={8}
			overflow="hidden"
			mx="auto"
			{...props}
		>
			<Slider {...settingsMain} ref={mainSlider} className="main-slider">
				{imagesToDisplay.map((url, index) => (
					<ChakraImage
						key={index}
						src={url}
						width="100%"
						height="100%"
						objectFit="cover"
						alt={`carousel-image-${index}`}
						rounded="2xl"
					/>
				))}
			</Slider>
			<Box mt={4}>
				<Slider {...settingsThumbs} ref={navSlider} className="nav-slider">
					{imagesToDisplay.map((url, index) => (
						<Box p={1} key={index}>
							{" "}
							<ChakraImage
								src={url}
								width="100%"
								height="100%"
								objectFit="cover"
								alt={`thumbnail-${index}`}
								rounded="2xl"
							/>
						</Box>
					))}
				</Slider>
			</Box>
		</Box>
	);
};

export default ImageCarousel;
