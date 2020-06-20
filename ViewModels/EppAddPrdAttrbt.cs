using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime;
using System.Threading.Tasks;

namespace AFBA.EPP.ViewModels
{
    public class EppAddPrdAttrbt
    {
        public string GrpNbr { get; set; }
        public string ProductNm { get; set; }
        public List<EppAttrFieldViewModel> EppPrdAttrFields { get; set; }


    }
}
