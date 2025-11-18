import { createShortUrl, getUrls, deleteUrl, UrlRequest, UrlResponse } from '../urlApi';

const globalAny: any = global;

describe('urlApi', () => {
    beforeEach(() => {
        globalAny.fetch = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('getUrls - success', async () => {
        const mockData: UrlResponse[] = [{ alias: 'a1', fullUrl: 'https://1', shortUrl: '/a1' }];
        globalAny.fetch.mockResolvedValue({
            ok: true,
            json: async () => mockData,
        });

        const res = await getUrls();
        expect(res).toEqual(mockData);
        expect(globalAny.fetch).toHaveBeenCalledWith('/api/urls');
    });

    test('createShortUrl - success', async () => {
        const req: UrlRequest = { fullUrl: 'https://example.com', customAlias: 'abc' };
        const mockRes: UrlResponse = { alias: 'abc', fullUrl: req.fullUrl, shortUrl: '/abc' };

        globalAny.fetch.mockResolvedValue({
            ok: true,
            json: async () => mockRes,
        });

        const res = await createShortUrl(req);
        expect(res).toEqual(mockRes);
        expect(globalAny.fetch).toHaveBeenCalledWith('/api/urls', expect.any(Object));
    });

    test('deleteUrl - success', async () => {
        globalAny.fetch.mockResolvedValue({ ok: true });
        await expect(deleteUrl('abc')).resolves.toBeUndefined();
        expect(globalAny.fetch).toHaveBeenCalledWith('/api/urls/abc', expect.any(Object));
    });

    test('getUrls - failure throws', async () => {
        globalAny.fetch.mockResolvedValue({ ok: false });
        await expect(getUrls()).rejects.toThrow('Failed to fetch URLs');
    });
});
