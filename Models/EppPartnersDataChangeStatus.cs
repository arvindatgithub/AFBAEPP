using System;
using System.Collections.Generic;

namespace AFBA.EPP.Models
{
    public partial class EppPartnersDataChangeStatus
    {
        public long PartnersdatastatusId { get; set; }
        public long RcrdId { get; set; }
        public string ChangeType { get; set; }
        public DateTime CrtdDt { get; set; }
        public string CrtdBy { get; set; }
        public DateTime? LstUpdtDt { get; set; }
        public string LstUpdtBy { get; set; }

        public virtual EppPartnersData Rcrd { get; set; }
    }
}
