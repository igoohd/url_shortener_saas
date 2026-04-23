using Npgsql;

public class DbConnectionFactory
{
    private readonly string _connectionString;

    public DbConnectionFactory(IConfiguration configuration)
    {
        var host = configuration["DB_HOST"];
        var port = configuration["DB_PORT"];
        var user = configuration["DB_USER"];
        var password = configuration["DB_PASSWORD"];
        var database = configuration["DB_NAME"];

        _connectionString =
            $"Host={host};Port={port};Username={user};Password={password};Database={database}";
    }

    public NpgsqlConnection CreateConnection()
    {
        return new NpgsqlConnection(_connectionString);
    }
}