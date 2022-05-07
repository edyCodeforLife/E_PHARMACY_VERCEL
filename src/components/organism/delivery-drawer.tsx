
import { memo } from 'react';
import styled from '@emotion/styled';
import { Flex, FlexRow, FlexRowCenter } from '../atoms/flex';
import { CustomText, LabelText } from '../atoms/typography';
import { SwipeDrawerMaterial } from '../atoms/swipe-drawer';
import FormControl from '@mui/material/CardContent';
import { FlexRowBetween } from '../pages-components/detail-product';
import ClearIcon from '@mui/icons-material/Clear';
import { DeliverySection } from '../molecules/delivery-section';
import { InfoLabel } from '../atoms/info';
import Image from 'next/image';

export interface IContainerBoxProps {
	normal?: boolean;
}

export interface ICustomFormControlProps {
	minwidth: string;
	talign: string;
}

export interface IBtnSubmitProps {
	minwidth: string;
	background: string;
	border?: string;
}

export const ContainerBox = styled.div<IContainerBoxProps>`
	padding: ${(props) => props.normal ? '0px 5px' : '9px 0px'} ;
	margin: 0px 3px;
	position: relative;
	outline: none;
	cursor: pointer;
	@media (max-width: 768px) {
		padding: ${(props) => props.normal ? '2px 2px;' : '8px 0px'} ;
		margin: 0px 2px;
	}
`;

export const SmallBoxContainer = styled.div`
	background: #FFFFFF;
	box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
`;

export const SmallBoxCustom = styled(SmallBoxContainer)`
	display: flex;
	align-items: flex-start;
	flex-direction: column;
	min-height: 0px;
	height: auto;
	min-width: 10px;
	padding: 14px;
	width: auto;
	border-radius: 8px;
	@media (max-width: 768px) {
		min-height: 50px;
		min-width: 50px;
		padding: 14px 10px;
	}
`;

const CustomContainerBtn = styled(FlexRowCenter)`
	position: relative;
	width: 100%;
	box-sizing: border-box;
`;

export const CustomFormControl = styled(FormControl) <ICustomFormControlProps>`
	min-width: ${(props) => props.minwidth};
	margin-top: 0px;
	text-align: ${(props) => props.talign};
	padding: 0px 0px 15px 0px !important;
`;

export const ContainerBtn = styled.div`
	width: 100%;
	height: auto;
`;

export const BtnSubmit = styled.button<IBtnSubmitProps>`
	background: ${(props) => props.background};
	cursor: pointer;
	border-radius: 40px;
	padding: 15px;
	color:  ${(props) => props.color};
	border: none;
	border: ${(props) => props.border};
	min-width: ${(props) => props.minwidth};
	font-size: 16px;
	&:disabled {
		background-color: #C7C9D9;
		color: #fff;
	}
`;

const CustomFlex = styled(Flex)`
    position: absolute;
    padding: 10px 0 0 0;
    left: 0;
    bottom: 0;
    width: 100%;
`

function _DeliveryDrawer(props: any) {
	const {
		openDrawer,
		toggleDrawer,
		description,
		title,
		onClickNext
	} = props;

	return (
		<SwipeDrawerMaterial
			openDrawer={openDrawer}
			toggleDrawer={toggleDrawer}
			anchor={"bottom"}
			bgcolor={"#fff"}
			bordertopleft={20}
			bordertopright={20}
			padding={"10px"}
			drawerheight={"calc(350px - 70px);"}
		>
            <FlexRow>
                <ClearIcon style={{ cursor: 'pointer' }} onClick={toggleDrawer(false)}
                    sx={{color: '#8F90A6'}}
                />
                <LabelText
                    color={"#333333"}
                    fsize={14}
                    fweight={600}
                    margin="0 0 0 20px"
                >
                    {title}
                </LabelText>
            </FlexRow>

			<Flex>
                <CustomText fsize={12} fweight={600} color="#61C7B5" padding='5px 0'>
                    Pengiriman Produk
                </CustomText>
                {/* <DeliverySection>

                </DeliverySection> */}
                <DeliverySection
                    // onClick={() => console.log('awdwa')}
                    is_free={false}
                    flat_price={2000}
                    padding="0 0 10px 0"
                />
                <DeliverySection
                    // onClick={() => console.log('awdwa')}
                    is_free={false}
                    flat_price={2000}
                    padding="5px 0 0 0"
                />
            </Flex>
            
            <CustomFlex>
                <InfoLabel
                    background={"#D6EDF6"}
                    color={"#2C528B"}
                    fontSize={12}
                    fontWeight={500}
                    padding={"32px 20px"}
                >
                    <FlexRow>
                        <Image src='/static/icons/headhphone-icon.svg' width={35} height={35} alt="headhphone icon" />
                        <CustomText fsize={12} fweight={400} talign='left' margin='0 0 0 10px'>Anda akan dihubungi oleh tim AlteaCare untuk konfirmasi pemesanan dan pengiriman obat.</CustomText>
                    </FlexRow>
                </InfoLabel>
            </CustomFlex>
		</SwipeDrawerMaterial>
	)
}

export const DeliveryDrawer = memo(_DeliveryDrawer);

