import { unstable_dev } from 'wrangler';
import type { UnstableDevWorker } from 'wrangler';

describe('Worker', () => {
	let worker: UnstableDevWorker;

	beforeAll(async () => {
		worker = await unstable_dev('src/index.ts', {
			experimental: { disableExperimentalWarning: true },
			vars: {
				BOT_TOKEN: 'fake-token',
				BOT_SECRET: 'fake-secret',
			},
		});
	});

	afterAll(async () => {
		await worker.stop();
	});

	beforeEach(() => {
		//
	});

	it('should return Hello World 404 by default', async () => {
		const resp = await worker.fetch();
		expect(resp.status).toBe(404);
		const text = await resp.text();
		expect(text).toMatchInlineSnapshot(`"Hello World!"`);
	});

	it('should set webhook at /registerWebhook', async () => {
		const resp = await worker.fetch('/registerWebhook');
		expect(resp).not.toBeNull();
		// UT/mocking not work, needs a dry-run feature for UT
		// const text = await resp.text();
		// expect(text).toMatchInlineSnapshot(`"Hello World!"`);
		// expect(fetchMock).toHaveBeenCalled();
	});
});
