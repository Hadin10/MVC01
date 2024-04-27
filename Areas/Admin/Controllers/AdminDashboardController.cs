using Microsoft.AspNetCore.Mvc;

namespace MVC01.Areas.Admin.Controllers
{
    [Area("Admin")]
    
    public class AdminDashboardController : Controller
    {
        [Route("admin/dash")]
        public IActionResult Index()
        {
            return View();
        }

        [Route("admin/pages/tables/Data")]
        public IActionResult Data()
        {
            return View();
        }
    }
}
