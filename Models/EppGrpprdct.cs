using System;
using System.Collections.Generic;

namespace AFBA.EPP.Models
{
    public partial class EppGrpprdct
    {
        public EppGrpprdct()
        {
            EppBulkRefTbl = new HashSet<EppBulkRefTbl>();
            EppPrdctattrbt = new HashSet<EppPrdctattrbt>();
        }

        public long GrpprdctId { get; set; }
        public long? GrpId { get; set; }
        public long? ProductId { get; set; }
        public DateTime CrtdDt { get; set; }
        public string CrtdBy { get; set; }
        public DateTime? LstUpdtDt { get; set; }
        public string LstUpdtBy { get; set; }

        public virtual EppGrpmstr Grp { get; set; }
        public virtual EppProduct Product { get; set; }
        public virtual ICollection<EppBulkRefTbl> EppBulkRefTbl { get; set; }
        public virtual ICollection<EppPrdctattrbt> EppPrdctattrbt { get; set; }
    }
}
