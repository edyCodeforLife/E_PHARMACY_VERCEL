import { Fragment, memo } from "react";
import { FlexRow } from "../atoms/flex";
import RoomIcon from '@mui/icons-material/Room';
import { CustomText } from "../atoms/typography";
import { CustomContainer } from "../pages-components/order-detail";
import { Divide } from "../pages-components/shipping-info";

export interface IAddressInfo {
    receiverName: string;
    receiverPhone: string;
    addressFormatted: [];
}

function _AddressInfo(props: IAddressInfo) {
    const { receiverName, receiverPhone, addressFormatted } = props;

    return (
        <Fragment>
            <CustomContainer>
                <FlexRow>
                    <RoomIcon
                        sx={{ color: '#3E8CB9' }}
                        />
                    <CustomText
                        fsize={14}  
                        fweight={600} 
                        color="#6B7588" 
                        margin='0 0 0 8px'
                        >
                            Alamat Pengiriman
                        </CustomText>
                </FlexRow>
            </CustomContainer>

            <CustomContainer 
                padding='12px 0 0 0'
                >
                <FlexRow>
                    <CustomText 
                        style={Divide} 
                        fsize={12} 
                        fweight={500} 
                        talign="left" 
                        margin="0 5px 8px 0" 
                        color='#8F90A6' 
                        padding='0 5px 0 0'
                        >
                            {receiverName}
                    </CustomText>

                    <CustomText 
                        fsize={12} 
                        fweight={500} 
                        talign="left"
                        color='#8F90A6' 
                        margin="0 0 8px 0"
                        >
                            {receiverPhone}
                    </CustomText>
                </FlexRow>

                <CustomText 
                    fsize={12} 
                    fweight={500} 
                    color='#8F90A6' 
                    talign="left"
                    >
                        {addressFormatted.length > 0 ? addressFormatted.join(', ') : ''}
                </CustomText>
            </CustomContainer>
        </Fragment>
    );
}

export const AddressInfo = memo(_AddressInfo);
