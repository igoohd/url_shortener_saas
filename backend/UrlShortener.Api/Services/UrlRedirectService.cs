public class UrlRedirectService
{
    private readonly UrlRepository _urlRepository;

    public UrlRedirectService(UrlRepository urlRepository)
    {
        _urlRepository = urlRepository;
    }

    public async Task<string?> GetOriginalUrlAsync(string shortCode, CancellationToken cancellationToken = default)
    {
        return await _urlRepository.GetOriginalUrlAsync(shortCode, cancellationToken);
    }
}