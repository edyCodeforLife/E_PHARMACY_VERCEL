import type { NextPage } from 'next'
import styles from '../../styles/_styles-web.module.scss';
import { HomepageContent } from '../../components/pages-components/homepage/index';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { ICMSService, CMSService, ICartService, CartService } from '../../libs/business/index';
import useRedirectTo from '../../libs/hooks/use-redirectTo';
import { replace } from 'lodash';
import { isMobile, scrollTo } from '../../libs/function';

const HomePage: NextPage = () => {
	const router = useRouter();
	const _limit = 12;
	const _CMSService: ICMSService = new CMSService();
	const _CartService: ICartService = new CartService();
	const isLoadProduct = useRef(false);
	const [bannerData, setBannerData] = useState([]);
	const [productList, setProductList] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);
	const [count, setCount] = useState(0);
	const [contactPharmacy, setContactPharmacy] = useState<any>([]);
	const [productDetail, productDetailAs] = useRedirectTo(`/product/[productId]`);
	const [category, setCategory] = useState([]);

	const onBack = () => {
		router.push('/backtomobile', undefined, {
			shallow: true
		})
	}

	const setCheckoutOrderId = () => {
		if (typeof window === "object") {
			document.cookie = `alt_order_id=159`;
			router.push('/redirecttoqiscus', undefined, {
				shallow: true
			})
		}
	}

	const getCategory = () => {
		_CMSService.GetCategory(true, "general_weight_children:DESC", 1, 10, "", {
			Success: (res:any) => {
				setCategory(res.data)
			},
			ValidationError: (data: any) => {
				console.log(data)
			},
			ServerError: (data: any) => {
				console.log(data)
			},
			NotFound: (res: any) => {
				_CMSService.GetCategory(false, "general_weight_children:DESC", 1, 10, "", {
					Success: (res:any) => {
						setCategory(res.data)
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
				});
			}
		})
	}

	const handleClick = () => {
		router.push('/search', undefined, {
			shallow: true
		})
	}

	const redirectToCart = () => {
		router.push('/cart', undefined, {
			shallow: true
		})
	}

	const redirectToOrder = () => {
		router.push('/order', undefined, {
			shallow: true
		})
	}

	const updateProduct = () => {
		isLoadProduct.current = true;
		setPage(page + 1);
	}

	const getCartCounter = () => {
		_CartService.GetCartCount({
			Success: (res: any) => {
				setCount(res.data)
			},
			ValidationError: (data: any) => {
				console.log(data)
			},
			ServerError: (data: any) => {
				console.log(data)
			},
			NotFound: (data: any) => {
			}
		})
	}

	const getContactPharmacy = () => {
		_CMSService.GetContactPharmacy("PHARMACY_INFORMATION_CENTER", {
			Success: (res: any) => {
				setContactPharmacy(res.data)
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

	const getProductList = () => {
		_CMSService.GetProductList('is_highlight', true, page, _limit, {
			Success: (res: any) => {
				console.log(isMobile())
				if (isMobile() && res.data.length <= 2) {
					setHasMore(false);
				}

				setTimeout(() => {
					setProductList(productList.concat(res.data));
				}, 500);
			},
			ValidationError: (data: any) => {
				console.log(data)
			},
			ServerError: (data: any) => {
				console.log(data)
			},
			NotFound: (data: any) => {
				setHasMore(false);
			}
		})
	}

	const redirecTo = (url: string) => {
		if (!url) return;
		if (process.browser) {
			window.location.href = url;
		}
	}

	const getBannerPharmacy = () => {
		_CMSService.GetBannerPharmacy({
			Success: (res: any) => {
				setBannerData(res.data);
			},
			ValidationError: (data: any) => {
				console.log(data)
			},
			ServerError: (data: any) => {
				console.log(data)
			}
		});
	}

	const scrollTop = () => {
		if (typeof window === 'object') {
			const element = document.getElementById("scrollableDiv")
			scrollTo(element, 0, 250)
		}
	}

	const gotoWA = (e: any) => {
		e.preventDefault();
		contactPharmacy?.[0]?.content.phone
		if (!contactPharmacy?.[0]?.content.whatsapp) return;
		if (process.browser) {
			(window as any).location.href = contactPharmacy?.[0]?.content.whatsapp;
		}
	}

	const changeRoute = (path: string) => {
		router.push(path, undefined, {
			shallow: true
		})
	}

	const gotoDetail = useCallback((productId: string) => {
		router.replace(
			`${productDetail}`,
			`${replace(productDetailAs, '[productId]', productId)}`,
		);
	}, [productDetail, productDetailAs]);

	useEffect(() => {
		getProductList();
		getBannerPharmacy();
		getCartCounter();
		getContactPharmacy();
		getCategory();
	}, []);

	useEffect(() => {
		isLoadProduct.current && getProductList();
	}, [page, isLoadProduct]);

	return (
		<div className={styles.insidebody}>
			<div className={styles.fullscreen}>
				<div className={styles.container}>
					<HomepageContent
						handleClick={handleClick}
						onBack={onBack}
						bannerData={bannerData}
						productList={productList}
						gotoDetail={gotoDetail}
						page={page}
						updateProduct={updateProduct}
						hasMore={hasMore}
						cartCount={count}
						redirecTo={redirecTo}
						scrollTop={scrollTop}
						redirectToCart={redirectToCart}
						contactPharmacy={contactPharmacy}
						gotoWA={gotoWA}
						redirectToOrder={redirectToOrder}
						category={category}
						changeRoute={changeRoute}
						setOrderId={setCheckoutOrderId}
					/>
				</div>
			</div>
		</div>

	)
}

export default HomePage
