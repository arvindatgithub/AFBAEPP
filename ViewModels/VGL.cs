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

        public string emp_gi_max_amt { get; set; }
        public string sp_gi_max_amt { get; set; }
        //public string ch_gi_max_amt { get; set; }



        public string emp_qi_max_amt { get; set; }
        public string sp_qi_max_amt { get; set; }
        //public string ch_qi_max_amt { get; set; }

        public string emp_max_amt { get; set; }
        public string sp_max_amt { get; set; }
        //public string ch_max_amt { get; set; }




        public string effctv_dt_action { get; set; }
        public string grp_situs_state_action { get; set; }

        public string emp_gi_max_amt_action { get; set; }
        public string sp_gi_max_amt_action { get; set; }
        public string emp_qi_max_amt_action { get; set; }
        public string sp_qi_max_amt_action { get; set; }
        public string emp_max_amt_action { get; set; }
        public string sp_max_amt_action { get; set; }


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
