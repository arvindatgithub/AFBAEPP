using System;
using System.Collections.Generic;

namespace AFBA.EPP.Models
{
    public partial class HoldAttr
    {
        public string RcrdId { get; set; }
        public long? AttrId { get; set; }
        public string HoldattrId { get; set; }
        public DateTime? CreateDt { get; set; }
        public string CreateBy { get; set; }
        public string LstUpdtDt { get; set; }
        public string LstUpdtBy { get; set; }
    }
}
