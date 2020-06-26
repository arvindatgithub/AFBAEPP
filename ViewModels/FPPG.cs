﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AFBA.EPP.ViewModels
{
    public class FPPG: CommonViewModel
    {

        public string grp_nmbr { get; set; }
        public DateTime effctv_dt { get; set; }
        
        public string grp_situs_state { get; set; }
        
        public string emp_gi_max_amt { get; set; }
        public string sp_gi_max_amt { get; set; }


        //public string ch_gi_max_amt { get; set; }



        public string emp_ProductCode { get; set; }
        public string sp_ProductCode { get; set; }
        public string ch_ProductCode { get; set; }

        public string emp_waiver_of_prem { get; set; }
        public string sp_waiver_of_prem { get; set; }

        public string emp_quality_of_life { get; set; }
        public string sp_quality_of_life { get; set; }

        public string emp_waiver_of_prem_action { get; set; }
        public string sp_waiver_of_prem_action { get; set; }

        public string emp_quality_of_life_action { get; set; }
        public string sp_quality_of_life_action { get; set; }

        public string emp_ProductCode_action { get; set; }
        public string sp_ProductCode_action { get; set; }
        public string ch_ProductCode_action { get; set; }

        public string emp_qi_max_amt { get; set; }
        public string sp_qi_max_amt { get; set; }
        //public string ch_qi_max_amt { get; set; }

        public string emp_max_amt { get; set; }
        public string sp_max_amt { get; set; }
        //public string  ch_max_amt { get; set; }


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
