public class UrlRedirectService
{
    private readonly UrlRepository _urlRepository;
    private readonly ILogger<UrlRedirectService> _logger;

    public UrlRedirectService(UrlRepository urlRepository, ILogger<UrlRedirectService> logger)
    {
        _urlRepository = urlRepository;
        _logger = logger;
    }

    public async Task<string?> GetOriginalUrlAsync(string shortCode, CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("[GetOriginalUrlAsync] Retrieving original URL for short code: {ShortCode}", shortCode);
        var result = await _urlRepository.GetOriginalUrlAsync(shortCode, cancellationToken);

        if (result == null)
            _logger.LogWarning("[GetOriginalUrlAsync] No original URL found for short code: {ShortCode}", shortCode);

        return result;
    }
}