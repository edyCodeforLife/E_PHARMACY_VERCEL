import { memo } from 'react';
import styled from '@emotion/styled';
import Slider from "react-slick";
import { Flex } from './flex';
import { LabelText } from './typography';
import { LogoImage } from './image';

export interface IBannerProps {
	mbottom?: number;
	mtop?: number;
}

export interface ContainerBoxProps {
	padding: string;
	mpadding: string;
}

export interface BoxCustomProps {
	height: any
}

export interface IContainerSliderProps {
	mbottom?: number;
	mtop?: number;
}

export interface IContainerBannerProps {
	width: any;
}

export const ContainerSlider = styled.div <IContainerSliderProps>`
	display: flex;
	margin-top: ${(props) => props.mtop || 20}px;
	flex-direction: column;
	width: 100%;
	margin-bottom: ${(props) => props.mbottom || 30}px;
`;

const ContainerBanner = styled(Flex) <IContainerBannerProps>`
	align-items: center;
	display: flex !important;
	justify-content: center;
	background: #F5F8FB;
	border-radius: 8px;
	padding: 20px 7px 10px 7px;
	width: ${(props) => props.width} !important;
	min-height: 50px;
	min-width: 50px;
	position: relative;
	outline: none;
	cursor: pointer;
`;

export const BoxCustom = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	min-height: 50px;
	min-width: 50px;
	padding: 4px;
	width: 80%;
	border-radius: 8px;
	@media (max-width: 768px) {
		min-height: 20px;
		min-width: 20px;
		height: 55px;
		padding: 4px;
	}
`;

// export const CustomSlider = styled(Slider)<IContainerBannerProps>`
// 	& .slick-slide {
// 		width: ${(props) => props.width} !important;
// 	}
// `;

export interface IBannerComponentProps {
	category: any;
	mbottom?: number;
	mtop?: number;
	centerPadding?: string | '0px';
	iconHeight: number;
	iconWidth: any;
	bradius?: string;
	changeRoute?(path: string): void;
}



function _CategoryCarousel(props: IBannerComponentProps) {
	const { mbottom, mtop, category, iconHeight, iconWidth, bradius, changeRoute } = props;
	const settings = {
		dots: false,
		infinite: false,
		centerMode: false,
		pauseOnHover: true,
		pauseOnFocus: true,
		swipeToSlide: true,
		nextArrow: undefined,
		prevArrow: undefined,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		centerPadding: "0px",
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					centerPadding: "0px",
				}
			},
			{
				breakpoint: 800,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					centerPadding: "0px",
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					centerPadding: "0px",
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					centerPadding: "0px",
				}
			}
		]
	};

	return (
		<ContainerSlider mtop={mtop} mbottom={mbottom}>
			<Slider
				{...settings}
				className="category-carousel"
			>
				{category?.map((item: any, idx: number) => (
					<ContainerBanner
						width={"100%"}
						onClick={() => changeRoute?.(item?.is_root ? `/category?categoriesId=${item?.product_category_id}` : `/product-list?sub_categories=${item?.product_category_id}`)}
						key={idx}
					>
						<LogoImage
							height={iconHeight}
							width={iconWidth}
							src={item.icon?.formats?.small}
							bradius={bradius}
							{...props}
						/>
						<BoxCustom>
							<LabelText
								color={"#6B7588"}
								fsize={11}
								talign={"center"}
								wspace={"pre-line"}
							>
								{item.name}
							</LabelText>
						</BoxCustom>
					</ContainerBanner>
				))}
			</Slider>
		</ContainerSlider>
	);
}

export const CategoryCarousel = memo(_CategoryCarousel);