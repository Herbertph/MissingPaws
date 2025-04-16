using Microsoft.AspNetCore.Mvc;

namespace MissingPaws.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
       [HttpPost("admin-login")]
public IActionResult AdminLogin([FromBody] string password)
{
    var adminPassword = Environment.GetEnvironmentVariable("ADMIN_PASSWORD");

    if (string.IsNullOrWhiteSpace(adminPassword))
        return StatusCode(500, "Senha de administrador não configurada no servidor.");

    if (password == adminPassword)
        return Ok();

    return Unauthorized();
}
    }
}
