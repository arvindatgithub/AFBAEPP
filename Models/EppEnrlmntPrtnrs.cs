using System;
using System.Collections.Generic;

namespace AFBA.EPP.Models
{
    public partial class EppEnrlmntPrtnrs
    {
        public EppEnrlmntPrtnrs()
        {
            EppGrpmstr = new HashSet<EppGrpmstr>();
        }

        public long EnrlmntPrtnrsId { get; set; }
        public string EnrlmntPrtnrsNm { get; set; }
        public string EmlAddrss { get; set; }
        public DateTime CrtdDt { get; set; }
        public string CrtdBy { get; set; }
        public DateTime? LstUpdtDt { get; set; }
        public string LstUpdtBy { get; set; }

        public virtual ICollection<EppGrpmstr> EppGrpmstr { get; set; }
    }
}
