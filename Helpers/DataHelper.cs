using AFBA.EPP.Models;
using AFBA.EPP.Repositories.Interfaces;
using AFBA.EPP.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AFBA.EPP.Helpers
{
    public static class DataHelper
    {

        public static PlanCodeViewModel UpdatePlanCode(PlanCodeViewModel planCodeViewModel, IUnitofWork _unitofWork)
        {
            var result= _unitofWork.eppProductCodesRepository.Find(x => x.ProductCode == planCodeViewModel.ProductCode && x.ProductId== planCodeViewModel.ProductId).Result.FirstOrDefault();
            if (result == null)
            {
                var data = new EppProductCodes
                {
                    ProdctCdId = Helper.GetRandomNumber(),
                    ProductCode = planCodeViewModel.ProductCode,
                    ProductId = planCodeViewModel.ProductId,
                    CrtdBy = ""
                };
            }
            else
            {
                planCodeViewModel.ProductId = result.ProductId;
            }
            return planCodeViewModel;
         }
    }
}
