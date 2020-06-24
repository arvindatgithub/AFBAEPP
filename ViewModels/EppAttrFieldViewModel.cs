using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AFBA.EPP.ViewModels
{
    public class EppAttrFieldViewModel
    {
        public long PrdctAttrbtId { get; set; }
        public string DbAttrNm { get; set; }
        public long AttrId { get; set; }
        public bool? RqdFlg { get; set; }
        public int? ClmnOrdr { get; set; }
        public long GrpprdctId { get; set; }
    }
}
