using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AFBA.EPP.ViewModels
{
    public class BGL: CommonViewModel
    {

        public string grp_nmbr { get; set; }
        public DateTime effctv_dt { get; set; }
        public string grp_situs_state { get; set; }
        public string emp_face_amt_mon_bnft { get; set; }

        public string effctv_dt_action { get; set; }
        public string grp_situs_state_action { get; set; }
        public string emp_face_amt_mon_bnft_action { get; set; }

              
    }
}
