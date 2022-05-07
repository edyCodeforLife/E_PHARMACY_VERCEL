
import { IResponseSuccess, HandleError } from '../../services/error/error';
import { CMSServiceData, ICMSServiceData } from '../../services/CMS/CMS-service';

export interface ICMSService {
	GetBannerPharmacy(handler: IResponseSuccess): void;
	GetProductDetail(product_id: string, handler: IResponseSuccess): void;
	GeneralSearch(categories: string, query: string, handler: IResponseSuccess): void;
	GetProductList(query: string, param: any, page: number, limit: number, handler: IResponseSuccess): void;
	GetContactPharmacy(query: string, handler: IResponseSuccess): void;
	GetTermsCondition(type: string, handler: IResponseSuccess): void;
	GetCategory(_isRoot: boolean, _sort: string, page: number, limit: number, query: any, handler: IResponseSuccess): void;
	GetCategoryById(id: string, handler: IResponseSuccess): void;
	GetSubCategoryById(id: string, _sort: string, page: number, limit: number, handler: IResponseSuccess): void;
}

export class CMSService implements ICMSService {
	private _service: ICMSServiceData;

	constructor() {
		this._service = new CMSServiceData();
	}

	async GetBannerPharmacy(handler: IResponseSuccess) {
		try {
			const response = await this._service.GetBannerPharmacy();
			return await handler.Success?.(response?.data);
		}
		catch (e: any) {
			return HandleError(e, handler);
		}
	}

	async GetProductList(query: string, param: any, page: number, limit: number, handler: IResponseSuccess) {
		try {
			const response = await this._service.GetProductList(query, param, page, limit);
			return await handler.Success?.(response?.data);
		}
		catch (e: any) {
			return HandleError(e, handler);
		}
	}

	async GetProductDetail(product_id: string, handler: IResponseSuccess) {
		try {
			const response = await this._service.GetProductDetail(product_id);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return console.log(e);
		}
	}

	async GeneralSearch(categories: string, query: string, handler: IResponseSuccess) {
		try {
			const response = await this._service.GeneralSearch(categories, query);
			return await handler.Success?.(response?.data);
		}
		catch (e: any) {
			return HandleError(e, handler);
		}
	}

	async GetContactPharmacy(query: string, handler: IResponseSuccess) {
		try {
			const response = await this._service.GetContactPharmacy(query);
			return await handler.Success?.(response?.data);
		}
		catch (e: any) {
			return HandleError(e, handler);
		}
	}

	async GetTermsCondition(type: string, handler: IResponseSuccess) {
		try {
			const response = await this._service.GetTermsCondition(type);
			return await handler.Success?.(response?.data);
		}
		catch (e: any) {
			return HandleError(e, handler);
		}
	}

	async GetCategory(_isRoot: boolean, _sort: string, page: number, limit: number, query: any, handler: IResponseSuccess) {
		try {
			const response = await this._service.GetCategory(_isRoot,_sort, page, limit, query);
			return await handler.Success?.(response?.data);
		}
		catch (e: any) {
			return HandleError(e, handler);
		}
	}

	async GetCategoryById(id: string, handler: IResponseSuccess) {
		try {
			const response = await this._service.GetCategoryById(id);
			return await handler.Success?.(response?.data);
		}
		catch (e: any) {
			return HandleError(e, handler);
		}
	}

	async GetSubCategoryById(id: string, _sort: string, page: number, limit: number, handler: IResponseSuccess) {
		try {
			const response = await this._service.GetSubCategoryById(id,_sort, page, limit);
			return await handler.Success?.(response?.data);
		}
		catch (e: any) {
			return HandleError(e, handler);
		}
	}
}