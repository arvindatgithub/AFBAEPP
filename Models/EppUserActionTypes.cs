using System;
using System.Collections.Generic;

namespace AFBA.EPP.Models
{
    public partial class EppUserActionTypes
    {
        public EppUserActionTypes()
        {
            EppUserRolesFunction = new HashSet<EppUserRolesFunction>();
        }

        public long ActionTypeId { get; set; }
        public string ActionName { get; set; }
        public DateTime CrtdDt { get; set; }
        public string CrtdBy { get; set; }
        public DateTime? LstUpdtDt { get; set; }
        public string LstUpdtBy { get; set; }

        public virtual ICollection<EppUserRolesFunction> EppUserRolesFunction { get; set; }
    }
}
