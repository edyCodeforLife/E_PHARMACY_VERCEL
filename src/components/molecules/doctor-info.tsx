import { memo } from 'react';
import styled from '@emotion/styled';
import { Flex, FlexRowSpaceBetween } from '../atoms/flex';
import { LabelText } from '../atoms/typography';

export type IPropsDoctorInfo = {
	doctorName: string;
	doctorSpecialization: string;
	doctorCode: string;
	datePrescription: Date | string;
}

const DoctorInfoContainer = styled(Flex)`
	padding: 10px 20px;
	background: #fff;
	margin: 1px 0px;
	width: 100%;
	box-sizing: border-box;
`;

function _DoctorInfo(props: IPropsDoctorInfo) {
	const { doctorName, doctorSpecialization, doctorCode, datePrescription } = props;
	return (
		<DoctorInfoContainer>
			<LabelText
				color={"#000000"}
				fsize={14}
			>
				{doctorName}
			</LabelText>

			<LabelText
				color={"#8F90A6"}
				fsize={12}
			>
				{doctorSpecialization}
			</LabelText>
			<FlexRowSpaceBetween>
				<LabelText
					color={"#8F90A6"}
					fsize={12}
				>
					{doctorCode}
				</LabelText>

				<LabelText
					color={"#8F90A6"}
					fsize={12}
				>
					{datePrescription}
				</LabelText>
			</FlexRowSpaceBetween>
		</DoctorInfoContainer>
	);
}

export const DoctorInfo = memo(_DoctorInfo);
