import { HTMLService } from "@/app/lib/HTMLService";

describe('HTMLService', () => {
  let htmlService: HTMLService;

  beforeAll(async () => {
    htmlService = HTMLService.getInstance();
  });

  it('should fetch html of a valid site successfully', async () => {
    const url = "https://example.com";
    const html = await htmlService.getHTML(url);
    
    expect(html).toBeDefined();
    expect(html.length).toBeGreaterThan(0);
  });

  it('should throw an error for an invalid URL', async () => {
    const url = "https://invalidurl.test";

    let message = "";
    try {
      await htmlService.getHTML(url);
    } catch (error) {
      message = (error as Error).message;
    }

    expect(message).toContain(`Failed to fetch: ${url}`);
  });
});