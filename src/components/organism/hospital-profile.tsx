import { Fragment, memo } from "react";
import { FlexRow, FlexRowSpaceBetween } from "../atoms/flex";
import { CustomText } from "../atoms/typography";
import { CustomContainer } from "../pages-components/order-detail";
import InfoIcon from '@mui/icons-material/Info';
import styled from "@emotion/styled";

export interface IHospitalProfile {
    name: string;
    pharmacy_installation: string;
    pharmacist: string;
    sipa: string;
    operational_hour_start: string;
    operational_hour_end: string;
    lat: string;
    long: string;
    address: string;
}

const FlexBetweenStart = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`

function _HospitalProfile(props: IHospitalProfile) {
	const { 
		name,
		pharmacy_installation,
		pharmacist,
		sipa,
		operational_hour_start,
		operational_hour_end,
		lat,
		long,
		address
	} = props;

	return (
		<Fragment>
			<CustomContainer>
				<FlexRow>
					<InfoIcon sx={{ color: "#3E8CB9" }} />
					<CustomText
						fsize={14}
						fweight={600}
						color="#6B7588"
						margin="0 0 0 8px"
					>
						Informasi Instalasi Farmasi
					</CustomText>
				</FlexRow>
			</CustomContainer>

			<CustomContainer padding="12px 0 0 0">
				<CustomText fsize={12} fweight={700} color="#8F90A6" padding="5px">
					Obat dikirim dari :
				</CustomText>
				<FlexRowSpaceBetween>
					<CustomText
						fsize={12}
						fweight={400}
						color="#8F90A6"
						lheight={2}
						padding="0 5px"
					>
						Instalasi Farmasi
					</CustomText>
					<CustomText
						fsize={12}
						talign="right"
						fweight={400}
						color="#8F90A6"
						lheight={2}
						padding="0 5px"
					>
						{pharmacy_installation}
					</CustomText>
				</FlexRowSpaceBetween>

				<FlexRowSpaceBetween>
					<CustomText
						fsize={12}
						fweight={400}
						color="#8F90A6"
						lheight={2}
						padding="0 5px"
					>
						Nama Apoteker
					</CustomText>
					<CustomText
						fsize={12}
						talign="right"
						fweight={400}
						color="#8F90A6"
						lheight={2}
						padding="0 5px"
					>
						{pharmacist}
					</CustomText>
				</FlexRowSpaceBetween>

				<FlexRowSpaceBetween>
					<CustomText
						fsize={12}
						fweight={400}
						color="#8F90A6"
						lheight={2}
						padding="0 5px"
					>
						SIPA
					</CustomText>
					<CustomText
						fsize={12}
						talign="right"
						fweight={400}
						color="#8F90A6"
						lheight={2}
						padding="0 5px"
					>
						{sipa}
					</CustomText>
				</FlexRowSpaceBetween>

				<FlexRowSpaceBetween>
					<CustomText
						fsize={12}
						fweight={400}
						color="#8F90A6"
						lheight={2}
						padding="0 5px"
					>
						Jadwal Praktik
					</CustomText>
					<CustomText
						fsize={12}
						talign="right"
						fweight={400}
						color="#8F90A6"
						lheight={2}
						padding="0 5px"
					>
						{operational_hour_start?.substring(0, 5)} sampai {operational_hour_end?.substring(0, 5)}
					</CustomText>
				</FlexRowSpaceBetween>

				<FlexRowSpaceBetween>
					<CustomText
						fsize={12}
						fweight={400}
						color="#8F90A6"
						lheight={2}
						padding="0 5px"
					>
						Titik Lokasi
					</CustomText>
					<CustomText
						fsize={12}
						talign="right"
						fweight={400}
						color="#8F90A6"
						lheight={2}
						padding="0 5px"
					>
						{lat}, {long}
					</CustomText>
				</FlexRowSpaceBetween>

				<FlexBetweenStart>
					<CustomText
						fsize={12}
						fweight={400}
						color="#8F90A6"
						lheight={2}
						padding="0 5px"
					>
						Alamat
					</CustomText>
					<CustomText
						fsize={12}
						talign="right"
						fweight={400}
						color="#8F90A6"
						padding="0 5px 0 80px"
					>
						{address}
					</CustomText>
				</FlexBetweenStart>
			</CustomContainer>
		</Fragment>
	);
}

export const HospitalProfile = memo(_HospitalProfile);
