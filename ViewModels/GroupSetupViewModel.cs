using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AFBA.EPP.ViewModels
{
    public class GroupSetupViewModel
    {
        public long GrpId { get; set; }
        public string GrpNbr { get; set; }
        public string GrpNm { get; set; }
        public DateTime GrpEfftvDt { get; set; }
        public string GrpSitusSt { get; set; }
        public char? ActvFlg { get; set; }
        public int? OccClass { get; set; }
        public int GrpPymn { get; set; }

    }
}
