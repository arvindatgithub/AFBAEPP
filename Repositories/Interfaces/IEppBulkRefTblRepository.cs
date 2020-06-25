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
      public  IEnumerable<EppQueAtrrViewModel> GetEppQuestionAtrr(string groupNo, long productId);
      public IEnumerable<EppQueAtrrViewModel> GetGroupQuestionAtrr(string groupNo);

    }


}
