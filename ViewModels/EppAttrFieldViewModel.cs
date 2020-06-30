using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AFBA.EPP.ViewModels
{
    public class EppAttrFieldViewModel
    {
        public string PrdctAttrbtId { get; set; }
        public string DbAttrNm { get; set; }
        public string DisplyAttrNm { get; set; }
        public string AttrId { get; set; }
        public bool? RqdFlg { get; set; }
        public string? ClmnOrdr { get; set; }
        public string GrpprdctId { get; set; }
    }
}
