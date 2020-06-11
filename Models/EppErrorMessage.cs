using System;
using System.Collections.Generic;

namespace AFBA.EPP.Models
{
    public partial class EppErrorMessage
    {
        public EppErrorMessage()
        {
            EppErrorDtl = new HashSet<EppErrorDtl>();
        }

        public long ErrmsgId { get; set; }
        public string ErrmsgNm { get; set; }
        public DateTime CrtdDt { get; set; }
        public string CrtdBy { get; set; }
        public DateTime? LstUpdtDt { get; set; }
        public string LstUpdtBy { get; set; }

        public virtual ICollection<EppErrorDtl> EppErrorDtl { get; set; }
    }
}
