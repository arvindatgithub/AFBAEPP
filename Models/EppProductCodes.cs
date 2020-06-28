using System;
using System.Collections.Generic;

namespace AFBA.EPP.Models
{
    public partial class EppProductCodes
    {
        public long ProdctCdId { get; set; }
        public string ProductCode { get; set; }
        public long ProductId { get; set; }
        public string Optn { get; set; }
        public string Description { get; set; }
        public DateTime CrtdDt { get; set; }
        public string CrtdBy { get; set; }
        public DateTime? LstUpdtDt { get; set; }
        public string LstUpdtBy { get; set; }

        public virtual EppProduct Product { get; set; }
    }
}
