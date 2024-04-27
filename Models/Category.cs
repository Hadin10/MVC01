using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MVC01.Models
{
    public partial class Category
    {
        public Category()
        {
            Products = new HashSet<Product>();
        }

        public int CategoryId { get; set; }
        
        public string Name { get; set; }
        public bool IsDelete { get; set; }

        public virtual ICollection<Product> Products { get; set; }
    }
}
