using System;
using System.Collections.Generic;

namespace AFBA.EPP.Models
{
    public partial class EppUsers
    {
        public EppUsers()
        {
            EppUserRoles = new HashSet<EppUserRoles>();
        }

        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string LoginId { get; set; }
        public DateTime CrtdDt { get; set; }
        public string CrtdBy { get; set; }
        public DateTime? LstUpdtDt { get; set; }
        public string LstUpdtBy { get; set; }

        public virtual ICollection<EppUserRoles> EppUserRoles { get; set; }
    }
}
