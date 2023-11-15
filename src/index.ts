import { setWebhook } from '@/telegram';
/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
export interface Env {
	// Get the token from @BotFather https://core.telegram.org/bots#6-botfather
	BOT_TOKEN: string;
	// 1-256 characters. Only characters A-Z, a-z, 0-9, _ and - are allowed
	BOT_SECRET: string;

	WEBHOOK?: string;
}

const DEFAULT_WEBHOOK_SUFFIX = '/endpoint';

async function registerWebhook(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
	const requestUrl = new URL(request.url);
	const webhookUrl = `${requestUrl.protocol}//${requestUrl.hostname}${env.WEBHOOK ?? DEFAULT_WEBHOOK_SUFFIX}`;
	const r = await setWebhook({
		token: env.BOT_SECRET,
		url: webhookUrl,
		secret_token: env.BOT_SECRET,
	});
	return new Response(JSON.stringify(r, null, 2));
}
export default {
	/* eslint-disable-next-line @typescript-eslint/require-await,@typescript-eslint/no-unused-vars */
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		switch (url.pathname) {
			case env.WEBHOOK ?? DEFAULT_WEBHOOK_SUFFIX:
				// return await handleWebhook(request, env, ctx);
				break;
			case '/registerWebhook':
				return await registerWebhook(request, env, ctx);
			case '/unregisterWebhook':
				// return await unregisterWebhook(request, env, ctx);
				break;
		}
		return new Response('Hello World!', { status: 404 });
	},
};
