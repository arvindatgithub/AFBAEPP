using System;
using System.Collections.Generic;

namespace AFBA.EPP.Models
{
    public partial class EppRoles
    {
        public EppRoles()
        {
            EppUserRoles = new HashSet<EppUserRoles>();
        }

        public string RoleCd { get; set; }
        public string RoleName { get; set; }
        public DateTime CrtdDt { get; set; }
        public string CrtdBy { get; set; }
        public DateTime? LstUpdtDt { get; set; }
        public string LstUpdtBy { get; set; }

        public virtual ICollection<EppUserRoles> EppUserRoles { get; set; }
    }
}
