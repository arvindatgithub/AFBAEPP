using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AFBA.EPP.ViewModels
{
    public class EppQueAtrrViewModel
    {
        public long AttrId { get; set; }
        public string DisplyAttrNm { get; set; }
        public string DbAttrNm { get; set; }
        public string GrpNbr { get; set; }
        public long? ProductId { get; set; }
        public long BulkId { get; set; }
        public long GrpprdctId { get; set; }
        public string Value { get; set; }
      

    }
}
