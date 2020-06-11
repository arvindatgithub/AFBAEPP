using System;
using System.Collections.Generic;

namespace AFBA.EPP.Models
{
    public partial class EppErrorDtl
    {
        public long ErrorDtlId { get; set; }
        public string ErrorDtl { get; set; }
        public long RcrdId { get; set; }
        public long AttrId { get; set; }
        public long ErrmsgId { get; set; }
        public DateTime CrtdDt { get; set; }
        public string CrtdBy { get; set; }
        public DateTime? LstUpdtDt { get; set; }
        public string LstUpdtBy { get; set; }

        public virtual EppAttribute Attr { get; set; }
        public virtual EppErrorMessage Errmsg { get; set; }
        public virtual EppPartnersDataErr Rcrd { get; set; }
    }
}
