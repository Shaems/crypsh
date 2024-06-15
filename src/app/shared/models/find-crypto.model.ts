export class FindCrypto {
	page: number = 1;
	per_page: number = 10;
	order?: string;
	vs_currency: string = 'eur';
	ids?: string;
}