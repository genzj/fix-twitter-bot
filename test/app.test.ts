import { unstable_dev } from "wrangler";
import type { UnstableDevWorker } from "wrangler";

describe("Worker", () => {
  let worker: UnstableDevWorker;

  beforeAll(async () => {
    worker = await unstable_dev("src/index.ts", {
      experimental: { disableExperimentalWarning: true },
    });
  });

  afterAll(async () => {
    await worker.stop();
  });

  it("should return Hello World", async () => {
    const resp = await worker.fetch();
    const text = await resp.text();
    expect(text).toMatchInlineSnapshot(`"Hello World!"`);
  });
});
