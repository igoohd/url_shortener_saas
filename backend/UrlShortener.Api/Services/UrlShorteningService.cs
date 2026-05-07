using Npgsql;

public class UrlShorteningService
{
    private readonly ILogger<UrlShorteningService> _logger;
    private readonly UrlRepository _urlRepository;
    private const int MaxRetries = 3;
    private const int InitialDelayMs = 100;
    private const int ShortCodeLength = 6;

    public UrlShorteningService(UrlRepository urlRepository, ILogger<UrlShorteningService> logger)
    {
        _urlRepository = urlRepository;
        _logger = logger;
    }

    public string GenerateShortCode()
    {
        const string base62Chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var shortCode = new char[ShortCodeLength];
        for (int i = 0; i < shortCode.Length; i++)
        {
            shortCode[i] = base62Chars[Random.Shared.Next(base62Chars.Length)];
        }

        var result = new string(shortCode);
        _logger.LogDebug("[GenerateShortCode] Generated short code: {ShortCode}", result);
        return result;
    }

    public async Task<string> ShortenUrl(string originalUrl, CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("[ShortenUrl] Shortening URL: {Url}", originalUrl);
        for (int attempt = 1; attempt <= MaxRetries; attempt++)
        {
            var shortCode = GenerateShortCode();
            try
            {
                await _urlRepository.SaveUrlMappingAsync(shortCode, originalUrl, cancellationToken);
                _logger.LogInformation("[ShortenUrl] Successfully shortened URL: {Url} to {ShortCode}", originalUrl, shortCode);
                return shortCode;
            }
            catch (NpgsqlException ex) when (attempt < MaxRetries && ex.IsTransient)
            {
                _logger.LogWarning(ex, "[ShortenUrl] Attempt {Attempt}/{MaxRetries} failed with transient error. Retrying...", attempt, MaxRetries);
                await Task.Delay(InitialDelayMs * (int)Math.Pow(2, attempt - 1), cancellationToken);
            }
        }

        _logger.LogError("[ShortenUrl] Failed to shorten URL: {Url} after {MaxRetries} attempts", originalUrl, MaxRetries);
        throw new InvalidOperationException("Failed to generate a unique short code after max retries.");
    }
}