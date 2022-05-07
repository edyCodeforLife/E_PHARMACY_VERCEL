import type { NextPage } from 'next'
import styles from '../../styles/_styles-web.module.scss';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PrescriptionContent } from '../../components/pages-components/prescription/index';


const PrescriptionPage: NextPage = () => {
	const router = useRouter();

	const onBack = () => {
		router.push('/', undefined, {
			shallow: true
		});
	}

	const downloadPDF = () => {
		alert("tes")
	}

	return (
		<div className={styles.insidebody}>
			<div className={styles.fullscreen}>
				<div className={styles.container}>
					<PrescriptionContent
						onBack={onBack}
						downloadPDF={downloadPDF}
					/>
				</div>
			</div>
		</div>

	)
}

export default PrescriptionPage;
