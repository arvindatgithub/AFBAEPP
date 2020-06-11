using System;
using System.Collections.Generic;

namespace AFBA.EPP.Models
{
    public partial class EppAction
    {
        public EppAction()
        {
            EppBulkRefTbl = new HashSet<EppBulkRefTbl>();
        }

        public long ActionId { get; set; }
        public string Name { get; set; }
        public DateTime CrtdDt { get; set; }
        public string CrtdBy { get; set; }
        public DateTime? LstUpdtDt { get; set; }
        public string LstUpdtBy { get; set; }

        public virtual ICollection<EppBulkRefTbl> EppBulkRefTbl { get; set; }
    }
}
