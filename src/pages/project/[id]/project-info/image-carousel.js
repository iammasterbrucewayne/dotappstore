import React, { Fragment, useRef } from "react";
import Slider from "react-slick";
import { Box, Image as ChakraImage } from "@chakra-ui/react";
import Image from "next/image";
import placeholder from "@/assets/placeholder.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./image-carousel.css";

const ImageCarousel = ({ imageUrls = [], ...props }) => {
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
		slidesToShow: 4,
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

	const imagesToDisplay = imageUrls.slice(0, 4);

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
			{imagesToDisplay.length > 0 ? (
				<Fragment>
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
				</Fragment>
			) : (
				<ChakraImage
					as={Image}
					src={placeholder}
					width="100%"
					height="100%"
					objectFit="cover"
					alt="placeholder"
					rounded="2xl"
				/>
			)}
		</Box>
	);
};

export default ImageCarousel;
