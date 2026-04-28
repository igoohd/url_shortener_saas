using Npgsql;

public class UrlShorteningService
{
    private readonly UrlRepository _urlRepository;
    private const int MaxRetries = 3;
    private const int InitialDelayMs = 100;

    public UrlShorteningService(UrlRepository urlRepository)
    {
        _urlRepository = urlRepository;
    }

    public string GenerateShortCode()
    {
        const string base62Chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var shortCode = new char[6];
        for (int i = 0; i < shortCode.Length; i++)
        {
            shortCode[i] = base62Chars[Random.Shared.Next(base62Chars.Length)];
        }

        return new string(shortCode);
    }

    public async Task<string> ShortenUrl(string originalUrl, CancellationToken cancellationToken = default)
    {
        for (int attempt = 1; attempt <= MaxRetries; attempt++)
        {
            var shortCode = GenerateShortCode();
            try
            {
                await _urlRepository.SaveUrlMappingAsync(shortCode, originalUrl, cancellationToken);
                return shortCode;
            }
            catch (NpgsqlException) when (attempt < MaxRetries)
            {
                await Task.Delay(InitialDelayMs * (int)Math.Pow(2, attempt - 1), cancellationToken);
            }
        }

        throw new InvalidOperationException("Failed to generate a unique short code after max retries.");
    }
}