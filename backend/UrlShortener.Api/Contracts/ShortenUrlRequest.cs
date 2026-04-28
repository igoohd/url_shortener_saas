using System.ComponentModel.DataAnnotations;

public class ShortenUrlRequest
{
        [Required]
        [Url]
        public required string Url { get; init; }
}