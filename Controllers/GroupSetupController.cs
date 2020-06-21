using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AFBA.EPP.Helpers;
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
            if (grpprdct.Count != 0)   return BadRequest(" Group name or number already exist"); 

            if (! string.IsNullOrEmpty(groupSetupModel.EmlAddrss))
            {
                // get partner id 
                var enrlmntPrtnr=_unitofWork.eppEnrlmntPrtnrsRepository.GetEnrlmntPrtnrId(groupSetupModel.EmlAddrss);
                if (enrlmntPrtnr != null)
                {
                    groupSetupModel.EnrlmntPrtnrsId = enrlmntPrtnr.EnrlmntPrtnrsId;
                }
                else
                {
                    _unitofWork.eppEnrlmntPrtnrsRepository.Add(new EppEnrlmntPrtnrs { 
                          EnrlmntPrtnrsId= Helper.GetRandomNumber(),
                          CrtdBy="",
                          EmlAddrss= groupSetupModel.EmlAddrss,
                          EnrlmntPrtnrsNm= groupSetupModel.EnrlmntPrtnrsNm
                           
                    });
                }

            }
           
             var grpId = Helper.GetRandomNumber();
            var CrtdBy = "";
;            _unitofWork.GroupMasterRepository.Add(new EppGrpmstr
                    {
                         GrpNbr= groupSetupModel.GrpNbr, GrpNm= groupSetupModel.GrpNm,  ActvFlg='Y' , EnrlmntPrtnrsId= groupSetupModel.EnrlmntPrtnrsId, GrpEfftvDt= groupSetupModel.GrpEfftvDt,
                         GrpSitusSt= groupSetupModel.GrpSitusSt, GrpPymn= groupSetupModel.GrpPymn, OccClass= groupSetupModel.OccClass, GrpId= grpId, CrtdBy= CrtdBy

                    }
                
           );

            List<EppBulkRefTbl> bulkRefTbls = new List<EppBulkRefTbl>();

            if (groupSetupModel.isFPPGActive)
            {
                var prdid = Helper.GetProductIdbyName("FPPG", _unitofWork);
                var grpprdId = Helper.GetRandomNumber();
               _unitofWork.eppGrpprdctRepository.Add(new EppGrpprdct
                {
                    GrpprdctId= grpprdId,
                     GrpId= grpId,
                     ProductId= prdid,
                     CrtdBy= CrtdBy

               });
                // add bulkupdate 
                var bulkAttrs = Helper.GetProperties(groupSetupModel.FPPG);
                AddEppBulkRefTblData(bulkAttrs, bulkRefTbls, grpprdId);
                if (!string.IsNullOrEmpty(groupSetupModel.EmailAddress))
                {
                         var rndNo = Helper.GetRandomNumber();
                        _unitofWork.eppAcctMgrCntctsRepository.Add(new EppAcctMgrCntcts
                        {

                            AcctMgrCntctId = rndNo,
                             EmailAddress= groupSetupModel.EmailAddress,
                              AcctMgrNm= groupSetupModel.AcctMgrNm
                        });
                }

            }
            if (groupSetupModel.isACC_HIActive)
            {
                var prdid = Helper.GetProductIdbyName("ACC_HI", _unitofWork);
                var grpprdId = Helper.GetRandomNumber();
                _unitofWork.eppGrpprdctRepository.Add(new EppGrpprdct
                {
                    GrpprdctId = grpprdId,
                    GrpId = grpId,
                    ProductId = prdid,
                    CrtdBy = CrtdBy

                });
                var bulkAttrs = Helper.GetProperties(groupSetupModel.ACC_HI);
                AddEppBulkRefTblData(bulkAttrs, bulkRefTbls, grpprdId);

                if (!string.IsNullOrEmpty(groupSetupModel.EmailAddress))
                {
                    var rndNo = Helper.GetRandomNumber();
                    _unitofWork.eppAcctMgrCntctsRepository.Add(new EppAcctMgrCntcts
                    {

                        AcctMgrCntctId = rndNo,
                        EmailAddress = groupSetupModel.EmailAddress,
                        AcctMgrNm = groupSetupModel.AcctMgrNm
                    });
                }

            }
            if (groupSetupModel.isER_CIActive)
            {
                var prdid = Helper.GetProductIdbyName("ER_CI", _unitofWork);
                var grpprdId = Helper.GetRandomNumber();
                _unitofWork.eppGrpprdctRepository.Add(new EppGrpprdct
                {
                    GrpprdctId = grpprdId,
                    GrpId = grpId,
                    ProductId = prdid,
                    CrtdBy = CrtdBy

                });
                var bulkAttrs = Helper.GetProperties(groupSetupModel.ER_CI);
                AddEppBulkRefTblData(bulkAttrs, bulkRefTbls, grpprdId);

                if (!string.IsNullOrEmpty(groupSetupModel.EmailAddress))
                {
                    var rndNo = Helper.GetRandomNumber();
                    _unitofWork.eppAcctMgrCntctsRepository.Add(new EppAcctMgrCntcts
                    {

                        AcctMgrCntctId = rndNo,
                        EmailAddress = groupSetupModel.EmailAddress,
                        AcctMgrNm = groupSetupModel.AcctMgrNm
                    });
                }

            }
            if (groupSetupModel.isVOL_CIActive)
            {
                var prdid = Helper.GetProductIdbyName("VOL_CI", _unitofWork);
                var grpprdId = Helper.GetRandomNumber();
                _unitofWork.eppGrpprdctRepository.Add(new EppGrpprdct
                {
                    GrpprdctId = grpprdId,
                    GrpId = grpId,
                    ProductId = prdid,
                    CrtdBy = CrtdBy

                });
                var bulkAttrs = Helper.GetProperties(groupSetupModel.VOL_CI);
                AddEppBulkRefTblData(bulkAttrs, bulkRefTbls, grpprdId);

                if (!string.IsNullOrEmpty(groupSetupModel.EmailAddress))
                {
                    var rndNo = Helper.GetRandomNumber();
                    _unitofWork.eppAcctMgrCntctsRepository.Add(new EppAcctMgrCntcts
                    {

                        AcctMgrCntctId = rndNo,
                        EmailAddress = groupSetupModel.EmailAddress,
                        AcctMgrNm = groupSetupModel.AcctMgrNm
                    });
                }

            }
            if (groupSetupModel.isVGLActive)
            {
                var prdid = Helper.GetProductIdbyName("VGL", _unitofWork);
                var grpprdId = Helper.GetRandomNumber();
                _unitofWork.eppGrpprdctRepository.Add(new EppGrpprdct
                {
                    GrpprdctId = grpprdId,
                    GrpId = grpId,
                    ProductId = prdid,
                    CrtdBy = CrtdBy

                });
                var bulkAttrs = Helper.GetProperties(groupSetupModel.VGL);
                AddEppBulkRefTblData(bulkAttrs, bulkRefTbls, grpprdId);

                if (!string.IsNullOrEmpty(groupSetupModel.EmailAddress))
                {
                    var rndNo = Helper.GetRandomNumber();
                    _unitofWork.eppAcctMgrCntctsRepository.Add(new EppAcctMgrCntcts
                    {

                        AcctMgrCntctId = rndNo,
                        EmailAddress = groupSetupModel.EmailAddress,
                        AcctMgrNm = groupSetupModel.AcctMgrNm
                    });
                }

            }
            if (groupSetupModel.isBGLActive)
            {
                var prdid = Helper.GetProductIdbyName("BGL", _unitofWork);
                var grpprdId = Helper.GetRandomNumber();
                _unitofWork.eppGrpprdctRepository.Add(new EppGrpprdct
                {
                    GrpprdctId = grpprdId,
                    GrpId = grpId,
                    ProductId = prdid,
                    CrtdBy = CrtdBy

                });
                var bulkAttrs = Helper.GetProperties(groupSetupModel.BGL);
                AddEppBulkRefTblData(bulkAttrs, bulkRefTbls, grpprdId);

                if (!string.IsNullOrEmpty(groupSetupModel.EmailAddress))
                {
                    var rndNo = Helper.GetRandomNumber();
                    _unitofWork.eppAcctMgrCntctsRepository.Add(new EppAcctMgrCntcts
                    {

                        AcctMgrCntctId = rndNo,
                        EmailAddress = groupSetupModel.EmailAddress,
                        AcctMgrNm = groupSetupModel.AcctMgrNm
                    });
                }

            }
            if (groupSetupModel.isFPPIActive)
            {

                var prdid = Helper.GetProductIdbyName("FPPI", _unitofWork);
                var grpprdId = Helper.GetRandomNumber();
                _unitofWork.eppGrpprdctRepository.Add(new EppGrpprdct
                {
                    GrpprdctId = grpprdId,
                    GrpId = grpId,
                    ProductId = prdid,
                    CrtdBy = CrtdBy

                });

                var bulkAttrs = Helper.GetProperties(groupSetupModel.FPPI);
                AddEppBulkRefTblData(bulkAttrs, bulkRefTbls, grpprdId);

                if (!string.IsNullOrEmpty(groupSetupModel.EmailAddress))
                {
                    var rndNo = Helper.GetRandomNumber();
                    _unitofWork.eppAcctMgrCntctsRepository.Add(new EppAcctMgrCntcts
                    {

                        AcctMgrCntctId = rndNo,
                        EmailAddress = groupSetupModel.EmailAddress,
                        AcctMgrNm = groupSetupModel.AcctMgrNm
                    });
                }

            }
            
            _unitofWork.eppBulkRefTblRepository.AddRange(bulkRefTbls);


            var id = _unitofWork.Complete().Result;
            return Ok(id);
        }
     
        
        [NonAction]
        private void AddEppBulkRefTblData(List<ClsPropertyInfo> bulkAttrs, List<EppBulkRefTbl> bulkRefTbls, long grpPrdId)
        {
            foreach (var prop in bulkAttrs)
            {
                if (!prop.PropertyName.Contains("action"))
                {
                    var cs = (prop.PropertyName).Trim() + "_action";
                    var rdata = bulkAttrs.Where(x => x.PropertyName.Contains(cs)).FirstOrDefault();
                    
                    EppBulkRefTbl eppBulkRefTbl = new EppBulkRefTbl();
                    if (rdata != null)
                    {
                        eppBulkRefTbl.ActionId = long.Parse(rdata.PropertyValue);
                    }
                    var eppAttribute = _unitofWork.eppAttributeRepository.GetAttrId(prop.PropertyName);
                    if (eppAttribute != null)
                    {
                        eppBulkRefTbl.GrpprdctId = grpPrdId;
                        eppBulkRefTbl.AttrId = eppAttribute.AttrId;
                        eppBulkRefTbl.Value = prop.PropertyValue;
                        eppBulkRefTbl.CrtdBy = "";

                    }
                    bulkRefTbls.Add(eppBulkRefTbl);


                }
              
            }

        }



      
    }
}
