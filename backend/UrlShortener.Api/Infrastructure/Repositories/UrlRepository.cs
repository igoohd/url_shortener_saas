public class UrlRepository
{
    private readonly DbConnectionFactory _dbConnectionFactory;

    public UrlRepository(DbConnectionFactory dbConnectionFactory)
    {
        _dbConnectionFactory = dbConnectionFactory;
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

        await command.ExecuteNonQueryAsync(cancellationToken);
    }
}