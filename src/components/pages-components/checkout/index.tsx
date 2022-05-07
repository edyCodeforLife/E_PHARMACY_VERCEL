import { memo, Fragment, useState } from 'react';
import styled from '@emotion/styled';
import {
	CustomContainerGeneral,
	InsideContainer,
	CustomFlex,
	ContentContainer,
	CustomHeader
} from '../../../components/atoms/custom-element';
import Flex, { FlexRow } from '../../atoms/flex';
import { GeneralCard, ContainerCardContent } from '../../atoms/card';
import { CustomFlexRowCenter } from '../../../components/atoms/flex';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { FlexOneCustom } from '../../atoms/flex';
import { LabelText } from '../../atoms/typography';
import { ProductSection } from '../../molecules/product-section';
import { DeliverySection } from '../../molecules/delivery-section';
import { NotesSection } from '../../molecules/notes-section';
import { UploadSection } from '../../molecules/upload-section';
import { ShoppingDetails } from '../../molecules/shopping-details';
import { PaymentDescription } from '../../organism/payment-description';
import { TermsConditionSection } from '../../molecules/terms-condition-section';
import { PaymentFooterSection } from '../../molecules/payment-footer-section';
import Grid from '@mui/material/Grid';
import { IGetDataCheckout, IProduct } from '../../../libs/services/checkout/Icheckout-service';
import { map } from 'lodash';
import { AddressCheckout } from '../../molecules/address-checkout-section';
import { ConfirmDrawer } from '../../organism/confirm-drawer';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { DeliveryDrawer } from '../../organism/delivery-drawer';
import { ChatDoctorFooterSection } from '../../molecules/chat-doctor-footer-section';
import { CustomGeneralCard } from '../shipping-info';

export interface ICheckoutProps {
	onBack(): void;
	value: string;
	changeNotes(value: string): void;
	chekoutData: IGetDataCheckout;
	onClickNext(): void;
	gotoShippingAddress(): void;
	redirectToTermsCondition(): void;
	gotoShippingInfo(): void;
	isDisabled: boolean;
}

export interface CustomFlexRowCenterProps {
	alignItems: string;
}

export interface IpropsSectionCheckout {
	jcontent: string;
}

export const HeaderText = styled.div`
	color: #3868B0;
	font-weight: 600;
	font-size: 18px;
`;

const ContainerInside = styled(Flex)`
	margin-top: 60px;
	height: 100vh;
	box-sizing: border-box;
	align-items: flex-start;
	justify-content: flex-start;
	overflow: scroll;
	width: 100%;
	padding: 0 0 220px 0;
	@media (max-width: 768px) {
		// height: calc(100vh - 175px);
		height: 100vh;
        padding: 0 0 170px 0;
	};
`;

export const FlexRowCustomize = styled(CustomFlexRowCenter) <CustomFlexRowCenterProps>`
	align-items: ${props => props.alignItems};
`;

export const SectionCheckout = styled.div<IpropsSectionCheckout>`
	background: #fff;
	padding: 10px 15px;
	margin: 1px 0px;
	width: 100%;
	box-sizing: border-box;
	display: flex;
	border-bottom: 2px solid #F2F2F5;
	justify-content: ${props => props.jcontent};
`;

export const ContainerProduct = styled(Grid)`
	padding: 10px;
	width: 100%;
	box-sizing: border-box;
	margin-left: -8px;
`;

const SectionDelivery = styled.div`
	width: 100%;
`


function _CheckoutContent(props: ICheckoutProps) {
	const { onBack, isDisabled, value, changeNotes, chekoutData, onClickNext, gotoShippingAddress, redirectToTermsCondition, gotoShippingInfo } = props;

	const [openDrawer, setOpenDrawer] = useState<boolean>(false);
	const [deliveryDrawer, setDeliveryDrawer] = useState<boolean>(false);

	const toggleDrawer = (isOpen: boolean) => (
		event: any
	) => {
		setOpenDrawer(isOpen);
	};

	const toggleDeliveryDrawer = (isOpen: boolean) => (event: any) => {
		setDeliveryDrawer(isOpen);
	};

	const adres = {
		delivery_address: {
			id: null,
			receiver_name: "",
			receiver_phone: "",
			street: "",
			country: {
			  
			},
			province: {
			  
			},
			city: {
			  
			},
		  },
		   city: {
			name: ""
		  },
		  country: {
			name: ""
		  },district: {
			name: ""
		  },id: null,
		  province: {
			name: ""
		  },receiver_name: "",receiver_phone: "",rt_rw: "",street: "",sub_district: {
			
		  }
	}

	return (
		<Fragment>
			<CustomContainerGeneral>
				<InsideContainer>
					<CustomFlex>
						<ContentContainer>
							<CustomGeneralCard variant="outlined">
								<ContainerCardContent>
									<FlexRowCustomize alignItems={"flex-start"}>
										<CustomHeader>
											<FlexOneCustom
												cursor={"pointer"}
												flex={"25% 0 0"}
												onClick={() => onBack()}
											>
												<ArrowBackIosNewIcon sx={{ color: '#2C528B' }} />
											</FlexOneCustom>
											<FlexOneCustom flex={"50% 0 0"}>
												<HeaderText>
													Checkout
												</HeaderText>
											</FlexOneCustom>
										</CustomHeader>
									</FlexRowCustomize>
									<ContainerInside>
										<SectionCheckout
											jcontent={"space-between"}
										>
											<FlexRow>
												<ShoppingBasketIcon
													sx={{ color: '#3E8CB9' }}
												/>

												<LabelText
													fsize={14}
													fweight={600}
													color={"#6B7588"}
													margin={"0px 5px"}
												>
													Produk
												</LabelText>
											</FlexRow>
										</SectionCheckout>

										{map(chekoutData?.product, (item: IProduct, idx: number) => (
											<ProductSection
												key={`product no ${idx}`}
												item={item}
											/>
										))}

										<SectionCheckout
											jcontent={"space-between"}
										>
											<FlexRow>
												<LocalShippingIcon
													sx={{ color: '#3E8CB9' }}
												/>

												<LabelText
													fsize={14}
													fweight={600}
													color={"#6B7588"}
													margin={"0px 5px"}
												>
													Pengiriman
												</LabelText>

											</FlexRow>
										</SectionCheckout>

										<SectionDelivery style={{ cursor: 'pointer' }} onClick={toggleDeliveryDrawer(true)}>
											<DeliverySection 
												is_free={chekoutData.courier?.is_free}
												flat_price={chekoutData.courier?.flat_price}
												padding="5px 15px"
											/>
										</SectionDelivery>

										<SectionDelivery>
											<FlexRow style={{ cursor: 'pointer' }} onClick={() => gotoShippingAddress()}>
												<AddressCheckout
													address={chekoutData?.delivery_address}
													/>
											</FlexRow>
										</SectionDelivery>
										<NotesSection
											value={value}
											changeNotes={changeNotes}
										/>

										{/* <UploadSection /> */}
										<ShoppingDetails />
										<PaymentDescription
											subTotalPrice={chekoutData?.total_product_payment}
											shippingFee={chekoutData.courier?.flat_price}
										/>
										<TermsConditionSection
											redirectToTermsCondition={redirectToTermsCondition}

										/>
									</ContainerInside>
									<PaymentFooterSection
										onClickPayment={toggleDrawer(true)}
										isDisabled={isDisabled}
										totalPayment={chekoutData?.total_payment}

									/>
									{/* <ChatDoctorFooterSection
										onClickPayment={() => console.log('chatt')}
										isDisabled={isDisabled}
									/> */}
									<ConfirmDrawer
										openDrawer={openDrawer}
										toggleDrawer={toggleDrawer}
										title={"Konfirmasi Pembelian"}
										description={"Apakah rincian pembelian sudah benar ? Anda tidak dapat merubah rincian pembelian ketika pembayaran diproses"}
										onClickNext={onClickNext}

									/>
									<DeliveryDrawer
										openDrawer={deliveryDrawer}
										toggleDrawer={toggleDeliveryDrawer}
										title={"Konfirmasi Pembelian"}
										description={"Apakah rincian pembelian sudah benar ? Anda tidak dapat merubah rincian pembelian ketika pembayaran diproses"}
										onClickNext={onClickNext}
									/>
								</ContainerCardContent>
							</CustomGeneralCard>
						</ContentContainer>
					</CustomFlex>
				</InsideContainer>
			</CustomContainerGeneral>
		</Fragment>
	)
}

export const CheckoutContent = memo(_CheckoutContent);