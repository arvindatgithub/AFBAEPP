using AFBA.EPP.Models;
using AFBA.EPP.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AFBA.EPP.Repositories.Interfaces
{
   public interface IEppBulkRefTblRepository: IRepository<EppBulkRefTbl>
    {
        IEnumerable<EppQueAtrrViewModel> GetEppQuestionAtrr(string groupNo, long productId);

    }


}
