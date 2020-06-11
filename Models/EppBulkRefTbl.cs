using System;
using System.Collections.Generic;

namespace AFBA.EPP.Models
{
    public partial class EppBulkRefTbl
    {
        public long BulkId { get; set; }
        public long GrpprdctId { get; set; }
        public string Value { get; set; }
        public long AttrId { get; set; }
        public long ActionId { get; set; }
        public DateTime CrtdDt { get; set; }
        public string CrtdBy { get; set; }
        public DateTime? LstUpdtDt { get; set; }
        public string LstUpdtBy { get; set; }

        public virtual EppAction Action { get; set; }
        public virtual EppAttribute Attr { get; set; }
        public virtual EppGrpprdct Grpprdct { get; set; }
    }
}
