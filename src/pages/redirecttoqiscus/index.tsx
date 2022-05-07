import type { NextPage } from 'next'
import styled from '@emotion/styled';
import styles from '../../styles/_styles-web.module.scss';
import { FlexRowCenter } from '../../components/atoms/flex';
import { ContainerSpinner } from '../../components/pages-components/homepage';
import { Spinner } from '../../components/atoms/spinner';
import { ImageLogo } from '../../components/atoms/image';
import { getCheckoutId } from '../../libs/hooks/checkout-data';
import { useEffect } from 'react';


const BlankContainer = styled(FlexRowCenter)`
	align-items: center;
	position: relative;
	text-align: center;
	width: 100%;
	height: 100%;
`;

const CustomContainerSpinner = styled(ContainerSpinner)`
	position: absolute;
	margin-right: 20px;
`

const BlankPage: NextPage = () => {
	const getOrder = () => {
			console.log(getCheckoutId(BlankPage))
	}

	useEffect(() => {
		getOrder();
	}, [])

	return (
		<div className={styles.insidebody}>
			<div className={styles.fullscreen}>
				<BlankContainer>
					<ImageLogo
						src={"/static/images/altea-logo-empty.svg"}
						height={120}
						width={120}
					/>
					<CustomContainerSpinner>
						<Spinner animation='pulse' size='8px' />
					</CustomContainerSpinner>
				</BlankContainer>
			</div>
		</div>
	);
}

export default BlankPage;
