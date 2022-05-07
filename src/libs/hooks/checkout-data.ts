
import { destroyCookie, parseCookies, setCookie } from 'nookies';

import { COOKIES_CHECKOUT_ID } from '../variables';

export const getCheckoutId = (ctx: any): string | null => {
	const c = parseCookies(ctx, { path: '/redirecttoqiscus' });

	return c[COOKIES_CHECKOUT_ID];
};

export const setCheckoutId = (ctx: any, id: string, _expired?: Date): void => {
	if (!id) return;

	setCookie(ctx, COOKIES_CHECKOUT_ID, id, { path: '/redirecttoqiscus' });
};

export const removeCheckoutId = (ctx: any): void => {
	try {
		destroyCookie(ctx, COOKIES_CHECKOUT_ID, { path: '/redirecttoqiscus' });
	} catch (e) {
		console.log(e);
	}
};
