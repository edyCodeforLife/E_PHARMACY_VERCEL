import { memo } from 'react';
import styled from '@emotion/styled';
import { Flex, FlexRowSpaceBetween } from '../atoms/flex';
import { LabelText } from '../atoms/typography';

export type IPropsPatientInfo = {
	patientName: string;
	patientAge: number | string;
}

const PatientInfoContainer = styled(Flex)`
	padding: 10px 20px;
	background: #fff;
	margin: 1px 0px;
	width: 100%;
	box-sizing: border-box;
`;

function _PatientInfo(props: IPropsPatientInfo) {
	const { patientName, patientAge } = props;
	return (
		<PatientInfoContainer>
			<LabelText
				color={"#8F90A6"}
				fsize={12}
			>
				Nama Pasien:
			</LabelText>

			<FlexRowSpaceBetween>
				<LabelText
					color={"#000000"}
					fsize={14}
				>
					{patientName}
				</LabelText>

				<LabelText
					color={"#8F90A6"}
					fsize={12}
				>
					{patientAge}
				</LabelText>
			</FlexRowSpaceBetween>
		</PatientInfoContainer>
	);
}

export const PatientInfo = memo(_PatientInfo);
