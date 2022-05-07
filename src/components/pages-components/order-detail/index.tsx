import { memo, Fragment, useState } from 'react';
import styled from '@emotion/styled';
import {
    CustomContainerGeneral,
    InsideContainer,
    CustomFlex,
    ContentContainer,
    CustomHeader,
    CustomFooter
} from '../../atoms/custom-element';
import { BtnWhatsapp, ContainerCustomerService, HeaderText } from '../homepage/index';
import { CustomText, LabelText } from '../../atoms/typography';
import { Flex, FlexRow, FlexRowCenter, FlexOne, FlexOneCustom, FlexRowSpaceBetween, FlexOneCenter } from '../../atoms/flex';
import { ContainerCardContent } from '../../atoms/card';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { BasicBtn } from '../../atoms/button';
import { CustomFlexRow } from '../detail-product';
import OrderBadgeSection from '../../atoms/order-badge-section';
import { map } from 'lodash';
import { ProductSection } from '../../molecules/product-section';
import { CustomGeneralCard, Divide } from '../shipping-info';
import { ContainerImg } from '../order';
import { ImageLogo } from '../../atoms/image';
import { SwipeDrawerMaterial } from '../../atoms/swipe-drawer';
import { IOrderData } from '../../../libs/services/order/IOrder-service';
import { currencyFormat, formatDate } from '../../../libs/function';
import { InfoLabel } from '../../atoms/info';
import { PaymentDescription } from '../../organism/payment-description';
import { AddressInfo } from '../../organism/address-info';
import { DeliveryInfo } from '../../organism/delivery-info';
import { HospitalProfile } from '../../organism/hospital-profile';

export interface IOrderDetailPageContentProps {
    onBack(): void;
    orderData: IOrderData;
    addressFormatted: any;
	gotoWA(e: any): void;
	customerService: any;
    gotoShippingAddress(): void
    onOrderClick(status: string): void;
    goToReview(): void;
}

type IpropsCustomFlex = {
    loading?: number
}

type IPropsContainerReview = {
    margin: string;
}

type IPropsCustomContainer = {
    margin?: string;
    padding?: string;
}

const ContainerInside = styled(FlexOne)`
    margin-top: 60px;
    height: 100vh;
    box-sizing: border-box;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: #F2F2F5;
    overflow: scroll;
    width: 100%;
    padding: 0 0 220px 0;
    @media (max-width: 768px) {
        height: 100vh;
        padding: 0 0 160px 0;
    };
`;

export const TextNotFound = styled(FlexRowCenter)`
	color: #61C7B5;
	text-align: center;
	align-items: center;
	font-style: normal;
	font-weight: bold;
	font-size: 16px;
`;

export const CustomFlexRowCenter = styled(FlexRowCenter) <IpropsCustomFlex>`
	position: relative;
	margin-top: ${props => props.loading ? 15 : 0}px;
    padding-top: 10px;
`;

export const HeaderRegister = styled.div`
	background: #FFFFFF;
	box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
	min-height: 40px;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	z-index: 999;
	display: flex;
	align-items: center;
	padding: 5px 10px;
`;

export const ReviewBtnStyle = {
    fontSize: 14,
    fontWeight: 500,
    padding: '12px 35px',
    color: '#3E8CB9',
    borderRadius: 20,
    width: '100%',
    border: '1px solid #3E8CB9',
    marginBottom: '10px'
}

export const CustomBtnActive = {
    fontSize: 14,
    fontWeight: 500,
    padding: '12px 35px',
    color: 'white',
    borderRadius: 20,
    width: '100%',
    marginBottom: '10px'
}

export const ContainerReview = styled.div<IPropsContainerReview>`
    margin: ${(props) => props.margin}
`

export const InfoTag = styled.div`
	background: #06C270;
	border-radius: 5px;
	color: white;
	font-size: 12px;
	padding: 5px;
	font-weight: 500;
`;

const PromoTag = styled.div`
	background: rgba(87, 235, 161, 0.5);
	border-radius: 8px;
	color: #2C528B;
	font-size: 12px;
	padding: 10px;
	font-weight: bold;
`;

export const CustomContainer = styled(Flex)<IPropsCustomContainer>`
    background-color: #FFFFFF;
    width: 100%;
    padding: ${(props) => props.padding};
    margin: ${(props) => props.margin};
`

const CustomFlexOneCenter = styled(FlexOneCenter)`
    padding: 10px 0 0 0;
`

function _orderDetailPageContent(props: IOrderDetailPageContentProps) {
    const { onBack, orderData, addressFormatted, customerService, gotoWA, gotoShippingAddress, onOrderClick, goToReview } = props;

    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
	const orderStatus = orderData?.status.orderStatus;
    const arriveOrCompleted = orderStatus === 'ARRIVED' || orderStatus === 'COMPLETED' ? true : false;
    const completedOrRefund = orderStatus === 'REFUND' || orderStatus === 'COMPLETED' ? true : false;
    const onlyCompleted = orderStatus === 'COMPLETED' ? true : false;
    const onlyRefund = orderStatus === 'REFUND' ? true : false;
	const partnerShow = orderStatus !== 'PAYMENT_ACCEPT' && orderStatus !== 'REJECTED';

    const toggleDrawer = (isOpen: boolean) => (
		event: any
	) => {
		setOpenDrawer(isOpen);
	};

    return (
			<Fragment>
				<CustomContainerGeneral>
					<InsideContainer>
						<CustomFlex>
							<ContentContainer>
								<CustomGeneralCard variant="outlined">
									<ContainerCardContent>
										<CustomFlexRow>
											<CustomHeader>
												<FlexOneCustom
													cursor={"pointer"}
													flex={"25% 0 0"}
													onClick={() => onBack()}
												>
													<ArrowBackIosNewIcon sx={{ color: "#2C528B" }} />
												</FlexOneCustom>
												<FlexOneCustom flex={"50% 0 0"}>
													<HeaderText>Rincian Pesanan</HeaderText>
												</FlexOneCustom>
												<FlexOneCustom
													onClick={toggleDrawer(true)}
													cursor={"pointer"}
													flex={"25% 0 0"}
												>
													<ContainerImg>
														<ImageLogo
															src="/static/icons/CS_Pharmacy.svg"
															alt="cs_icon"
															width={25}
															height={25}
														/>
													</ContainerImg>
												</FlexOneCustom>
											</CustomHeader>

											<ContainerInside>
												{onlyRefund && (
													<CustomContainer>
														<InfoLabel
															background={"#D6EDF6"}
															color={"#2C528B"}
															fontSize={12}
															fontWeight={500}
															padding={"30px 20px"}
														>
															<CustomText
																fsize={12}
																fweight={500}
																talign="center"
															>
																Refund terkait pemesanan akan diproses maksimal
																2 minggu atau 14 hari kerja
															</CustomText>
														</InfoLabel>
													</CustomContainer>
												)}
												<CustomContainer margin="0 0 1px 0" padding="12px 15px">
													<OrderBadgeSection
														ref_code={orderData?.ref_code}
														status={orderData?.status}
													/>
												</CustomContainer>
												<CustomContainer margin="0 0 8px 0">
													{map(orderData?.product, (item: any, idx: number) => (
														<ProductSection
															key={`product no ${idx}`}
															item={item}
														/>
													))}
												</CustomContainer>

												{completedOrRefund && (
													<CustomContainer margin="-8px 0 8px 0" onClick={() => console.log("Go to prescription page")}>
														<FlexRowSpaceBetween>
															<CustomText
																fsize={12}
																fweight={700}
																color="#5B8AD0"
																padding="15px"
															>
																Resep Dokter
															</CustomText>
															<CustomText
																fsize={12}
																fweight={400}
																color="#61C7B5"
																padding="15px"
															>
																Lihat
															</CustomText>
														</FlexRowSpaceBetween>
													</CustomContainer>
												)}

												{/* {onlyCompleted && (
                                                <CustomContainer margin='0 0 8px 0'>
                                                    <FlexRowSpaceBetween>
                                                        <CustomText fsize={12} fweight={400} color="#6B7588" padding='15px'>{orderData?.ref_code}</CustomText>
                                                        <CustomText fsize={12} fweight={400} color="#61C7B5" padding='15px'>Invoice</CustomText>
                                                    </FlexRowSpaceBetween>
                                                </CustomContainer>
                                            )} */}

												{completedOrRefund && (
													<CustomContainer margin="0 0 8px 0">
														<FlexRowSpaceBetween>
															<CustomText
																fsize={12}
																fweight={400}
																color="#6B7588"
																padding="15px"
															>
																Tanggal Pembelian
															</CustomText>
															<CustomText
																fsize={12}
																fweight={400}
																color="#3E8CB9"
																padding="15px"
															>
																{formatDate(orderData?.created_at)}
															</CustomText>
														</FlexRowSpaceBetween>
													</CustomContainer>
												)}

												<CustomContainer
													padding="8px 15px"
													margin={completedOrRefund ? "0 0 1px 0" : ""}
												>
													<FlexRowSpaceBetween>
														<FlexRow>
															<LocalShippingIcon sx={{ color: "#3E8CB9" }} />

															<LabelText
																fsize={14}
																fweight={600}
																color={"#6B7588"}
																margin={"0px 5px"}
															>
																{completedOrRefund
																	? "Informasi Pengiriman"
																	: "Pengiriman"}
															</LabelText>
														</FlexRow>
														{!completedOrRefund && (
															<FlexRow
																style={{ cursor: "pointer" }}
																onClick={() => gotoShippingAddress()}
															>
																<LabelText
																	fsize={14}
																	fweight={500}
																	color={"#61C7B5"}
																	margin={"0px 5px"}
																>
																	Lihat
																</LabelText>

																<ArrowForwardIosIcon
																	sx={{ color: "#3E8CB9", fontSize: 14 }}
																/>
															</FlexRow>
														)}
													</FlexRowSpaceBetween>
												</CustomContainer>

												<CustomContainer padding="0px 15px">
													{!completedOrRefund && (
														<CustomContainer margin="10px 0">
															<FlexRowSpaceBetween>
																<LabelText fsize={14} color={"#3A3A3C"}>
																	{orderData?.courier?.name}
																</LabelText>
																<PromoTag>
																	{currencyFormat?.(
																		orderData?.courier?.flat_price
																	)}
																</PromoTag>
															</FlexRowSpaceBetween>

															<CustomText
																color={"#8F90A6"}
																fsize={12}
																fweight={500}
																padding="10px 0"
															>
																Pengiriman akan dilakukan oleh{" "}
																{orderData?.courier?.name}
															</CustomText>
														</CustomContainer>
													)}
													{completedOrRefund && (
														<DeliveryInfo
															courierInfo={orderData?.courier?.name}
															addressFormatted={addressFormatted}
														/>
													)}
												</CustomContainer>

												{!completedOrRefund && (
													<CustomContainer margin="1px 0">
														<FlexRowSpaceBetween>
															<CustomText
																fsize={12}
																fweight={400}
																color="#6B7588"
																padding="10px 15px"
															>
																Catatan :
															</CustomText>
															<CustomText
																fsize={12}
																fweight={400}
																color="#6B7588"
																padding="10px 15px"
															>
																{orderData?.note_delivery}
															</CustomText>
														</FlexRowSpaceBetween>
													</CustomContainer>
												)}

												{!completedOrRefund && (
													<CustomContainer
														margin="8px 0 0 0"
														padding="10px 15px"
													>
														<AddressInfo
															receiverName={
																orderData?.delivery_address.receiver_name
															}
															receiverPhone={
																orderData?.delivery_address.receiver_phone
															}
															addressFormatted={addressFormatted}
														/>
													</CustomContainer>
												)}

												{partnerShow && (
													<CustomContainer margin="8px 0 0 0" padding="10px 15px">
															<HospitalProfile
																name={orderData?.partner?.name}
																pharmacy_installation={orderData?.partner?.pharmacy_installation}
																pharmacist={orderData?.partner?.pharmacist}
																sipa={orderData?.partner?.sipa}
																operational_hour_start={orderData?.partner?.operational_hour_start}
																operational_hour_end={orderData?.partner?.operational_hour_end}
																lat={orderData?.partner?.lat}
																long={orderData?.partner?.long}
																address={orderData?.partner?.address}
															/>
													</CustomContainer>
												)}

												<CustomContainer margin="8px 0 0 0" padding="0px 0px">
													<PaymentDescription
														subTotalPrice={orderData?.total_product_price}
														shippingFee={orderData?.total_delivery}
														// serviceFee={orderData?.total_service_fee}
														fontSize={12}
													/>
												</CustomContainer>
												<CustomContainer
													margin="0px 0 40px 0"
													padding="12px 15px"
												>
													<FlexRowSpaceBetween>
														<CustomText fsize={14} fweight={600}>
															Harga Total
														</CustomText>
														<CustomText fsize={14} fweight={600}>
															{currencyFormat(orderData?.total_price)}
														</CustomText>
													</FlexRowSpaceBetween>
												</CustomContainer>
											</ContainerInside>

											{orderData?.status.orderStatus !== "REFUND" && (
												<CustomFooter>
													<CustomFlexOneCenter>
														{orderData?.status.orderStatus == "COMPLETED" &&
															!orderData?.is_review && (
																<BasicBtn
																	style={ReviewBtnStyle}
																	onClick={() => goToReview()}
																>
																	Tulis Ulasan
																</BasicBtn>
															)}
														<BasicBtn
															disabled={!arriveOrCompleted}
															style={CustomBtnActive}
															bColor={
																!arriveOrCompleted ? "#C7C9D9" : "#61C7B5"
															}
															onClick={() =>
																onOrderClick(orderData?.status.orderStatus)
															}
														>
															{orderData?.status.orderStatus == "COMPLETED"
																? "Beli Lagi"
																: "Pesanan Diterima"}
														</BasicBtn>
													</CustomFlexOneCenter>
												</CustomFooter>
											)}
										</CustomFlexRow>
									</ContainerCardContent>
									<SwipeDrawerMaterial
										openDrawer={openDrawer}
										toggleDrawer={toggleDrawer}
										anchor={"bottom"}
										bgcolor={"#fff"}
										bordertopleft={20}
										bordertopright={20}
										padding={"10px"}
										drawerheight={"120px"}
									>
										<FlexRowCenter>
											<LabelText color={"#2C528B"} fsize={18} fweight={600}>
												Hubungi Admin Farmasi
											</LabelText>
										</FlexRowCenter>
										<ContainerCustomerService>
											<ImageLogo
												src={"/static/icons/CS_Pharmacy.svg"}
												height={40}
												width={40}
											/>
											<LabelText
												style={{ width: "40%", wordBreak: "break-all" }}
												wspace={"pre-line"}
												color={"#2C528B"}
												fsize={14}
												margin={"0px 10px"}
											>
												Hubungi via Whatsapp
												{customerService?.[0]?.content.phone}
											</LabelText>
											<BtnWhatsapp
												onClick={(e) => {
													gotoWA(e);
												}}
												bColor={"#61C7B5"}
											>
												<WhatsAppIcon sx={{ color: "#fff" }} />
												<LabelText margin={"0px 4px"}>Kirim Pesan</LabelText>
											</BtnWhatsapp>
										</ContainerCustomerService>
									</SwipeDrawerMaterial>
								</CustomGeneralCard>
							</ContentContainer>
						</CustomFlex>
					</InsideContainer>
				</CustomContainerGeneral>
			</Fragment>
		);
}

export const OrderDetailPageContent = memo(_orderDetailPageContent);
