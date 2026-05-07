public class UrlRepository
{
    private readonly ILogger<UrlRepository> _logger;
    private readonly DbConnectionFactory _dbConnectionFactory;

    public UrlRepository(DbConnectionFactory dbConnectionFactory, ILogger<UrlRepository> logger)
    {
        _dbConnectionFactory = dbConnectionFactory;
        _logger = logger;
    }

    public async Task SaveUrlMappingAsync(string shortCode, string originalUrl, CancellationToken cancellationToken = default)
    {
        using var connection = _dbConnectionFactory.CreateConnection();
        connection.Open();

        var command = connection.CreateCommand();
        command.CommandText = "INSERT INTO url_mappings (short_code, original_url) VALUES (@short_code, @original_url)";

        var shortCodeParam = command.CreateParameter();
        shortCodeParam.ParameterName = "@short_code";
        shortCodeParam.Value = shortCode;
        command.Parameters.Add(shortCodeParam);

        var originalUrlParam = command.CreateParameter();
        originalUrlParam.ParameterName = "@original_url";
        originalUrlParam.Value = originalUrl;
        command.Parameters.Add(originalUrlParam);

        var result = await command.ExecuteNonQueryAsync(cancellationToken);
        if (result <= 0)
        {
            _logger.LogWarning("[SaveUrlMappingAsync] Failed to save URL mapping: {ShortCode} -> {OriginalUrl}", shortCode, originalUrl);
            return;
        }

        _logger.LogInformation("[SaveUrlMappingAsync] Saved URL mapping: {ShortCode} -> {OriginalUrl}", shortCode, originalUrl);
    }

    public async Task<string?> GetOriginalUrlAsync(string shortCode, CancellationToken cancellationToken = default)
    {
        using var connection = _dbConnectionFactory.CreateConnection();
        connection.Open();

        var command = connection.CreateCommand();
        command.CommandText = "SELECT original_url FROM url_mappings WHERE short_code = @short_code";

        var shortCodeParam = command.CreateParameter();
        shortCodeParam.ParameterName = "@short_code";
        shortCodeParam.Value = shortCode;
        command.Parameters.Add(shortCodeParam);

        var result = await command.ExecuteScalarAsync(cancellationToken);
        if (result == null)
        {
            _logger.LogWarning("[GetOriginalUrlAsync] No original URL found for short code: {ShortCode}", shortCode);
            return null;
        }

        _logger.LogInformation("[GetOriginalUrlAsync] Retrieved original URL for short code {ShortCode}: {OriginalUrl}", shortCode, result);
        return result as string;
    }
}