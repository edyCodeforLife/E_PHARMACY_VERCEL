import type { NextPage } from 'next'
import styles from '../../styles/_styles-web.module.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { ICMSService, CMSService, ICartService, CartService } from '../../libs/business/index';
import useRedirectTo from '../../libs/hooks/use-redirectTo';
import { replace } from 'lodash';
import { isMobile, scrollTo } from '../../libs/function';
import { ProductListpageContent } from '../../components/pages-components/product-list';

const ProductListPage: NextPage = () => {
	const router = useRouter();
	const _limit = 12;
	const { categories } = router.query;
	const _categoriesId = categories as string;
	const { sub_categories } = router.query;
	const _subcategoriesId = sub_categories as string;
	const _CMSService: ICMSService = new CMSService();
	const _CartService: ICartService = new CartService();
	const isLoadProduct = useRef(false);
	const [productList, setProductList] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);
	const [count, setCount] = useState(0);
	const [categoriesName, setCategoriesName] = useState('');
	const [productDetail, productDetailAs] = useRedirectTo(`/product/[productId]`);
	const queryProduct = _categoriesId ? `${_subcategoriesId}&categories.id_in=${_categoriesId}` : `${_subcategoriesId}`;
	const routeQuerySearch = _categoriesId ? `categories=${_categoriesId}&sub_categories=${_subcategoriesId}` : `sub_categories=${_subcategoriesId}`

	const onBack = () => {
		router.push( _categoriesId !== undefined ? `/category?categoriesId=${_categoriesId}` : '/', undefined, {
			shallow: true
		})
	}

	const handleClick = () => {
		router.push(`/search?${routeQuerySearch}`, undefined, {
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
		setHasMore(true);
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

	const getProductList = () => {
		_CMSService.GetProductList('id_in', queryProduct, page, _limit, {
			Success: (res: any) => {
				setTimeout(() => {
					setProductList(productList.concat(res.data));
				    setHasMore(false);
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

	const getSubCategory = () => {
		_CMSService.GetCategoryById(_subcategoriesId, {
			Success: (res:any) => {
				setCategoriesName(res.data?.name)
			},
			ValidationError: (data: any) => {
				console.log(data)
			},
			ServerError: (data: any) => {
				console.log(data);
			},
			NotFound: (data: any) => {
				console.log(data)
			}
		})
	}

	const scrollTop = () => {
		if (typeof window === 'object') {
			const element = document.getElementById("scrollableDiv")
			scrollTo(element, 0, 250)
		}
	}

	const gotoDetail = useCallback((productId: string) => {
		router.replace(
			`${productDetail}`,
			`${replace(productDetailAs, '[productId]', productId)}`,
		);
	}, [productDetail, productDetailAs]);

	useEffect(() => {
		getCartCounter();
	}, []);

	useEffect(() => {
		if (router.isReady) {
			if (_categoriesId || _subcategoriesId) {
				getProductList();
				getSubCategory();
			}
		}
	}, [_categoriesId, _subcategoriesId]);

	useEffect(() => {
		isLoadProduct.current && getProductList();
	}, [page, isLoadProduct]);

	return (
		<div className={styles.insidebody}>
			<div className={styles.fullscreen}>
				<div className={styles.container}>
					<ProductListpageContent
						handleClick={handleClick}
						onBack={onBack}
						productList={productList}
						gotoDetail={gotoDetail}
						page={page}
						updateProduct={updateProduct}
						hasMore={hasMore}
						cartCount={count}
						scrollTop={scrollTop}
						redirectToCart={redirectToCart}
						redirectToOrder={redirectToOrder}
						categoriesName={categoriesName}
					/>
				</div>
			</div>
		</div>

	)
}

export default ProductListPage
