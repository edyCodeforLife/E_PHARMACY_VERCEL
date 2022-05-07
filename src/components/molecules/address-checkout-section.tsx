import { memo } from 'react';
import styled from '@emotion/styled';
import { Flex, FlexRowSpaceBetween } from '../atoms/flex';
import { LabelText } from '../atoms/typography';
import { CustomFlexSpaceBetween } from './delivery-section';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const AddressContainerSection = styled(Flex)`
	padding: 5px 15px;
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

const ContainerAddress = styled.div`
	width: 100%;
`

function _AddressCheckout(props: any) {
	const { address } = props;
	const address_formatted = `${address?.street}, ${address?.rt_rw}, ${address?.sub_district.name}, ${address?.district.name}, ${address?.city.name}, ${address?.province.name}, ${address?.country.name}, ${address?.sub_district.postal_code}`;

	return (
		<AddressContainerSection>
			<CustomFlexSpaceBetween>
				<ContainerAddress>
					<CustomFlexSpaceBetween>
						<LabelText
							fsize={12}
						>
							{address?.id ? `${address?.receiver_name} (${address?.receiver_phone})` : 'Masukkan Alamat Pengiriman'}
						</LabelText>

					</CustomFlexSpaceBetween>

					<LabelText
						color={"#8F90A6"}
						fsize={12}
						fweight={500}
					>
						{address?.id ? address_formatted : 'Pastikan alamat Anda sudah sesuai'}
					</LabelText>
				</ContainerAddress>

				<ArrowForwardIosIcon
					sx={{ color: '#3E8CB9', fontSize: 14 }}
				/>
			</CustomFlexSpaceBetween>
		</AddressContainerSection>
	);
}

export const AddressCheckout = memo(_AddressCheckout);
