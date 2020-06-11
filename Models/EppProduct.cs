using System;
using System.Collections.Generic;

namespace AFBA.EPP.Models
{
    public partial class EppProduct
    {
        public EppProduct()
        {
            EppEnrollmentFact = new HashSet<EppEnrollmentFact>();
            EppGrpprdct = new HashSet<EppGrpprdct>();
            EppProductCodes = new HashSet<EppProductCodes>();
        }

        public long ProductId { get; set; }
        public string ProductNm { get; set; }
        public DateTime CrtdDt { get; set; }
        public string CrtdBy { get; set; }
        public DateTime? LstUpdtDt { get; set; }
        public string LstUpdtBy { get; set; }

        public virtual ICollection<EppEnrollmentFact> EppEnrollmentFact { get; set; }
        public virtual ICollection<EppGrpprdct> EppGrpprdct { get; set; }
        public virtual ICollection<EppProductCodes> EppProductCodes { get; set; }
    }
}
