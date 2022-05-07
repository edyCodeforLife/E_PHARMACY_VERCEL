import { memo, Fragment } from 'react';
import styled from '@emotion/styled';
import { SmallBoxContainer } from '../atoms/small-box';
import { ImageLogo } from '../atoms/image';
import BasicSkeleton from '../atoms/skeleton';

export interface SmallBoxContainerProps {
    isForMobileLayout?: boolean;
}

export interface TextSpecialistProps {
    isForMobileLayout: boolean;
}

export interface ContainerBoxProps {
    isForMobileLayout?: boolean;
    mobileconPadding: string;
    mobileconMargin: string;
    containerminwidth: string;
    containerminheight?: string;
    containerheight?: string;
    containerwidth: string;
}

export const SmallBoxCustom = styled(SmallBoxContainer)<SmallBoxContainerProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	min-height: ${(props) => props.isForMobileLayout ? '20' : '50'}px;
	min-width: ${(props) => props.isForMobileLayout ? '20' : '50'}px;
	height: ${(props) => props.isForMobileLayout ? '100' : '150'}px;
	padding: ${(props) => props.isForMobileLayout ? '4' : '0'}px;
	width: ${(props) => props.isForMobileLayout ? 'auto' : null};
	border-radius: 8px;
	@media (max-width: 768px) {
		min-height: 20px;
		min-width: 20px;
		height: 100px;
		width: auto;
		padding: 4px;
	}
`;

const TextSpecialist = styled.div<TextSpecialistProps>`
	font-weight: 500;
	font-size: ${(props) => props.isForMobileLayout ? '10' : '14'}px;
	line-height: 12px;
	color: #6B7588;
	text-align: center;
	margin-top: 10px;
	white-space: pre-line;
	@media (max-width: 768px) {
		font-size: 10px;
	}
`;

const ContainerBox = styled.div<ContainerBoxProps>`
	padding: ${(props) => props.isForMobileLayout ? props.mobileconPadding : '0px 5px'};
	margin: ${(props) => props.isForMobileLayout ? props.mobileconMargin : '0px 3px'};
	min-width: ${(props) => props.containerminwidth};
	min-height: ${(props) => props.containerminheight};
	height:  ${(props) => props.containerheight};
	width:  ${(props) => props.containerwidth};
	position: relative;
	outline: none;
	cursor: pointer;
	@media (max-width: 768px) {
		padding:  ${(props) => props.mobileconPadding};
		margin: ${(props) => props.mobileconMargin};
	}
`;

export interface IBoxCategory {
	id: string;
	iconHeight: number;
	iconWidth: number;
	iconSrc: string;
	onRedirect(id: string): void;
	loading: boolean;
	categoryName: string;
	isForMobileLayout: boolean;
	activeHover: boolean;
	mobileconPadding: string;
	mobileconMargin: string;
	containerminwidth: string;
	containerminheight?: string;
	containerheight?: string;
	containerwidth: string;
}

function _BoxCategory(props: IBoxCategory) {
	const {
		id,
		iconHeight,
		isForMobileLayout,
		onRedirect,
		iconWidth,
		iconSrc,
		loading,
		categoryName,
		activeHover,
		mobileconPadding,
		mobileconMargin,
		containerminwidth,
		containerminheight,
		containerheight,
		containerwidth
	} = props;

	return (
		<div>
			<ContainerBox
				containerminwidth={containerminwidth}
				containerminheight={containerminheight}
				containerheight={containerheight}
				containerwidth={containerwidth}
				isForMobileLayout={isForMobileLayout}
				mobileconPadding={mobileconPadding}
				mobileconMargin={mobileconMargin}
				id={id}
				onClick={() => onRedirect(id)}
			>
				<SmallBoxCustom isForMobileLayout={isForMobileLayout} activeHover={activeHover}>
					{loading ? (
						<BasicSkeleton
							animation="wave"
							variant="rect"
							height={50}
							width={50}
						/>
					) : (
						<ImageLogo height={iconHeight} width={iconWidth} src={iconSrc} />
					)}


					{loading ? (
						<BasicSkeleton
							animation="wave"
							variant="text"
							height={20}
							width={50}
						/>
					) : (
						<TextSpecialist isForMobileLayout={isForMobileLayout} >
							<span>{categoryName}</span>
						</TextSpecialist>
					)}


				</SmallBoxCustom>
			</ContainerBox>
		</div>
	)
}

export const BoxCategory = memo(_BoxCategory);

