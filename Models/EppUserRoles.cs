using System;
using System.Collections.Generic;

namespace AFBA.EPP.Models
{
    public partial class EppUserRoles
    {
        public EppUserRoles()
        {
            EppUserRolesFunction = new HashSet<EppUserRolesFunction>();
        }

        public long UserRoleId { get; set; }
        public int UserId { get; set; }
        public string RoleCd { get; set; }
        public DateTime CrtdDt { get; set; }
        public string CrtdBy { get; set; }
        public DateTime? LstUpdtDt { get; set; }
        public string LstUpdtBy { get; set; }

        public virtual EppRoles RoleCdNavigation { get; set; }
        public virtual EppUsers User { get; set; }
        public virtual ICollection<EppUserRolesFunction> EppUserRolesFunction { get; set; }
    }
}
