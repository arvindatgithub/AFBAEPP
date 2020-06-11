using System;
using System.Collections.Generic;

namespace AFBA.EPP.Models
{
    public partial class EppDate
    {
        public EppDate()
        {
            EppEnrollmentFact = new HashSet<EppEnrollmentFact>();
        }

        public long DtId { get; set; }
        public DateTime? RudDt { get; set; }
        public string DayOfMonth { get; set; }
        public string DayName { get; set; }
        public string DayOfWeek { get; set; }
        public string DayOfWeekInMonth { get; set; }
        public string DayOfWeekInYear { get; set; }
        public string DayOfQuarter { get; set; }
        public string DayOfYear { get; set; }
        public string WeekOfMonth { get; set; }
        public string WeekOfQuarter { get; set; }
        public string WeekOfYear { get; set; }
        public string Month { get; set; }
        public string MonthName { get; set; }
        public string MonthOfQuarter { get; set; }
        public string Quarter { get; set; }
        public string QuarterName { get; set; }
        public string Year { get; set; }
        public string Mmyyyy { get; set; }
        public DateTime? FirstDayOfMonth { get; set; }
        public DateTime? LastDayOfMonth { get; set; }
        public DateTime? FirstDayOfQuarter { get; set; }
        public DateTime? LastDayOfQuarter { get; set; }
        public DateTime? FirstDayOfYear { get; set; }
        public DateTime? LastDayOfYear { get; set; }

        public virtual ICollection<EppEnrollmentFact> EppEnrollmentFact { get; set; }
    }
}
