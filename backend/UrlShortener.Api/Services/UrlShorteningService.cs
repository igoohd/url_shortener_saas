public class UrlShorteningService
{
    public object GenerateShortCode()
    {
        var base62Chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var shortCode = new char[6];
        for (int i = 0; i < shortCode.Length; i++)
        {
            shortCode[i] = base62Chars[Random.Shared.Next(base62Chars.Length)];
        }
        return new string(shortCode);
    }
}