import { memo } from 'react';
import styled from '@emotion/styled';
import { Flex, FlexRowCenter, FlexRowSpaceBetween } from '../atoms/flex';
import { LabelText } from '../atoms/typography';
import { currencyFormat } from "../../libs/function";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type ICustomFlexSpaceBetweenProps = {
	margin?: string
}

type IDeliveryContainerProps = {
	padding?: string
}

const DeliveryContainer = styled(Flex)<IDeliveryContainerProps>`
	padding: ${(props) => props.padding};
	background: #fff;
	margin: 1px 0px;
	width: 100%;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	align-items: flex-start;
	border-bottom: 2px solid #F2F2F5;
`;

const PromoTag = styled.div`
	background: rgba(87, 235, 161, 0.5);
	border-radius: 8px;
	color: #2C528B;
	font-size: 12px;
	padding: 10px;
	font-weight: bold;
`;

export const CustomFlexSpaceBetween = styled(FlexRowSpaceBetween)<ICustomFlexSpaceBetweenProps>`
	width: 100%;
	margin: ${(props) => props.margin};
`;

const ContainerDelivery = styled.div`
`

export interface IDeliverySectionProps {
	is_free: boolean;
	flat_price: number;
	// onClick(): void;
	padding?: string;
}

function _DeliverySection(props: IDeliverySectionProps) {
	const { 
		is_free, 
		flat_price, 
		// onClick, 
		padding 
	} = props;
	return (
		<DeliveryContainer 
			padding={padding} 
			// style={{ cursor: 'pointer' }} 
			// onClick={() => onClick()}
		>
			<CustomFlexSpaceBetween>
				<ContainerDelivery>
					<CustomFlexSpaceBetween margin='5px 0'>
						<FlexRowCenter>
							<LabelText
								fsize={12}
								color={"#3A3A3C"}
								>
								AlteaCare Delivery 
							</LabelText>
							<LabelText fsize={14} color="#3E8CB9" margin="0 0 0 5px">({is_free ? 'Promo Ongkir Rp 0' : `${currencyFormat?.(flat_price)}`})</LabelText>
						</FlexRowCenter>
						{/* {is_free ? (
							<PromoTag>
							Bebas Ongkir Rp 0
							</PromoTag>
							) : (
								<PromoTag>
								{currencyFormat?.(flat_price)}
								</PromoTag>
							)} */}
					</CustomFlexSpaceBetween>
						
					<LabelText
						color={"#8F90A6"}
						fsize={10}
						fweight={500}
						>
						Estimasi tiba 30 - 45 menit <br /> Pengiriman akan dilakukan oleh AlteaCare Delivery
					</LabelText>
				</ContainerDelivery>

				<ArrowForwardIosIcon
					sx={{ color: '#3E8CB9', fontSize: 14 }}
				/>

			</CustomFlexSpaceBetween>
		</DeliveryContainer>
	);
}

export const DeliverySection = memo(_DeliverySection);
