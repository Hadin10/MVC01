using System;
using System.Collections.Generic;

namespace MVC01.Models
{
    public partial class Order
    {
        public Order()
        {
            Payments = new HashSet<Payment>();
        }

        public int OrderId { get; set; }
        public int CustomerId { get; set; }
        public int OrderNumber { get; set; }

        public virtual Customer Customer { get; set; } = null!;
        public virtual ICollection<Payment> Payments { get; set; }
    }
}
