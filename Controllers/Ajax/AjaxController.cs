using ClosedXML.Excel;
using DocumentFormat.OpenXml.Office2010.Excel;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MVC01.Models;

namespace MVC01.Controllers.Ajax
{
    public class AjaxController : Controller
    {
        /// <summary>
        /// ////////////////////////////////////////////////////              read data ///////////////////////////////////////////////////
        /// </summary>
        private readonly MyDbContext context;

        public AjaxController(MyDbContext context)
        {
            this.context = context;
        }
        public IActionResult Index()
        {
            return View();
        }

        public JsonResult CategoryList()
        {
            var data = context.procedure_category_fn().ToList();
            //var data = context.procedure_category_fn().Where(x => x.IsDelete == false).ToList();
            return new JsonResult(data);
        }

        ///////////////////////////////////////////////////////             Excel Download                         ///////////////////////////////////////////////////////////////
        ///

        //[Route("Ajax/Excel_File")]

        //public IActionResult Excel_File()
        //{

        //    using (var workbook = new XLWorkbook())
        //    {
        //        var worksheet = workbook.AddWorksheet("Sample Sheet");
        //        var cuurentRow = 1;
        //        worksheet.Cell(cuurentRow, 1).Value = "ID";
        //        worksheet.Cell(cuurentRow, 2).Value = "Name";

        //        var data = CategoryList();
        //        Console.Write(data);
        //        //foreach (var item in data)
        //        //{

        //        //}

        //    }



        //    //workbook.SaveAs("HelloWorld.xlsx");
        //    //return new JsonResult(worksheet);
        //    return View(Index);
        //}


        //////////////////////////////////////////////////////////                   Create Category           ///////////////////////////////////////////////////////////
        ///


        [HttpPost]
        public JsonResult AddCategory(Category category) 
        {
            if (ModelState.IsValid)
            {
                var cat = new Category()
                {
                    Name = category.Name,
                    IsDelete = false,
                };
                context.Categories.Add(cat);
                context.SaveChanges();
                return new JsonResult(new {result= true,message= "Data is saved" });
            }
            return new JsonResult(new { result = false, message = "Please Enter Category name" });
            
        }

        //////////////////////////////////////////////////////////                   Delete Category           ///////////////////////////////////////////////////////////
        ///
        public JsonResult DeleteCategory(int id)
        {
            var data = context.Categories.Where(e => e.CategoryId == id).SingleOrDefault();
            if(data != null)
            {
                data.IsDelete = true;
                context.Categories.Update(data);
                context.SaveChanges();
                return new JsonResult("Data is Deleted");
            }
            else
            {
                return new JsonResult("Data Not Deleted");
            }
        }


        //////////////////////////////////////////////////////////                   Edit Category           ///////////////////////////////////////////////////////////
        ///
        
        public JsonResult EditCategory(int id)
        {
            var data = context.Categories.Where(e => e.CategoryId == id).SingleOrDefault();
            return new JsonResult(data);
        }

        [HttpPost]
        public JsonResult UpdateCategory(Category category)
        {
            
            context.Categories.Update(category);
            context.SaveChanges();
            return new JsonResult("Record Updated!");
        }

    }
}
