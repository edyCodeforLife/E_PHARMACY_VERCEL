import type { NextPage } from 'next'
import styles from '../../../styles/_styles-web.module.scss';
import { useRouter } from 'next/router';
import { PaymentProceeddContent } from '../../../components/pages-components/payment-proceed';
import useRedirectTo from '../../../libs/hooks/use-redirectTo';
import { replace } from 'lodash';

const PaymentCompleted: NextPage = () => {
	const router = useRouter();
	const { refCode } = router.query;
	const _ref_code = refCode as string;
    const [paymentMethod, paymentMethodAs] = useRedirectTo(`/payment-method/[orderCode]`);


	const redirectTo = () => {
        setTimeout(() => {
            router.replace(
                `${paymentMethod}`,
                `${replace(paymentMethodAs, '[orderCode]', _ref_code)}`,
            );
        }, 50);
	}
    

	return (
		<div className={styles.insidebody}>
			<div className={styles.fullscreen}>
				<div className={styles.container}>
					<PaymentProceeddContent
						redirectTo={redirectTo}
					/>
				</div>
			</div>
		</div>

	)
}

export default PaymentCompleted;
