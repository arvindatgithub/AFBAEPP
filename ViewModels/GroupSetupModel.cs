using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AFBA.EPP.ViewModels
{
    public class GroupSetupModel
    {
        public long GrpId { get; set; }
        public string GrpNbr { get; set; }
        public string GrpNm { get; set; }
        public DateTime GrpEfftvDt { get; set; }
        public string GrpSitusSt { get; set; }
        public char? ActvFlg { get; set; }
        public int? OccClass { get; set; }
        public int GrpPymn { get; set; }
        public long EnrlmntPrtnrsId { get; set; }
        public string EnrlmntPrtnrsNm { get; set; }
        public string EmlAddrss { get; set; }
        public string EmailAddress { get; set; }
        public string AcctMgrNm { get; set; }
        public long AcctMgrCntctId { get; set; }
        public FPPG FPPG { get; set; }
        public ACC_HI ACC_HI { get; set; }
       

    }
}
