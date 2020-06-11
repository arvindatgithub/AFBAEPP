using System;
using System.Collections.Generic;

namespace AFBA.EPP.Models
{
    public partial class EppEnrollmentFact
    {
        public long EnrollmentFactId { get; set; }
        public decimal? NbrEnrollmentsRcvd { get; set; }
        public decimal? SuccessfulNumberOfEnrollment { get; set; }
        public decimal? FailedNumberOfEnrollment { get; set; }
        public decimal? DuplicateEnrollment { get; set; }
        public long ProductId { get; set; }
        public long DtId { get; set; }

        public virtual EppDate Dt { get; set; }
        public virtual EppProduct Product { get; set; }
    }
}
