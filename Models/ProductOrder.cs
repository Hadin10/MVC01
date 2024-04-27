using System;
using System.Collections.Generic;

namespace MVC01.Models
{
    public partial class ProductOrder
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public double ProductPrice { get; set; }

        public virtual Product Product { get; set; } = null!;
    }
}
