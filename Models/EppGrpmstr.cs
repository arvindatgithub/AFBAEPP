using System;
using System.Collections.Generic;

namespace AFBA.EPP.Models
{
    public partial class EppGrpmstr
    {
        public EppGrpmstr()
        {
            EppGrpprdct = new HashSet<EppGrpprdct>();
        }

        public long GrpId { get; set; }
        public string GrpNbr { get; set; }
        public string GrpNm { get; set; }
        public DateTime GrpEfftvDt { get; set; }
        public string GrpSitusSt { get; set; }
        public char? ActvFlg { get; set; }
        public long? OccClass { get; set; }
        public long GrpPymn { get; set; }
        public decimal? NewOpnEnrlmntPrd { get; set; }
        public char? PerpetualEnrlmntFlg { get; set; }
        public long EnrlmntPrtnrsId { get; set; }
        public DateTime CrtdDt { get; set; }
        public string CrtdBy { get; set; }
        public DateTime? LstUpdtDt { get; set; }
        public string LstUpdtBy { get; set; }

        public virtual EppEnrlmntPrtnrs EnrlmntPrtnrs { get; set; }
        public virtual EppGrppymntmd GrpPymnNavigation { get; set; }
        public virtual ICollection<EppGrpprdct> EppGrpprdct { get; set; }
    }
}
