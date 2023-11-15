const TELEGRAM_API_BASE = 'https://api.telegram.org';

export interface BaseInput {
	token: string;
}

export interface BaseResponse {
	ok: boolean;
	description?: string;
}

type APIParameters = ConstructorParameters<typeof URLSearchParams>[0];

/**
 * Return url to telegram api, optionally with parameters added
 */
function apiUrl({ token, method, params }: { token: string; method: string; params: APIParameters }) {
	let query = '';
	if (params) {
		query = '?' + new URLSearchParams(params).toString();
	}
	const url = `${TELEGRAM_API_BASE}/bot${token}/${method}${query}`;
	console.log(`url=${url}`)
	return url;
}

export interface SetWebhookInput extends BaseInput {
	url: string;
	max_connections?: number;
	allowed_updates?: string[];
	drop_pending_updates?: boolean;
	secret_token?: string;
}

export type SetWebhookResponse = BaseResponse;

/**
 * https://core.telegram.org/bots/api#setwebhook
 * @param input
 * @returns
 */
export async function setWebhook(input: SetWebhookInput): Promise<SetWebhookResponse> {
	const { token, ...params } = input;
	console.log(fetch.toString());

	const resp = await fetch(apiUrl({ method: 'setWebhook', token, params: JSON.stringify(params) }));
	const json = resp.ok ? ((await resp.json()) as SetWebhookResponse) : { ok: false, description: `[fetch] ${resp.status} ${resp.statusText}` };
	return json;
}
