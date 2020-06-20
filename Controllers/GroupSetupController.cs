using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AFBA.EPP.Models;
using AFBA.EPP.Repositories.Interfaces;
using AFBA.EPP.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace AFBA.EPP.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class GroupSetupController : ControllerBase
    {
        IUnitofWork _unitofWork;
        private readonly ILogger<GroupSetupController> _logger;
        public GroupSetupController(ILogger<GroupSetupController> logger, IUnitofWork unitofWork)
        {
            _logger = logger;
            _unitofWork = unitofWork;
        }

        [Route("[action]")]
        [HttpGet]
        public IEnumerable<GroupSearchViewModel> GetGroupsData()
        {
            return _unitofWork.GroupMasterRepository.GetAll().Result.Select(d => new GroupSearchViewModel
            {
                GrpId= d.GrpId,
                GrpNbr=d.GrpNbr ,
                GrpNm= d.GrpNm
            }).ToList();
        }

        [Route("[action]")]
        [HttpPost]
        public IActionResult EppCreateGrpSetup(GroupSetupModel  groupSetupModel)
        {

            var grpprdct = _unitofWork.GroupMasterRepository.Find(x => x.GrpNbr == groupSetupModel.GrpNbr || x.GrpNm== groupSetupModel.GrpNm).Result;
            if (grpprdct != null)   return BadRequest(" Group name or number already exist"); 

            if (! string.IsNullOrEmpty(groupSetupModel.EmlAddrss))
            {
                // get partner id 
                var enrlmntPrtnr=_unitofWork.eppEnrlmntPrtnrsRepository.GetEnrlmntPrtnrId(groupSetupModel.EmlAddrss);
                if (enrlmntPrtnr != null)
                {
                    groupSetupModel.EnrlmntPrtnrsId = enrlmntPrtnr.EnrlmntPrtnrsId;
                }

            }
            if (!string.IsNullOrEmpty(groupSetupModel.EmailAddress))
            {
                var eppAcctMgr = _unitofWork.eppAcctMgrCntctsRepository.GetEppAcctMgrId(groupSetupModel.EmailAddress);
                if (eppAcctMgr != null)
                {
                    groupSetupModel.AcctMgrCntctId = eppAcctMgr.AcctMgrCntctId;
                }
            }
            _unitofWork.GroupMasterRepository.Add(new EppGrpmstr
                    {
                         GrpNbr= groupSetupModel.GrpNbr, GrpNm= groupSetupModel.GrpNm,  ActvFlg='Y' , EnrlmntPrtnrsId= groupSetupModel.EnrlmntPrtnrsId, GrpEfftvDt= groupSetupModel.GrpEfftvDt,
                            GrpSitusSt= groupSetupModel.GrpSitusSt, GrpPymn= groupSetupModel.GrpPymn, OccClass= groupSetupModel.OccClass

            }
                
                );

            var id = _unitofWork.Complete();
            return Ok(id);
        }

    }
}
