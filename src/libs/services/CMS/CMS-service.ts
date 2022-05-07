
import { AxiosPromise } from 'axios';
import { IResponseBanner, IResponseProductList, IResponseProductCategory, IResponseProductDetail, IResponseGeneralSearch, IResponseTermsCondition, IResponseProductSubCategory } from './ICMS-service';
import { TeleService } from '../config';

export interface ICMSServiceData {
	GetBannerPharmacy(): AxiosPromise<IResponseBanner>;
	GetProductDetail(product_id: string): AxiosPromise<IResponseProductDetail>;
	GeneralSearch(categories: string, query: string): AxiosPromise<IResponseGeneralSearch>;
	GetProductList(query: any, param: any, page: number, limit: number): AxiosPromise<IResponseProductList>;
	GetContactPharmacy(query: string): AxiosPromise<any>;
	GetTermsCondition(type: string): AxiosPromise<IResponseTermsCondition>;
	GetCategory(_isRoot: boolean, _sort: string, page?: number, limit?: number, query?: any): AxiosPromise<IResponseProductCategory>;
	GetCategoryById(id: string): AxiosPromise<IResponseProductCategory>;
	GetSubCategoryById(id: string, _sort: string, page?: number, limit?: number): AxiosPromise<IResponseProductSubCategory>;
}

export class CMSServiceData implements ICMSServiceData {
	GetBannerPharmacy(): AxiosPromise<IResponseBanner> {
		return TeleService.get<IResponseBanner>('/data/banners?category=PHARMACY');
	}

	GetProductList(query: string, param: any, page: number, limit: number): AxiosPromise<IResponseProductList> {
		return TeleService.get<IResponseProductList>(`/data/products?sub_categories.${query}=${param}&_page=${page}&_limit=${limit}`);
	}

	GetProductDetail(product_id: string): AxiosPromise<IResponseProductDetail> {
		return TeleService.get<IResponseProductDetail>(`/data/products/${product_id}`);
	}

	GeneralSearch(categories: string, query: string): AxiosPromise<IResponseGeneralSearch> {
		return TeleService.get<IResponseGeneralSearch>(`/data/products?${categories}name_contains=${query}`);
	}

	GetContactPharmacy(query: string): AxiosPromise<any> {
		return TeleService.get<IResponseGeneralSearch>(`/data/contents?type=${query}`);
	}

	GetTermsCondition(type: string): AxiosPromise<IResponseTermsCondition> {
		return TeleService.get<IResponseTermsCondition>(`/data/blocks?type=${type}`);
	}

	GetCategory(_isRoot: boolean, _sort: string, page?: number, limit?: number, query?:any): AxiosPromise<IResponseProductCategory> {
		return TeleService.get<IResponseProductCategory>(`/data/product-categories?is_root=${_isRoot}&_sort=${_sort}&_page=${page}&_limit=${limit}${query}`);
	}

	GetCategoryById(id: string): AxiosPromise<IResponseProductCategory> {
		return TeleService.get<IResponseProductCategory>(`/data/product-categories/${id}`);
	}

	GetSubCategoryById(id: string, _sort: string, page?: number, limit?: number): AxiosPromise<IResponseProductCategory> {
		return TeleService.get<IResponseProductCategory>(`/data/product-categories?parents.id=${id}&_sort=${_sort}&_page=${page}&_limit=${limit}`);
	}
}