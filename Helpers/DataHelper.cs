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
                planCodeViewModel.ProdctCdId = Helper.GetRandomNumber();
                var data = new EppProductCodes
                {
                    ProdctCdId = planCodeViewModel.ProdctCdId,
                    ProductCode = planCodeViewModel.ProductCode,
                    ProductId = planCodeViewModel.ProductId,
                    CrtdBy = ""
                };
                _unitofWork.eppProductCodesRepository.Add(data);
                
            }
            else
            {
                planCodeViewModel.ProductId = result.ProductId;
            }
            return planCodeViewModel;
         }

        public static  void UpdateAgent( List<EppAgentsViewModel> eppAgentsModels, IUnitofWork _unitofWork, long grpId)
        {
            foreach ( var eppAgent in eppAgentsModels)
            {
                decimal agntComsnSplt = 0;
                decimal.TryParse(eppAgent.AgntComsnSplt,out agntComsnSplt);

                var data = _unitofWork.eppAgentRepository.Find(x => x.AgentId == long.Parse(eppAgent.AgentId)).Result.FirstOrDefault();
                    if  (data!=null)
                    {
                         data.AgntNm = eppAgent.AgntNm;
                        data.AgntNbr = eppAgent.AgntNbr;
                        data.AgntSubCnt = eppAgent.AgntSubCnt;
                        data.GrpId = grpId;
                        data.AgntComsnSplt = agntComsnSplt;
                        data.AgentId = long.Parse(eppAgent.AgentId);
                        data.LstUpdtBy = "";
                        data.LstUpdtDt = DateTime.UtcNow;

                    _unitofWork.eppAgentRepository.Update(data);
                    }
                else
                {
                    var agentId = Helper.GetRandomNumber();
                    data.AgntNm = eppAgent.AgntNm;
                    data.AgntNbr = eppAgent.AgntNbr;
                    data.AgntSubCnt = eppAgent.AgntSubCnt;
                    data.GrpId = grpId;
                    data.AgntComsnSplt = agntComsnSplt;
                    data.CrtdBy = "";
                    data.LstUpdtDt = DateTime.UtcNow;
                   _unitofWork.eppAgentRepository.Add(data);
                }
               
                    

               
            }
        }
    }


    
}
