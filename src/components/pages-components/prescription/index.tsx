import { memo, Fragment, useState } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import {
	CustomContainerGeneral,
	InsideContainer,
	CustomFlex,
	ContentContainer,
	CustomHeader
} from '../../../components/atoms/custom-element';
import Flex, { FlexCenter, FlexRow, FlexRowCenter } from '../../atoms/flex';
import { GeneralCard, ContainerCardContent } from '../../atoms/card';
import { CustomFlexRowCenter } from '../../../components/atoms/flex';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { FlexOneCustom, FlexRowSpaceBetween } from '../../atoms/flex';
import { LabelText } from '../../atoms/typography';
import { DoctorInfo } from '../../molecules/doctor-info';
import { PatientInfo } from '../../molecules/patient-info';
import { DoctorPrescription } from '../../molecules/doctor-prescription';
import Grid from '@mui/material/Grid';
import { LogoImage } from '../../atoms/image';
import { BasicBtn } from '../../../components/atoms/button';


export interface CustomFlexRowCenterProps {
	alignItems: string;
}

export const HeaderText = styled.div`
	color: #3868B0;
	font-weight: 600;
	font-size: 18px;
`;

export const ContainerImg = styled.div`
	text-align: right;
`;

export const ContainerSlider = styled.div`
	display: flex;
	margin-top: 20px;
	flex-direction: column;
	width: 100%;
`;

const ContainerInside = styled(Flex)`
	margin-top: 60px;
	height: calc(100vh - 142px);
	box-sizing: border-box;
	align-items: center;
	justify-content: flex-start;
	overflow: scroll;
	width: 100%;
	// padding: 5px 20px;
	@media (max-width: 768px) {
		height: calc(100vh - 60px);
	};
`;

export const FlexRowCustomize = styled(CustomFlexRowCenter) <CustomFlexRowCenterProps>`
	align-items: ${props => props.alignItems}
`;

export const SectionOrder = styled(FlexRowSpaceBetween)`
	padding: 10px 15px;
	width: 100%;
`;

export const ContainerProduct = styled(Grid)`
	width: 100%;
	box-sizing: border-box;
	margin-left: 0px;
	margin-top: 0px;
`;

export const ContainerSpinner = styled(FlexRowCenter)`
	width: inherit;
	height: 100%;
`;

const ContainerInfo = styled.div`
	width: 100%;
	background: rgba(255, 128, 128, 0.2);
	padding: 10px 20px;
`;

export const BackToTopContainer = styled.div`
	border-radius: 50%;
	padding:9px 12px;
	background-color: #61C7B5;
`;

export const HorizontalLine = styled.div`
    height: 2px;
    background: #F2F2F5;
    width: 95%;
    content: ' ';
    display: block;
`;

export const ContainerBottom = styled(Flex)`
	position: relative;
	bottom: -200px;
	padding: 10px 20px;
	width: 100%;
	align-items: center;
`;

export const BtnDownloadPDF = styled(BasicBtn)`
	font-size: 14px;
	background: #61C7B5;
	font-weight: 500;
	margin: 10px 0px;
	padding: 10px 0px;
	color: white;
	width: 100%;
	border-radius: 20px;
`;

function _PrescriptionContent(props: any) {
	const {
		onBack,
		downloadPDF
	} = props;

	const [openDrawer, setOpenDrawer] = useState<boolean>(false);

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
							<GeneralCard variant="outlined">
								<ContainerCardContent>
									<FlexRowCustomize alignItems={"flex-start"}>
										<CustomHeader>
											<FlexOneCustom
												cursor={"pointer"}
												textAlign={"left"}
												flex={"25% 0 0"}
												onClick={() => onBack()}
											>
												<ArrowBackIosNewIcon sx={{ color: '#2C528B' }} />
											</FlexOneCustom>
											<FlexOneCustom flex={"50% 0 0"}>
												<HeaderText>
													Resep Digital
												</HeaderText>
											</FlexOneCustom>
										</CustomHeader>
									</FlexRowCustomize>
									<ContainerInside id="scrollableDiv">
										<ContainerInfo>
											<FlexRow>
												<LogoImage
													src="/static/icons/info.svg"
													height={20}
													width={"20px"}
												/>
												<LabelText
													fsize={12}
													fweight={400}
													margin={"0px 10px"}
													color={"#FF5C5C"}
												>
													Resep yang sudah dibuat hanya dapat digunakan satu kali di aplikasi AlteaCare
												</LabelText>

											</FlexRow>
										</ContainerInfo>
										<DoctorInfo
											doctorName={"dr Jesslyn"}
											doctorSpecialization={"dokter umum"}
											doctorCode={"ffsafa"}
											datePrescription={"fdsfdsf"}

										/>
										<HorizontalLine />
										<PatientInfo
											patientName={"Tony Stark"}
											patientAge={"20 tahun"}
										/>
										<HorizontalLine />
										<DoctorPrescription
											medicineName={"R/ Amiodipine 5mg"}
											medicineDosage={" 3 x 1 tablet per hari"}
											howToConsume={"Dikonsumsi sebelum makan"}
											timeToConsume={"Waktu: pagi,siang dan malam"}
											notes={"catatan: secukupnya saja"}
										/>

										<HorizontalLine />

										<DoctorPrescription
											medicineName={"R/ Amiodipine 5mg"}
											medicineDosage={" 3 x 1 tablet per hari"}
											howToConsume={"Dikonsumsi sebelum makan"}
											timeToConsume={"Waktu: pagi,siang dan malam"}
											notes={"catatan: secukupnya saja"}
										/>

										<ContainerBottom>
											<LabelText
												color={"#8F90A6"}
												fsize={12}
												talign={"center"}
												wspace={"pre-line"}
											>
												Resep digital ini hanya dapat digunakan melalui aplikasi
											</LabelText>
											<LabelText
												color={"#8F90A6"}
												fsize={12}
												talign={"center"}
												wspace={"pre-line"}
											>
												AlteaCare
											</LabelText>

											<LogoImage
												src="/static/images/logo_Alteacare.svg"
												height={50}
												width={"40%"}
											/>

											<HorizontalLine />
											<BtnDownloadPDF
												onClick={() => downloadPDF()}
											>
												Unduh PDF
											</BtnDownloadPDF>
										</ContainerBottom>

									</ContainerInside>
								</ContainerCardContent>
							</GeneralCard>
						</ContentContainer>
					</CustomFlex>
				</InsideContainer>
			</CustomContainerGeneral>
		</Fragment >
	)
}

export const PrescriptionContent = memo(_PrescriptionContent);