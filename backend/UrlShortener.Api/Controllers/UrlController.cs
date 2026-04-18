using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class UrlController : ControllerBase
{
    [HttpPost("shorten")]
    public IActionResult Shorten([FromBody] string url)
    {
        return Ok("not implemented yet");
    }
}