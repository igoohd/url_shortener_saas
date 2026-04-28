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
        command.CommandText = "INSERT INTO UrlMappings (ShortCode, OriginalUrl) VALUES (@shortCode, @originalUrl)";

        var shortCodeParam = command.CreateParameter();
        shortCodeParam.ParameterName = "@shortCode";
        shortCodeParam.Value = shortCode;
        command.Parameters.Add(shortCodeParam);

        var originalUrlParam = command.CreateParameter();
        originalUrlParam.ParameterName = "@originalUrl";
        originalUrlParam.Value = originalUrl;
        command.Parameters.Add(originalUrlParam);

        await command.ExecuteNonQueryAsync(cancellationToken);
    }
}