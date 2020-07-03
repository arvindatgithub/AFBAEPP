using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AFBA.EPP.ViewModels
{
    public class HI:ProductBase
    {
        public string effctv_dt { get; set; }
        public string grp_situs_state { get; set; }
         public string effctv_dt_action { get; set; }
        public string grp_situs_state_action { get; set; }

        public string sp_fname { get; set; }
        public string sp_dob { get; set; }
        public string sp_gndr { get; set; }


        public string rate_lvl { get; set; }
        public string rate_lvl_action { get; set; }
        public string ch_fname_01_action { get; set; }
        public string ch_dob_01_action { get; set; }
        public string ch_gndr_01_action { get; set; }

        public string sp_fname_action { get; set; }
        public string sp_dob_action { get; set; }
        public string sp_gndr_action { get; set; }
    }
}
