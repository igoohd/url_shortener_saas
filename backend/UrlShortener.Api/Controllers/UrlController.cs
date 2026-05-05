using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class UrlController : ControllerBase
{
    private readonly UrlShorteningService _urlShorteningService;
    private readonly UrlRedirectService _urlRedirectService;

    public UrlController(UrlShorteningService urlShorteningService, UrlRedirectService urlRedirectService)
    {
        _urlShorteningService = urlShorteningService;
        _urlRedirectService = urlRedirectService;
    }

    [HttpPost("shorten")]
    public async Task<IActionResult> Shorten([FromBody] ShortenUrlRequest request, CancellationToken cancellationToken)
    {
        var shortCode = await _urlShorteningService.ShortenUrl(request.Url, cancellationToken);
        var shortenedUrl = $"{Request.Scheme}://{Request.Host}/{shortCode}";

        return Created(shortenedUrl, new ShortenUrlResponse
        {
            ShortenedUrl = shortenedUrl,
            ShortCode = shortCode
        });
    }

    [HttpGet("{shortCode}")]
    public async Task<IActionResult> RedirectToOriginalUrl(string shortCode, CancellationToken cancellationToken)
    {
        var originalUrl = await _urlRedirectService.GetOriginalUrlAsync(shortCode, cancellationToken);
        if (originalUrl == null)
        {
            return NotFound();
        }

        return Redirect(originalUrl);
    }
}