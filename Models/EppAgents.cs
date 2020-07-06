using System;
using System.Collections.Generic;

namespace AFBA.EPP.Models
{
    public partial class EppAgents
    {
        public long AgentId { get; set; }
        public string AgntNbr { get; set; }
        public string AgntNm { get; set; }
        public string AgntSubCnt { get; set; }
        public decimal? AgntComsnSplt { get; set; }
        public long GrpId { get; set; }
        public DateTime CrtdDt { get; set; }
        public string CrtdBy { get; set; }
        public DateTime? LstUpdtDt { get; set; }
        public string LstUpdtBy { get; set; }

        public virtual EppGrpmstr Grp { get; set; }
    }
}
