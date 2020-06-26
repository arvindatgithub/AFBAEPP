using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AFBA.EPP.ViewModels
{
    public class EppQueAtrrViewModel
    {
        public string ProductName { get; set; }
        public long? ProductId { get; set; }
        public List<BulkTableData> BulkTableData { get; set; }

    }

   public class BulkTableData
    {
            public long AttrId { get; set; }
            public string DisplyAttrNm { get; set; }
            public string DbAttrNm { get; set; }
            public long BulkId { get; set; }
            public long GrpprdctId { get; set; }
            public string Value { get; set; }
        }



    }

