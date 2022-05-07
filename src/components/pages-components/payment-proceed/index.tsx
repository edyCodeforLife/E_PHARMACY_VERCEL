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
import { LogoImage } from '../../atoms/image';
import { LabelText } from '../../atoms/typography';
import { BasicBtn } from '../../atoms/button';

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
	height: calc(100vh - 120px);
	box-sizing: border-box;
	align-items: center;
	justify-content: center;
	overflow: scroll;
	width: 100%;
	// padding: 5px 20px;
	@media (max-width: 768px) {
		height: calc(100vh - 70px);
	};
`;

export const FlexRowCustomize = styled(CustomFlexRowCenter) <CustomFlexRowCenterProps>`
	align-items: ${props => props.alignItems}
`;


export const ContainerFlexRow = styled(FlexRow)`
	padding: 15px;
	width: 100%;
	box-sizing: border-box;
`;

export const ContainerImg = styled.div`
	text-align: right;
`;

export const BtnRedirect = styled(BasicBtn)`
	border-radius: 20px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 12px 30px;
	color: #fff;
	font-size: 14px;
    font-weight: 600;
`;

function _PaymentProceeddContent(props: any) {
	const { redirectTo } = props;

	return (
		<Fragment>
			<CustomContainerGeneral>
				<InsideContainer>
					<CustomFlex>
						<ContentContainer>
							<GeneralCard variant="outlined">
								<ContainerCardContent>
									<ContainerInside>
										<LabelText
											color={"#3868B0"}
											fsize={16}
											fweight={600}
											margin={"20px 0px"}
                                            talign="center"
										>
											Terima Kasih, <br /> Chat kamu sudah selesai
										</LabelText>
										<LogoImage
											src={'/static/icons/payment-proceed.svg'}
											width={"100%"}
											height={100}
										/>

										<LabelText
											color={"#8F90A6"}
											fsize={14}
											margin={"20px 40px"}
											talign={"center"}
										>
											Silahkan lanjutkan pembayaran dan resep akan diberikan ketika sudah melakukan pembayaran
										</LabelText>

										<BtnRedirect onClick={() => { redirectTo() }} bColor={"#61C7B5"}>
                                            Lanjutkan ke Pembayaran
										</BtnRedirect>

									</ContainerInside>
								</ContainerCardContent>
							</GeneralCard>
						</ContentContainer>
					</CustomFlex>
				</InsideContainer>
			</CustomContainerGeneral>
		</Fragment>
	)
}

export const PaymentProceeddContent = memo(_PaymentProceeddContent);