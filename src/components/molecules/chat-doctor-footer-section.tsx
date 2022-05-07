import { memo } from 'react';
import styled from '@emotion/styled';
import { Flex, FlexRow } from '../atoms/flex';
import { LabelText } from '../atoms/typography';
import { BasicBtn } from '../atoms/button';
import { CustomFooter } from '../atoms/custom-element';
import { currencyFormat } from "../../libs/function";

const CustomBtn = styled(BasicBtn)`
	font-size: 14px;
    font-weight: 500;
    padding: 12px 35px;
    margin: 0 0 10px 0;
    color: white;
    background-color: #61C7B5;
    border-radius: 20px;
	&:disabled {
		background-color: #C7C9D9;
		color: #fff;
	};
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const CustomFlexRow = styled(FlexRow)`
    padding: 15px 0;
    text-align: center !important;
    justify-content: center;
`

export interface IPaymentFooterProps {
	onClickPayment(e: any): void;
	isDisabled: boolean;
}

function _ChatDoctorFooterSection(props: IPaymentFooterProps) {
	const { onClickPayment, isDisabled } = props;
	return (
		<CustomFooter style={{ padding: '5px 15px' }} jcontent='center'>
            <Container>
                <CustomFlexRow>
                    <LabelText
                        fsize={12}
                        fweight={400}
                        color='#6B7588'
                    >
                        Layanan chat dengan dokter ini
                    </LabelText>
                    <LabelText
                        fsize={12}
                        fweight={700}
                        color='#FD7A7A'
                        margin="0 0 0 5px"
                    >
                        GRATIS
                    </LabelText>
                </CustomFlexRow>

                <CustomBtn
                    onClick={(e) => onClickPayment(e)}
                    disabled={isDisabled}
                >
                    Chat dengan Dokter
                </CustomBtn>
            </Container>

		</CustomFooter>
	);
}

export const ChatDoctorFooterSection = memo(_ChatDoctorFooterSection);
