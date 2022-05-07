import { memo, Fragment } from 'react';
import styled from '@emotion/styled';
import {
	CustomContainerGeneral,
	InsideContainer,
	CustomFlex,
	ContentContainer,
	CustomHeader
} from '../../../components/atoms/custom-element';
import Flex, { FlexRow, FlexRowCenter } from '../../atoms/flex';
import { ContainerCardContent } from '../../atoms/card';
import { CustomFlexRowCenter } from '../../../components/atoms/flex';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { FlexOneCustom, FlexRowSpaceBetween } from '../../atoms/flex';
import Grid from '@mui/material/Grid';
import InfiniteScroll from 'react-infinite-scroll-component';
import { BasicBtn } from '../../atoms/button';
import { BoxCategory } from '../../organism/box-category';
import { CustomGeneralCard } from '../shipping-info';
import { IDataCategory } from '../../../libs/services/CMS/ICMS-service';
import { Spinner } from '../../atoms/spinner';
import { BannerCategorySection } from '../../molecules/banner-category-section';

export interface ICategoryPageContentProps {
	onBack(): void;
    subCategoryList: IDataCategory[];
	hasMore: boolean;
	updateSubCategory(): void;
	goToProductList(sub_categoriesId: string): void;
}

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
    height: calc(100vh - 100px);
    box-sizing: border-box;
    align-items: flex-start;
    justify-content: flex-start;
    overflow: scroll;
    background: linear-gradient(180deg, #FFFFFF 10.3%, #D6EDF6 98.21%);
    width: 100%;
    padding-bottom: 40px;
    @media (max-width: 768px) {
        height: calc(100vh - 60px);
        padding-bottom: 20px;
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

export const BackToTopContainer = styled.div`
	border-radius: 50%;
	padding:9px 12px;
	background-color: #61C7B5;
`;

export const ContainerCustomerService = styled(FlexRow)`
	margin: 15px 0px;
	justify-content: space-around;
`;

export const BtnWhatsapp = styled(BasicBtn)`
	border-radius: 6px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 8px;
	color: #fff;
`;

const FlexRowSpaceAround = styled(FlexRow)`
	justify-content: space-around;
	align-items: flex-start;
	flex-wrap: wrap;
	margin-top: 20px;
	padding: 0px 20px;
	width: 100%;
`;

function _CategoryPageContent(props: ICategoryPageContentProps) {
	const {
		onBack, 
		subCategoryList,
		hasMore,
		updateSubCategory,
		goToProductList
	} = props;

	return (
		<Fragment>
			<CustomContainerGeneral>
				<InsideContainer>
					<CustomFlex>
						<ContentContainer>
							<CustomGeneralCard variant="outlined">
								<ContainerCardContent>
									<FlexRowCustomize alignItems={"flex-start"}>
										<CustomHeader>
											<FlexOneCustom
												cursor={"pointer"}
												textAlign={"left"}
												flex={"25% 0 0"}
												onClick={() => onBack()}
											>
												<ArrowBackIosNewIcon sx={{ color: "#2C528B" }} />
											</FlexOneCustom>
											<FlexOneCustom flex={"50% 0 0"}>
												<HeaderText>Kategori Obat</HeaderText>
											</FlexOneCustom>
										</CustomHeader>
									</FlexRowCustomize>

									<ContainerInside id="scrollableDiv">
										
										<BannerCategorySection/>

										<InfiniteScroll
											style={{ width: "100%" }}
											dataLength={subCategoryList.length}
											hasMore={hasMore || true}
											scrollableTarget="scrollableDiv"
											loader={
												hasMore ? (
													<ContainerSpinner>
														<Spinner />
													</ContainerSpinner>
												) : null
											}
											next={() => {
												updateSubCategory();
											}}
										>
											<ContainerProduct container spacing={2}>
												<FlexRowSpaceAround>
													{subCategoryList?.map((item: any, idx: number) => (
														<BoxCategory
															id={item.product_category_id}
															key={idx}
															activeHover={false}
															iconHeight={40}
															iconWidth={40}
															iconSrc={item?.icon?.formats?.thumbnail}
															categoryName={item.name}
															loading={false}
															isForMobileLayout
															containerminwidth={"100px"}
															containerwidth={"100px"}
															mobileconPadding={"2px 2px"}
															mobileconMargin={"6px 2px"}
															onRedirect={goToProductList}
														/>
													))}
												</FlexRowSpaceAround>
											</ContainerProduct>
										</InfiniteScroll>
									</ContainerInside>
								</ContainerCardContent>
							</CustomGeneralCard>
						</ContentContainer>
					</CustomFlex>
				</InsideContainer>
			</CustomContainerGeneral>
		</Fragment>
	);
}

export const CategoryPageContent = memo(_CategoryPageContent);