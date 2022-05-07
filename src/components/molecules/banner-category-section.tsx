import { memo } from 'react';
import styled from '@emotion/styled';
import { Flex } from '../atoms/flex';
import { CustomText } from '../atoms/typography';
import { SmallBoxContainer } from '../atoms/small-box';
import Avatar from '@mui/material/Avatar';


export type IpropsBannerCategory = {
	value?: string;
	changeNotes?(value: string): void;
}

const CardContainer = styled.div`
    padding: 16px 25px 0 25px;
    width: 100%;
`;

const BoxContainer = styled(SmallBoxContainer)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    min-height: 20px;
    min-width: 20px;
    height: 120px;
    padding: 10px;
    width: auto;
    border-radius: 8px;
    @media (max-width: 768px) {
        min-height: 20px;
        min-width: 20px;
        height: auto;
        width: auto;
        padding: 10px;
    }
`

const CustomAvatar = styled(Avatar)`
    height: 90px;
    width: 90px;
    // @media (max-width: 768px) {
    //     height: 70px;
    //     width: 70px;
    // }
`

const ContainerLabel = styled(Flex)`
    margin-left: 15px;
`

function _BannerCategorySection(props: IpropsBannerCategory) {
	const { value, changeNotes } = props;
	return (
		<CardContainer>
			<BoxContainer>
				<CustomAvatar
					alt="image"
					src="https://img.freepik.com/free-vector/doctor-with-medical-prescription_136162-16.jpg"
				/>
				<ContainerLabel>
					<CustomText
						fsize={12}
						fweight={600}
						color="#3E8CB9"
						padding="0 0 5px 0"
					>
						Resep Dokter Digital
					</CustomText>
					<CustomText 
                        fsize={10} 
                        fweight={400} 
                        color="#6B7588"
                    >
						Obat ini hanya dapat dibeli menggunakan resep digital melalui
						konsultasi GRATIS dari kami
					</CustomText>
				</ContainerLabel>
			</BoxContainer>
		</CardContainer>
	);
}

export const BannerCategorySection = memo(_BannerCategorySection);
