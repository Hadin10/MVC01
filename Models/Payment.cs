using System;
using System.Collections.Generic;

namespace MVC01.Models
{
    public partial class Payment
    {
        public int PaymentId { get; set; }
        public int OrderId { get; set; }
        public decimal Amount { get; set; }

        public virtual Order Order { get; set; } = null!;
    }
}
