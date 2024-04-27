using System.ComponentModel.DataAnnotations;

namespace MVC01.Models
{
    public class view_category
    {

        [Key] 
        public int CategoryID { get; set; }
        public string Name { get; set; }
        public bool IsDelete { get; set; }

    }
}
