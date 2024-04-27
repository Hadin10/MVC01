using Microsoft.AspNetCore.Mvc;

namespace MVC01.Areas.Admin.Controllers
{
    [Area("admin")]
    [Route("admin/login")]
    [Route("admin")]
    public class AdminLoginController : Controller
    {
        [Route("")]
        [Route("index")]

        public IActionResult Index()
        {
            return View();
        }
    }
}
