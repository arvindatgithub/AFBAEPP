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
        public string ProductId { get; set; }
        public string GrpprdctId { get; set; }
        public List<EppAttrFieldViewModel> EppPrdAttrFields { get; set; }
        public bool  isEdit { get; set; }
    }
}
