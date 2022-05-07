import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import styles from '../../styles/_styles-web.module.scss';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ICMSService, CMSService, OrderService, IOrderService } from '../../libs/business/index';
import { StatusOrder } from '../../libs/services/order/IOrder-service';
import useRedirectTo from '../../libs/hooks/use-redirectTo';
import { replace, isEmpty } from 'lodash';
import { QrsToObj } from '../../libs/function';

const OrderPageContent = dynamic?.(
	() => import('../../components/pages-components/order/index'),
	{ ssr: false }
  )

const OrderPage: NextPage = () => {
	const switchBackStatus = (status: string) => {
		switch (status) {
			case "ACTIVE":
				return "Aktif";
			case "DONE":
				return "Pesanan Selesai";
			case "REJECT":
				return "Dibatalkan";
			default:
				return "Aktif";
		}
	}
	const router = useRouter();
	const _limit = 6;
	const _search = typeof window === 'object' ? QrsToObj(window.location.search) : "";
	const qrs = isEmpty(_search) ? "ACTIVE" : String(_search["status"]);
	const tabStatus = switchBackStatus(qrs);
	const _CMSService: ICMSService = new CMSService();
	const isLoadProduct = useRef(false);
	const isFilterStatusActive = useRef(false);
	const _OrderService: IOrderService = new OrderService();
	const [customerService, setCustomerService] = useState<any>([]);
	const [activeFilterStatus, setActiveFilterStatus] = useState(tabStatus)
	const [myOrderStatus, setMyOrderStatus] = useState<any>(qrs);
	const [page, setPage] = useState(1);
	const [notHaveOrder, setNotHaveOrder] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [orderList, setOrderList] = useState([]);
	const [paymentMethod, paymentMethodAs] = useRedirectTo(`/payment-method/[orderCode]`);
	const [orderDetail, orderDetailAs] = useRedirectTo('/order-detail/[orderId]');

	const onBack = () => {
		router.push('/', undefined, {
			shallow: true
		})
	}

	const updateOrder = () => {
		isLoadProduct.current = true;
		setPage(page + 1);
	}

	const getOrderList = (orderStatus: StatusOrder) => {
		_OrderService.GetOrderList(orderStatus, _limit, page, {
			Success: (res: any) => {
				setTimeout(() => {
					if (orderStatus === myOrderStatus && page === 1) {
						setOrderList(res.data);
					} else {
						setOrderList(orderList.concat(res.data));
					}
					setNotHaveOrder(false);
				}, 50);

			},
			ValidationError: (data: any) => {
				console.log(data)
			},
			ServerError: (data: any) => {
				console.log(data)
			},
			NotFound: (data: any) => {
				if (orderStatus === myOrderStatus && page === 1) {
					setOrderList([]);
					setNotHaveOrder(true);
				}
				setHasMore(false);
			}
		})
	}

	const getContactPharmacy = () => {
		_CMSService.GetContactPharmacy("PUSAT_INFORMASI", {
			Success: (res: any) => {
				setCustomerService(res.data)
			},
			ValidationError: (data: any) => {
				console.log(data)
			},
			ServerError: (data: any) => {
				console.log(data)
			},
			NotFound: (data: any) => {
				console.log(data)
			}
		})
	}

	const gotoWA = (e: any) => {
		customerService?.[0]?.content.phone
		if (!customerService?.[0]?.content.whatsapp) return;
		if (process.browser) {
			window.location.href = customerService?.[0]?.content.whatsapp
		}
	}

	const switchStatus = (status: string) => {
		switch (status) {
			case "Aktif":
				return "ACTIVE";
			case "Pesanan Selesai":
				return "DONE";
			case "Dibatalkan":
				return "REJECT";
			default:
				return "ACTIVE";
		}
	}

	const onAddProduct = () => {
		router.push('/', undefined, {
			shallow: true
		})
	}

	const handleClickFilter = (selected: string, index: number) => {
		isFilterStatusActive.current = true;
		setActiveFilterStatus(selected);
		setPage(1);
		setMyOrderStatus(switchStatus(selected));
	}

	const handleClickBox = (ref_code: string, orderStatus: string, orderId: number) => {
		if (orderStatus === "WAITING_PAYMENT") {
			setTimeout(() => {
				router.replace(
					`${paymentMethod}`,
					`${replace(paymentMethodAs, '[orderCode]', ref_code)}`,
				);
			}, 50);
		} else {
			setTimeout(() => {
				router.replace(
					`${orderDetail}`,
					`${replace(orderDetailAs, '[orderId]', String(orderId))}`,
				);
			}, 50);
		}
	}

	useEffect(() => {
		getOrderList(myOrderStatus);
		getContactPharmacy();
	}, []);

	useEffect(() => {
		isLoadProduct.current && getOrderList(myOrderStatus);
	}, [page, isLoadProduct]);

	useEffect(() => {
		isFilterStatusActive.current && getOrderList(myOrderStatus);
	}, [myOrderStatus])

	return (
		<div className={styles.insidebody}>
			<div className={styles.fullscreen}>
				<div className={styles.container}>
					<OrderPageContent
						onBack={onBack}
						gotoWA={gotoWA}
						hasMore={hasMore}
						customerService={customerService}
						orderList={orderList}
						handleClickBox={handleClickBox}
						updateOrder={updateOrder}
						activeFilterStatus={activeFilterStatus}
						handleClickFilter={handleClickFilter}
						notHaveOrder={notHaveOrder}
						onAddProduct={onAddProduct}
					/>
				</div>
			</div>
		</div>

	)
}

export default OrderPage;
