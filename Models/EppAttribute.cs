using System;
using System.Collections.Generic;

namespace AFBA.EPP.Models
{
    public partial class EppAttribute
    {
        public EppAttribute()
        {
            EppBulkRefTbl = new HashSet<EppBulkRefTbl>();
            EppErrorDtl = new HashSet<EppErrorDtl>();
            EppPrdctattrbt = new HashSet<EppPrdctattrbt>();
        }

        public long AttrId { get; set; }
        public string FileAttrNm { get; set; }
        public string DisplyAttrNm { get; set; }
        public string DbAttrNm { get; set; }
        public char IsVisibleForTmlt { get; set; }
        public char IsQstnAttrbt { get; set; }
        public DateTime CrtdDt { get; set; }
        public string CrtdBy { get; set; }
        public DateTime? LstUpdtDt { get; set; }
        public string LstUpdtBy { get; set; }

        public virtual ICollection<EppBulkRefTbl> EppBulkRefTbl { get; set; }
        public virtual ICollection<EppErrorDtl> EppErrorDtl { get; set; }
        public virtual ICollection<EppPrdctattrbt> EppPrdctattrbt { get; set; }
    }
}
