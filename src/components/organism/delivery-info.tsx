import { memo } from "react";
import { FlexRowSpaceBetween } from "../atoms/flex";
import { CustomText } from "../atoms/typography";
import { CustomContainer } from "../pages-components/order-detail";

export interface IDeliveryInfo {
    courierInfo: string;
    addressFormatted: [];
}

function _DeliveryInfo(props: IDeliveryInfo) {
	const { courierInfo, addressFormatted } = props;

	return (
		<CustomContainer margin="12px 0">
			<FlexRowSpaceBetween>
				<CustomText fsize={12} fweight={400} color="#6B7588" padding="5px">
					Pengiriman
				</CustomText>
				<CustomText
					fsize={12}
					talign="right"
					fweight={400}
					color="#6B7588"
					padding="5px"
				>
					{courierInfo}
				</CustomText>
			</FlexRowSpaceBetween>

			<FlexRowSpaceBetween>
				<CustomText fsize={12} fweight={400} color="#6B7588" padding="5px">
					No Resi
				</CustomText>
				<CustomText
					fsize={12}
					talign="right"
					fweight={400}
					color="#6B7588"
					padding="5px"
				></CustomText>
			</FlexRowSpaceBetween>

			<FlexRowSpaceBetween>
				<CustomText fsize={12} fweight={400} color="#6B7588" padding="5px">
					Alamat
				</CustomText>
				<CustomText
					fsize={12}
					talign="right"
					fweight={400}
					color="#6B7588"
					padding="5px 0 5px 50px"
				>
					{addressFormatted.length > 0 ? addressFormatted.join(", ") : ""}
				</CustomText>
			</FlexRowSpaceBetween>
		</CustomContainer>
	);
}

export const DeliveryInfo = memo(_DeliveryInfo);
