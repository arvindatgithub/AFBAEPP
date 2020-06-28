using System;
using System.Collections.Generic;

namespace AFBA.EPP.Models
{
    public partial class EppGrppymntmd
    {
        public EppGrppymntmd()
        {
            EppGrpmstr = new HashSet<EppGrpmstr>();
        }

        public long GrpPymnId { get; set; }
        public string GrpPymntMdCd { get; set; }
        public string GrpPymntMdNm { get; set; }
        public DateTime CrtdDt { get; set; }
        public string CrtdBy { get; set; }
        public DateTime? LstUpdtDt { get; set; }
        public string LstUpdtBy { get; set; }

        public virtual ICollection<EppGrpmstr> EppGrpmstr { get; set; }
    }
}
