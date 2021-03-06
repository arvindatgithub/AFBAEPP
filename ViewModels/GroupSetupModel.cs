﻿using Microsoft.EntityFrameworkCore.Metadata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AFBA.EPP.ViewModels
{
    public class GroupSetupModel
    {
        public string GrpId { get; set; }
        public string GrpNbr { get; set; }
        public string GrpNm { get; set; }
        public DateTime GrpEfftvDt { get; set; }
        public string GrpSitusSt { get; set; }
        public char? ActvFlg { get; set; }
        public long? OccClass { get; set; }
        public long GrpPymn { get; set; }
        public string EnrlmntPrtnrsId { get; set; }
        public string EnrlmntPrtnrsNm { get; set; }
        public string EmlAddrss { get; set; }
        public  List<EppAgentsViewModel>  GrpAgents{ get; set; }
        public string AcctMgrNm { get; set; }
        public string AcctMgrEmailAddrs { get; set; }
        //public string EmailAddress { get; set; }

        public string user_token { get; set; }
        public string case_token { get; set; }
        //public string AcctMgrNm { get; set; }
        //public long AcctMgrCntctId { get; set; }
        public bool isFPPGActive { get; set; }
        public bool isHIActive { get; set; }
        public HI HI { get; set; }
        public FPPG FPPG { get; set; }
        
        public bool isACC_HIActive { get; set; }
        public ACC_HI ACC_HI { get; set; }
        public bool isER_CIActive { get; set; }
        public ER_CI ER_CI { get; set; }
        public bool isVOL_CIActive { get; set; }
        public VOL_CI VOL_CI { get; set; }
        public bool isVGLActive { get; set; }
        public VGL VGL { get; set; }
        public bool isBGLActive { get; set; }
        public BGL BGL { get; set; }
        public bool isFPPIActive { get; set; }
        public FPPI FPPI { get; set; }





    }
}
