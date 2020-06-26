using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AFBA.EPP.ViewModels
{
    public class VOL_CI:CommonViewModel
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


        public string emp_ProductCode { get; set; }
        public string sp_ProductCode { get; set; }
        public string ch_ProductCode { get; set; }

        public string owner_smkr_no_smkr { get; set; }
        public string sp_smkr_no_smkr { get; set; }

        public string owner_smkr_no_smkr_action{ get; set; }
        public string sp_smkr_no_smkr_action { get; set; }

        public string emp_ProductCode_action { get; set; }
        public string sp_ProductCode_action { get; set; }
        public string ch_ProductCode_action { get; set; }


        public string effctv_dt_action { get; set; }
        public string grp_situs_state_action { get; set; }

        public string emp_gi_max_amt_action { get; set; }
        public string sp_gi_max_amt_action { get; set; }
        public string emp_qi_max_amt_action { get; set; }
        public string sp_qi_max_amt_action { get; set; }
        public string emp_max_amt_action { get; set; }
        public string sp_max_amt_action { get; set; }

      
    }
}
