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
    public async Task<IActionResult> Shorten([FromBody] ShortenUrlRequest request, CancellationToken cancellationToken)
    {
        var shortCode = await _urlShorteningService.ShortenUrl(request.Url, cancellationToken);

        return Ok(new ShortenUrlResponse
        {
            ShortenedUrl = $"{Request.Scheme}://{Request.Host}/{shortCode}"
        });
    }
}