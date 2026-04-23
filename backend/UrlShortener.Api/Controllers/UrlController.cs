using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class UrlController : ControllerBase
{
    private readonly DbConnectionFactory _dbConnectionFactory;

    public UrlController(DbConnectionFactory dbConnectionFactory)
    {
        _dbConnectionFactory = dbConnectionFactory;
    }

    [HttpPost("shorten")]
    public IActionResult Shorten([FromBody] string url)
    {
        return Ok("not implemented yet");
    }

    [HttpGet("test-db")]
    public IActionResult TestDb()
    {
        using var connection = _dbConnectionFactory.CreateConnection();
        connection.Open();
        return Ok("Database connection successful");
    }
}