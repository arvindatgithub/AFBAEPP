using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AFBA.EPP.ViewModels
{
    public class VGL
    {
        public string grp_nmbr { get; set; }
        public DateTime effctv_dt { get; set; }
        public string grp_situs_state { get; set; }


        public string agnt_cd_1 { get; set; }
        public string agnt_nm { get; set; }
        public Int32 agnt_comm_split_1 { get; set; }
        public string agntsub_1 { get; set; }
        public string agnt_cd_2 { get; set; }
        public Int32 agnt_comm_split_2 { get; set; }
        public string agntsub_2 { get; set; }

        public string agnt_cd_3 { get; set; }
        public Int32 agnt_comm_split_3 { get; set; }
        public string agntsub_3 { get; set; }

        public string agnt_cd_4 { get; set; }
        public Int32 agnt_comm_split_4 { get; set; }
        public string agntsub_4 { get; set; }
    }
}
