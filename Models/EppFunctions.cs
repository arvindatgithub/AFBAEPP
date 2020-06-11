using System;
using System.Collections.Generic;

namespace AFBA.EPP.Models
{
    public partial class EppFunctions
    {
        public EppFunctions()
        {
            EppUserRolesFunction = new HashSet<EppUserRolesFunction>();
        }

        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public DateTime CrtdDt { get; set; }
        public string CrtdBy { get; set; }
        public DateTime? LstUpdtDt { get; set; }
        public string LstUpdtBy { get; set; }

        public virtual ICollection<EppUserRolesFunction> EppUserRolesFunction { get; set; }
    }
}
