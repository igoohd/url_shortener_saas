using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class UrlController : ControllerBase
{
    private readonly DbConnectionFactory _dbConnectionFactory;
    private readonly UrlShorteningService _urlShorteningService;

    public UrlController(DbConnectionFactory dbConnectionFactory, UrlShorteningService urlShorteningService)
    {
        _dbConnectionFactory = dbConnectionFactory;
        _urlShorteningService = urlShorteningService;
    }

    [HttpPost("shorten")]
    public async Task<IActionResult> Shorten([FromBody] ShortenUrlRequest request)
    {
        var shortCode = _urlShorteningService.GenerateShortCode();

        using var connection = _dbConnectionFactory.CreateConnection();
        connection.Open();

        return Ok("Shortened URL");
    }
}