import { memo } from 'react';
import styled from '@emotion/styled';
import { Flex, FlexRowSpaceBetween } from '../atoms/flex';
import { LabelText } from '../atoms/typography';

export type IPropsDoctorPrescription = {
	medicineName: string;
	medicineDosage: string;
	howToConsume: string;
	timeToConsume:  string;
	notes: string;
}

const DoctorPrescriptionContainer = styled(Flex)`
	padding: 10px 20px;
	background: #fff;
	margin: 1px 0px;
	width: 100%;
	box-sizing: border-box;
`;

function _DoctorPrescription(props: IPropsDoctorPrescription) {
	const { medicineName, medicineDosage, howToConsume, timeToConsume, notes } = props;
	return (
		<DoctorPrescriptionContainer>
			<LabelText
				color={"#000000"}
				fsize={14}
			>
				{medicineName}
			</LabelText>

			<LabelText
				color={"#8F90A6"}
				fsize={12}
				margin={"10px 0px"}
			>
				Cara penggunaan obat:
			</LabelText>
			<Flex>
				<LabelText
					color={"#3A3A3C"}
					fsize={12}
				>
					{medicineDosage}
				</LabelText>

				<LabelText
					color={"#3A3A3C"}
					fsize={12}
					margin={"5px 0px"}
				>
					{howToConsume}
				</LabelText>

				<LabelText
					color={"#3A3A3C"}
					fsize={12}
				>
					{timeToConsume}
				</LabelText>

				<LabelText
					color={"#3A3A3C"}
					fsize={12}
					margin={"5px 0px"}
				>
					{notes}
				</LabelText>

			</Flex>
		</DoctorPrescriptionContainer>
	);
}

export const DoctorPrescription = memo(_DoctorPrescription);
