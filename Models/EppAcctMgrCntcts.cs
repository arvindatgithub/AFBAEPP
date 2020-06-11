using System;
using System.Collections.Generic;

namespace AFBA.EPP.Models
{
    public partial class EppAcctMgrCntcts
    {
        public long AcctMgrCntctId { get; set; }
        public string EmailAddress { get; set; }
        public string AcctMgrNm { get; set; }
        public DateTime CrdtDt { get; set; }
        public string CrdtBy { get; set; }
        public DateTime? LstUpdtDt { get; set; }
        public string LstUpdtBy { get; set; }
        public long GrpprdctId { get; set; }

        public virtual EppGrpprdct Grpprdct { get; set; }
    }
}
