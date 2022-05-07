import type { NextPage } from 'next'
import styles from '../../styles/_styles-web.module.scss';
import { CategoryPageContent } from '../../components/pages-components/category/index';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { CMSService, ICMSService } from '../../libs/business';

const Category: NextPage = () => {
	const _limit = 18;
	const router = useRouter();
	const { categoriesId } = router.query;
	const _categoriesId = categoriesId as string;
	const isLoadSubCategory = useRef(false);
	const _CMSService: ICMSService = new CMSService();
    const [subCategoryList, setSubCategoryList] = useState<any>([]);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);
	
	const onBack = () => {
		router.push('/', undefined, {
			shallow: true
		})
	}

    const getSubCategoryById = () => {
		_CMSService.GetSubCategoryById(_categoriesId, "general_weight_children:DESC", page, _limit, {
			Success: (res:any) => {
				setTimeout(() => {
					if (res.data.length > 0) {
						isLoadSubCategory.current ? setSubCategoryList(subCategoryList.concat(res.data)) : setSubCategoryList(res.data);
					}
					setHasMore(false);
				}, 500);
			},
			ValidationError: (data: any) => {
				console.log(data)
			},
			ServerError: (data: any) => {
				console.log(data);
			},
			NotFound: (data: any) => {
				setHasMore(false);
			}
		})
	}

    const getSubCategory = () => {
		if (_categoriesId !== undefined) return;
		_CMSService.GetCategory(false, "general_weight_children:DESC", page, _limit, '', {
			Success: (res:any) => {
				setTimeout(() => {
					if (res.data.length > 0) {
						isLoadSubCategory.current ? setSubCategoryList(subCategoryList.concat(res.data)) : setSubCategoryList(res.data);
					}
					setHasMore(false);
				}, 500);
			},
			ValidationError: (data: any) => {
				console.log(data)
			},
			ServerError: (data: any) => {
				console.log(data);
			},
			NotFound: (data: any) => {
				setHasMore(false);
			}
		})
	}

	const updateSubCategory = () => {
		setHasMore(true);
		isLoadSubCategory.current = true;
		setPage(page + 1);
	}

	const goToProductList = (sub_categoriesId: string) => {
		const routeProductList = _categoriesId && _categoriesId !== undefined ? `/product-list?categories=${categoriesId}&sub_categories=${sub_categoriesId}` : `/product-list?sub_categories=${sub_categoriesId}`;
		router.push(routeProductList, undefined, {
			shallow: true
		})
	};

    useEffect(() => {
		if (router.isReady) {
			if (_categoriesId) {
				getSubCategoryById();
			} else if (_categoriesId === undefined) {
				getSubCategory();
			}
		}
    }, [_categoriesId]);

	useEffect(() => {
		if(isLoadSubCategory.current) {
			if (_categoriesId) {
				getSubCategoryById();
			} else if (_categoriesId === undefined) {
				getSubCategory();
			}
		}
	}, [page, isLoadSubCategory]);

	return (
		<div className={styles.insidebody}>
			<div className={styles.fullscreen}>
				<div className={styles.container}>
					<CategoryPageContent
						onBack={onBack}
						goToProductList={goToProductList}
                        subCategoryList={subCategoryList}
						hasMore={hasMore}
						updateSubCategory={updateSubCategory}
					/>
				</div>
			</div>
		</div>

	)
}

export default Category
