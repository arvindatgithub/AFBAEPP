using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AFBA.EPP.ViewModels
{
    public class EppTemplateViewModel
    {
        public bool isEdit { get; set; }
        public List<EppAttrFieldViewModel> AvailableList { get; set; }
        public List<EppAttrFieldViewModel> SelectedList { get; set; }
    }
}
