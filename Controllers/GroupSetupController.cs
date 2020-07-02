using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Security.Cryptography.X509Certificates;
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
        string CrtdBy = "";
        DateTime CreatedDate = DateTime.UtcNow;
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
        [HttpPut]
        public IActionResult EditEppGrpSetup(GroupSetupModel groupSetupModel)
        {
           var grpMstdata= _unitofWork.GroupMasterRepository.Find(x => x.GrpId == groupSetupModel.GrpId).Result.FirstOrDefault();
            if (grpMstdata!=null) return BadRequest("Incorrect group id");

            if (!string.IsNullOrEmpty(groupSetupModel.EmlAddrss))
            {
                // get partner id 
                var enrlmntPrtnr = _unitofWork.eppEnrlmntPrtnrsRepository.GetEnrlmntPrtnrId(groupSetupModel.EmlAddrss);
                if (enrlmntPrtnr != null)
                {
                    groupSetupModel.EnrlmntPrtnrsId = enrlmntPrtnr.EnrlmntPrtnrsId;
                }
                else
                {
                    _unitofWork.eppEnrlmntPrtnrsRepository.Add(new EppEnrlmntPrtnrs
                    {
                        EnrlmntPrtnrsId = Helper.GetRandomNumber(),
                        CrtdBy = "",
                        EmlAddrss = groupSetupModel.EmlAddrss,
                        EnrlmntPrtnrsNm = groupSetupModel.EnrlmntPrtnrsNm

                    });
                }

            }
               
            grpMstdata.GrpNbr = groupSetupModel.GrpNbr;
            grpMstdata.GrpNm = groupSetupModel.GrpNm;
            grpMstdata.ActvFlg = groupSetupModel.ActvFlg;
            grpMstdata.EnrlmntPrtnrsId = groupSetupModel.EnrlmntPrtnrsId;
            grpMstdata.AcctMgrNm = groupSetupModel.AcctMgrNm;
            grpMstdata.AcctMgrEmailAddrs = groupSetupModel.AcctMgrEmailAddrs;
            grpMstdata.GrpEfftvDt = groupSetupModel.GrpEfftvDt;
            grpMstdata.GrpSitusSt = groupSetupModel.GrpSitusSt;

            grpMstdata.GrpPymnId = groupSetupModel.GrpPymn;
            grpMstdata.OccClass = groupSetupModel.OccClass;
            grpMstdata.CrtdBy = CrtdBy;
            // update group Master

            _unitofWork.GroupMasterRepository.Update(grpMstdata);

            DataHelper.UpdateAgent(groupSetupModel.GrpAgents, _unitofWork, groupSetupModel.GrpId);

            // add  update enrollment partner
            if (!string.IsNullOrEmpty(groupSetupModel.EmlAddrss))
            {
                // get partner id 
                var enrlmntPrtnr = _unitofWork.eppEnrlmntPrtnrsRepository.GetEnrlmntPrtnrId(groupSetupModel.EmlAddrss);
                if (enrlmntPrtnr != null)
                {
                    groupSetupModel.EnrlmntPrtnrsId = enrlmntPrtnr.EnrlmntPrtnrsId;
                }
                else
                {
                    groupSetupModel.EnrlmntPrtnrsId = Helper.GetRandomNumber();
                    _unitofWork.eppEnrlmntPrtnrsRepository.Add(new EppEnrlmntPrtnrs
                    {
                        EnrlmntPrtnrsId = groupSetupModel.EnrlmntPrtnrsId,
                        CrtdBy = "",
                        EmlAddrss = groupSetupModel.EmlAddrss,
                        EnrlmntPrtnrsNm = groupSetupModel.EnrlmntPrtnrsNm

                    });
                }

            }
             // goup product for existing products

            var Grpprdcts = _unitofWork.eppGrpprdctRepository.Find(x => x.GrpId == groupSetupModel.GrpId).Result;
             foreach(var prod in Grpprdcts)
            {
               
                var prodData = _unitofWork.EppProductRepository.SingleOrDefault(x => x.ProductId == prod.ProductId).Result;
                switch (prodData.ProductNm)
                {
                    case "FPPG":
                        {
                            UpdateBulkRefTable(groupSetupModel.FPPG, prod.GrpprdctId);
                            // add product code                   
                            //var blkDatas = _unitofWork.eppBulkRefTblRepository.Find(x => x.GrpprdctId == prod.GrpprdctId).Result;
                            //Type fppgType = groupSetupModel.FPPG.GetType();
                            //foreach (var blk in blkDatas)
                            //{
                            //    var eppAttrs = _unitofWork.eppAttributeRepository.SingleOrDefault(x => x.AttrId == blk.AttrId).Result;
                            //    if(!string.IsNullOrEmpty(eppAttrs.DbAttrNm))
                            //    {
                            //        var actionPrpp = eppAttrs.DbAttrNm + "_action";
                            //        blk.Value = fppgType.GetProperty(eppAttrs.DbAttrNm).GetValue(groupSetupModel.FPPG).ToString();

                            //        var s = fppgType.GetProperty(eppAttrs.DbAttrNm).GetValue(groupSetupModel.FPPG).ToString();
                            //        long lvalue = 0;
                            //        long.TryParse(s, out lvalue);
                            //        if ( lvalue!=0)
                            //        blk.ActionId = lvalue;
                            //    }                                
                            //}
                            //_unitofWork.eppBulkRefTblRepository.UpdateRange(blkDatas);                         
                            break;
                        }
                    case "ACC_HI":
                        {

                            UpdateBulkRefTable(groupSetupModel.ACC_HI, prod.GrpprdctId);
                            break;
                        }
                    case "ER_CI":
                        {
                            UpdateBulkRefTable(groupSetupModel.ER_CI, prod.GrpprdctId);
                            break;
                        }
                    case "VOL_CI":
                        {
                            UpdateBulkRefTable(groupSetupModel.VOL_CI, prod.GrpprdctId);
                            break;
                        }
                    case "VGL":
                        {
                            UpdateBulkRefTable(groupSetupModel.VGL, prod.GrpprdctId);
                            break;
                        }
                    case "BGL":
                        {
                            UpdateBulkRefTable(groupSetupModel.BGL, prod.GrpprdctId);
                            break;
                        }
                    case "FPPI":
                        {

                            UpdateBulkRefTable(groupSetupModel.FPPI, prod.GrpprdctId);
                            break;
                        }
                    case "HI":
                        {
                            UpdateBulkRefTable(groupSetupModel.HI, prod.GrpprdctId);
                            break;
                        }
                }

            }
            var id = _unitofWork.Complete().Result;
            return Ok(id);
        }


        [NonAction]
        private   void UpdateBulkRefTable<T>( T  productAttr, long GrpprdctId)
        {
            var blkDatas = _unitofWork.eppBulkRefTblRepository.Find(x => x.GrpprdctId == GrpprdctId).Result;
            Type fppgType = productAttr.GetType();
            foreach (var blk in blkDatas)
            {
                var eppAttrs = _unitofWork.eppAttributeRepository.SingleOrDefault(x => x.AttrId == blk.AttrId).Result;
                if (!string.IsNullOrEmpty(eppAttrs.DbAttrNm))
                {
                    var actionPrpp = eppAttrs.DbAttrNm + "_action";
                    blk.Value = fppgType.GetProperty(eppAttrs.DbAttrNm).GetValue(productAttr).ToString();

                    var s = fppgType.GetProperty(eppAttrs.DbAttrNm).GetValue(productAttr).ToString();
                    long lvalue = 0;
                    long.TryParse(s, out lvalue);
                    if (lvalue != 0)
                        blk.ActionId = lvalue;
                }
            }
            _unitofWork.eppBulkRefTblRepository.UpdateRange(blkDatas);
        }

       

        [Route("[action]")]
        [HttpPost]
        public IActionResult EppCreateGrpSetup(GroupSetupModel  groupSetupModel)
        {
            try
            {
                var grpprdct = _unitofWork.GroupMasterRepository.Find(x => x.GrpNbr == groupSetupModel.GrpNbr || x.GrpNm == groupSetupModel.GrpNm).Result;
                if (grpprdct.Count != 0) return BadRequest(" Group name or number already exist");

                if (!string.IsNullOrEmpty(groupSetupModel.EmlAddrss))
                {
                    // get partner id 
                    var enrlmntPrtnr = _unitofWork.eppEnrlmntPrtnrsRepository.GetEnrlmntPrtnrId(groupSetupModel.EmlAddrss);
                    if (enrlmntPrtnr != null)
                    {
                        groupSetupModel.EnrlmntPrtnrsId = enrlmntPrtnr.EnrlmntPrtnrsId;
                    }
                    else
                    {
                        groupSetupModel.EnrlmntPrtnrsId = Helper.GetRandomNumber();
                        _unitofWork.eppEnrlmntPrtnrsRepository.Add(new EppEnrlmntPrtnrs
                        {
                            EnrlmntPrtnrsId = groupSetupModel.EnrlmntPrtnrsId,
                            CrtdBy = "",
                            EmlAddrss = groupSetupModel.EmlAddrss,
                            EnrlmntPrtnrsNm = groupSetupModel.EnrlmntPrtnrsNm

                        });
                    }

                }

                var grpId = Helper.GetRandomNumber();
                var CrtdBy = "";
                _unitofWork.GroupMasterRepository.Add(new EppGrpmstr
                {
                    GrpNbr = groupSetupModel.GrpNbr,
                    GrpNm = groupSetupModel.GrpNm,
                    ActvFlg = 'Y',
                    EnrlmntPrtnrsId = groupSetupModel.EnrlmntPrtnrsId,
                    AcctMgrNm = groupSetupModel.AcctMgrNm,
                    AcctMgrEmailAddrs = groupSetupModel.AcctMgrEmailAddrs,
                    GrpEfftvDt = groupSetupModel.GrpEfftvDt,
                    GrpSitusSt = groupSetupModel.GrpSitusSt,
                    GrpPymnId = groupSetupModel.GrpPymn,
                    OccClass = groupSetupModel.OccClass,
                    CaseTkn = groupSetupModel.case_token,
                    UsrTkn= groupSetupModel.user_token,
                    GrpId = grpId,
                    CrtdBy = CrtdBy,
                    CrtdDt = DateTime.UtcNow,

                }

                );
                

                // add group 
                DataHelper.UpdateAgent(groupSetupModel.GrpAgents, _unitofWork, grpId);

                List<EppBulkRefTbl> bulkRefTbls = new List<EppBulkRefTbl>();
            
                if (groupSetupModel.isFPPGActive)
                {
                    var prdid = Helper.GetProductIdbyName("FPPG", _unitofWork);
                    var grpprdId = Helper.GetRandomNumber();

                    _unitofWork.eppGrpprdctRepository.Add(new EppGrpprdct
                    {
                        GrpprdctId = grpprdId,
                        GrpId = grpId,
                        ProductId = prdid,
                        CrtdBy = CrtdBy,
                        CrtdDt = CreatedDate

                    }); ;


                    // add Product code
                    if (!string.IsNullOrEmpty(groupSetupModel.FPPG.emp_ProductCode))
                    {
                        PlanCodeViewModel planCodeViewModel = new PlanCodeViewModel
                        {
                            ProductCode = groupSetupModel.FPPG.emp_ProductCode,
                            ProductId= prdid

                        };
                        groupSetupModel.FPPG.emp_plan_cd = DataHelper.UpdatePlanCode(planCodeViewModel, _unitofWork).ProdctCdId.ToString();
                    }


                    if (!string.IsNullOrEmpty(groupSetupModel.FPPG.sp_ProductCode))
                    {
                        PlanCodeViewModel planCodeViewModel = new PlanCodeViewModel
                        {
                            ProductCode = groupSetupModel.FPPG.sp_ProductCode,
                            ProductId = prdid

                        };
                        groupSetupModel.FPPG.sp_plan_cd =DataHelper.UpdatePlanCode(planCodeViewModel, _unitofWork).ProdctCdId.ToString();
                    }


                    if (!string.IsNullOrEmpty(groupSetupModel.FPPG.ch_ProductCode))
                    {
                        PlanCodeViewModel planCodeViewModel = new PlanCodeViewModel
                        {
                            ProductCode = groupSetupModel.FPPG.ch_ProductCode,
                            ProductId = prdid

                        };
                        groupSetupModel.FPPG.ch_plan_cd = DataHelper.UpdatePlanCode(planCodeViewModel, _unitofWork).ProdctCdId.ToString();
                    }
                   
                    // add bulkupdate 
                    var bulkAttrs = Helper.GetProperties(groupSetupModel.FPPG);
                    AddEppBulkRefTblData(bulkAttrs, bulkRefTbls, grpprdId);                

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
                        CrtdBy = CrtdBy,
                        CrtdDt = CreatedDate

                    });
                    var bulkAttrs = Helper.GetProperties(groupSetupModel.ACC_HI);
                    AddEppBulkRefTblData(bulkAttrs, bulkRefTbls, grpprdId);

                  

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
                        CrtdBy = CrtdBy,
                        CrtdDt = CreatedDate

                    });

                    // add Product code
                    if (!string.IsNullOrEmpty(groupSetupModel.ER_CI.emp_ProductCode))
                    {
                        PlanCodeViewModel planCodeViewModel = new PlanCodeViewModel
                        {
                            ProductCode = groupSetupModel.ER_CI.emp_ProductCode,
                            ProductId = prdid

                        };
                        groupSetupModel.ER_CI.emp_plan_cd = DataHelper.UpdatePlanCode(planCodeViewModel, _unitofWork).ProdctCdId.ToString();
                    }


                    if (!string.IsNullOrEmpty(groupSetupModel.ER_CI.sp_ProductCode))
                    {
                        PlanCodeViewModel planCodeViewModel = new PlanCodeViewModel
                        {
                            ProductCode = groupSetupModel.ER_CI.sp_ProductCode,
                            ProductId = prdid

                        };
                        groupSetupModel.ER_CI.sp_plan_cd = DataHelper.UpdatePlanCode(planCodeViewModel, _unitofWork).ProdctCdId.ToString();
                    }


                    if (!string.IsNullOrEmpty(groupSetupModel.ER_CI.ch_ProductCode))
                    {
                        PlanCodeViewModel planCodeViewModel = new PlanCodeViewModel
                        {
                            ProductCode = groupSetupModel.ER_CI.ch_ProductCode,
                            ProductId = prdid

                        };
                        groupSetupModel.ER_CI.ch_plan_cd = DataHelper.UpdatePlanCode(planCodeViewModel, _unitofWork).ProdctCdId.ToString();
                    }

                    var bulkAttrs = Helper.GetProperties(groupSetupModel.ER_CI);
                    AddEppBulkRefTblData(bulkAttrs, bulkRefTbls, grpprdId);

                   

                }
                if (groupSetupModel.isVOL_CIActive)
                {
                    var prdid = Helper.GetProductIdbyName("VOL_CI", _unitofWork);
                    var grpprdId = Helper.GetRandomNumber();
                    AddProductCodes(new ProductCodesViewModel
                    {
                        ProductCode = groupSetupModel.VOL_CI.emp_ProductCode,
                        ProductId = prdid
                    });
                    _unitofWork.eppGrpprdctRepository.Add(new EppGrpprdct
                    {
                        GrpprdctId = grpprdId,
                        GrpId = grpId,
                        ProductId = prdid,
                        CrtdBy = CrtdBy

                    });


                    // add Product code
                    if (!string.IsNullOrEmpty(groupSetupModel.VOL_CI.emp_ProductCode))
                    {
                        PlanCodeViewModel planCodeViewModel = new PlanCodeViewModel
                        {
                            ProductCode = groupSetupModel.VOL_CI.emp_ProductCode,
                            ProductId = prdid

                        };
                        groupSetupModel.VOL_CI.emp_plan_cd = DataHelper.UpdatePlanCode(planCodeViewModel, _unitofWork).ProdctCdId.ToString();
                    }


                    if (!string.IsNullOrEmpty(groupSetupModel.VOL_CI.sp_ProductCode))
                    {
                        PlanCodeViewModel planCodeViewModel = new PlanCodeViewModel
                        {
                            ProductCode = groupSetupModel.VOL_CI.sp_ProductCode,
                            ProductId = prdid

                        };
                        groupSetupModel.VOL_CI.sp_plan_cd = DataHelper.UpdatePlanCode(planCodeViewModel, _unitofWork).ProdctCdId.ToString();
                    }


                    if (!string.IsNullOrEmpty(groupSetupModel.VOL_CI.ch_ProductCode))
                    {
                        PlanCodeViewModel planCodeViewModel = new PlanCodeViewModel
                        {
                            ProductCode = groupSetupModel.VOL_CI.ch_ProductCode,
                            ProductId = prdid

                        };
                        groupSetupModel.VOL_CI.ch_plan_cd = DataHelper.UpdatePlanCode(planCodeViewModel, _unitofWork).ProdctCdId.ToString();
                    }

                    var bulkAttrs = Helper.GetProperties(groupSetupModel.VOL_CI);
                    AddEppBulkRefTblData(bulkAttrs, bulkRefTbls, grpprdId);

               

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

                    //if (!string.IsNullOrEmpty(groupSetupModel.EmailAddress))
                    //{
                    //    var rndNo = Helper.GetRandomNumber();
                    //    _unitofWork.eppAcctMgrCntctsRepository.Add(new EppAcctMgrCntcts
                    //    {
                    //        GrpprdctId = grpprdId,
                    //        AcctMgrCntctId = rndNo,
                    //        EmailAddress = groupSetupModel.EmailAddress,
                    //        AcctMgrNm = groupSetupModel.AcctMgrNm,
                    //        CrdtBy = CrtdBy,

                    //    });
                    //}

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

                    if (!string.IsNullOrEmpty(groupSetupModel.FPPI.emp_ProductCode))
                    {
                        PlanCodeViewModel planCodeViewModel = new PlanCodeViewModel
                        {
                            ProductCode = groupSetupModel.FPPI.emp_ProductCode,
                            ProductId = prdid

                        };
                        groupSetupModel.FPPI.emp_plan_cd = DataHelper.UpdatePlanCode(planCodeViewModel, _unitofWork).ProdctCdId.ToString();
                    }

                    if (!string.IsNullOrEmpty(groupSetupModel.FPPI.sp_ProductCode))
                    {
                        PlanCodeViewModel planCodeViewModel = new PlanCodeViewModel
                        {
                            ProductCode = groupSetupModel.FPPI.sp_ProductCode,
                            ProductId = prdid

                        };
                        groupSetupModel.FPPI.sp_plan_cd = DataHelper.UpdatePlanCode(planCodeViewModel, _unitofWork).ProdctCdId.ToString();
                    }

                    if (!string.IsNullOrEmpty(groupSetupModel.FPPI.ch_ProductCode))
                    {
                        PlanCodeViewModel planCodeViewModel = new PlanCodeViewModel
                        {
                            ProductCode = groupSetupModel.FPPI.ch_ProductCode,
                            ProductId = prdid

                        };
                        groupSetupModel.FPPI.ch_plan_cd = DataHelper.UpdatePlanCode(planCodeViewModel, _unitofWork).ProdctCdId.ToString();
                    }

                    var bulkAttrs = Helper.GetProperties(groupSetupModel.FPPI);
                    AddEppBulkRefTblData(bulkAttrs, bulkRefTbls, grpprdId);

                    //if (!string.IsNullOrEmpty(groupSetupModel.EmailAddress))
                    //{
                    //    var rndNo = Helper.GetRandomNumber();
                    //    _unitofWork.eppAcctMgrCntctsRepository.Add(new EppAcctMgrCntcts
                    //    {
                    //        GrpprdctId = grpprdId,
                    //        AcctMgrCntctId = rndNo,
                    //        EmailAddress = groupSetupModel.EmailAddress,
                    //        AcctMgrNm = groupSetupModel.AcctMgrNm,
                    //        CrdtBy = CrtdBy
                    //    });
                    //}

                }
                if (groupSetupModel.isHIActive)
                {

                    var prdid = Helper.GetProductIdbyName("HI", _unitofWork);
                    var grpprdId = Helper.GetRandomNumber();
                    _unitofWork.eppGrpprdctRepository.Add(new EppGrpprdct
                    {
                        GrpprdctId = grpprdId,
                        GrpId = grpId,
                        ProductId = prdid,
                        CrtdBy = CrtdBy

                    });

                  
                    var bulkAttrs = Helper.GetProperties(groupSetupModel.HI);
                    AddEppBulkRefTblData(bulkAttrs, bulkRefTbls, grpprdId);

                    //if (!string.IsNullOrEmpty(groupSetupModel.EmailAddress))
                    //{
                    //    var rndNo = Helper.GetRandomNumber();
                    //    _unitofWork.eppAcctMgrCntctsRepository.Add(new EppAcctMgrCntcts
                    //    {
                    //        GrpprdctId = grpprdId,
                    //        AcctMgrCntctId = rndNo,
                    //        EmailAddress = groupSetupModel.EmailAddress,
                    //        AcctMgrNm = groupSetupModel.AcctMgrNm,
                    //        CrdtBy = CrtdBy
                    //    });
                    //}



                }
                if (bulkRefTbls.Count > 0)
                    _unitofWork.eppBulkRefTblRepository.AddRange(bulkRefTbls);


                var id = _unitofWork.Complete().Result;
                return Ok(id);
            }catch( Exception ex)
            {
                throw ex;
            }
        }

        [Route("grpNbr/{grpNbr?}")]
        [HttpGet]
        public IActionResult EppGetGrpSetup( string grpNbr)
        {
            try
            {


                GroupSetupModel groupSetupModel = new GroupSetupModel();
                if ( string.IsNullOrEmpty(grpNbr))
                {
                    groupSetupModel.GrpEfftvDt = DateTime.UtcNow;
                }

                var GrpMaster = _unitofWork.GroupMasterRepository.SingleOrDefault(x => x.GrpNbr == grpNbr).Result;
                if (GrpMaster != null)
                {

                    groupSetupModel.GrpId = GrpMaster.GrpId;
                    groupSetupModel.GrpNbr = GrpMaster.GrpNbr;
                    groupSetupModel.GrpNm = GrpMaster.GrpNm;
                    groupSetupModel.ActvFlg = GrpMaster.ActvFlg;
                    groupSetupModel.EnrlmntPrtnrsId = GrpMaster.EnrlmntPrtnrsId;
                    var enrlPartner = _unitofWork.eppEnrlmntPrtnrsRepository.SingleOrDefault(x => x.EnrlmntPrtnrsId == GrpMaster.EnrlmntPrtnrsId).Result;
                    if (enrlPartner != null)
                    {
                        groupSetupModel.EmlAddrss = enrlPartner.EmlAddrss;
                        groupSetupModel.EnrlmntPrtnrsNm = enrlPartner.EnrlmntPrtnrsNm;
                    }
                    groupSetupModel.AcctMgrNm = GrpMaster.AcctMgrNm;
                    groupSetupModel.AcctMgrEmailAddrs = GrpMaster.AcctMgrEmailAddrs;

                    groupSetupModel.GrpEfftvDt = GrpMaster.GrpEfftvDt;
                    groupSetupModel.GrpPymn = GrpMaster.GrpPymnId;
                    groupSetupModel.GrpSitusSt = GrpMaster.GrpSitusSt;
                    groupSetupModel.OccClass = GrpMaster.OccClass;

                    // Load Product Master

                    var Grpprdcts = _unitofWork.eppGrpprdctRepository.Find(x => x.GrpId == groupSetupModel.GrpId).Result;
                    foreach (var prod in Grpprdcts)
                    {
                        //var venderData = _unitofWork.eppAcctMgrCntctsRepository.SingleOrDefault(x => x.GrpprdctId == prod.GrpprdctId).Result;
                        //if (venderData != null)
                        //{
                        //    groupSetupModel.EmailAddress = venderData.EmailAddress;
                        //    groupSetupModel.AcctMgrNm = venderData.AcctMgrNm;
                        //}
                        // load product  

                        var prodData = _unitofWork.EppProductRepository.SingleOrDefault(x => x.ProductId == prod.ProductId).Result;
                        switch (prodData.ProductNm)
                        {
                            case "FPPG":
                                {
                                    groupSetupModel.isFPPGActive = true;
                                    groupSetupModel.FPPG = new FPPG();
                                    GetProductValue(groupSetupModel.FPPG, prod.GrpprdctId);
                                    //var blkDatas = _unitofWork.eppBulkRefTblRepository.Find(x => x.GrpprdctId == prod.GrpprdctId).Result;
                                    //Type typeInfo = groupSetupModel.FPPG.GetType();
                                    //PropertyInfo[] props = typeInfo.GetProperties();
                                    //foreach (var blk in blkDatas)
                                    //{
                                    //    var eppAttrs = _unitofWork.eppAttributeRepository.SingleOrDefault(x => x.AttrId == blk.AttrId).Result;
                                    //    var propName = props.Where(x => x.Name == eppAttrs.DbAttrNm).Select(x => new { x.Name, x.PropertyType }).FirstOrDefault();
                                    //    if (propName != null)
                                    //    {
                                    //        typeInfo.GetProperty(propName.Name).SetValue(groupSetupModel.FPPG, Convert.ChangeType(blk.Value, propName.PropertyType), null);

                                    //        var actionPropName = propName.Name + "_action";
                                    //        var isActionAvail = props.Where(x => x.Name == actionPropName).Select(x => x.Name).FirstOrDefault();
                                    //        if (isActionAvail != null)
                                    //        {
                                    //            typeInfo.GetProperty(actionPropName).SetValue(groupSetupModel.FPPG, Convert.ChangeType(blk.ActionId, propName.PropertyType), null);
                                    //        }

                                    //    }
                                    //}
                              

                                    // load product code
                                    groupSetupModel.FPPG.emp_ProductCode = GetProductCode(groupSetupModel.FPPG.emp_plan_cd);
                                    groupSetupModel.FPPG.sp_ProductCode = GetProductCode(groupSetupModel.FPPG.sp_plan_cd);
                                    groupSetupModel.FPPG.ch_ProductCode = GetProductCode(groupSetupModel.FPPG.sp_plan_cd);
                                    break;
                                }
                            case "ACC_HI":
                                {
                                    groupSetupModel.isACC_HIActive = true;
                                    groupSetupModel.ACC_HI = new ACC_HI();
                                    GetProductValue(groupSetupModel.ACC_HI, prod.GrpprdctId);
                                     break;
                                    //var blkDatas = _unitofWork.eppBulkRefTblRepository.Find(x => x.GrpprdctId == prod.GrpprdctId).Result;

                                    //Type typeInfo = groupSetupModel.ACC_HI.GetType();
                                    //PropertyInfo[] props = typeInfo.GetProperties();
                                    //foreach (var blk in blkDatas)
                                    //{
                                    //    var eppAttrs = _unitofWork.eppAttributeRepository.SingleOrDefault(x => x.AttrId == blk.AttrId).Result;
                                    //    var propName = props.Where(x => x.Name == eppAttrs.DbAttrNm).Select(x => new { x.Name, x.PropertyType }).FirstOrDefault();
                                    //    if (propName != null)
                                    //    {
                                    //        typeInfo.GetProperty(propName.Name).SetValue(groupSetupModel.ACC_HI, Convert.ChangeType(blk.Value, propName.PropertyType), null);

                                    //        var actionPropName = propName.Name + "_action";
                                    //        var isActionAvail = props.Where(x => x.Name == actionPropName).Select(x => x.Name).FirstOrDefault();
                                    //        if (isActionAvail != null)
                                    //        {
                                    //            typeInfo.GetProperty(actionPropName).SetValue(groupSetupModel.ACC_HI, Convert.ChangeType(blk.ActionId, propName.PropertyType), null);
                                    //        }

                                    //    }
                                    //}




                                }
                            case "ER_CI":
                                {
                                    groupSetupModel.isER_CIActive = true;
                                    groupSetupModel.ER_CI = new ER_CI();
                                    GetProductValue(groupSetupModel.ER_CI, prod.GrpprdctId);
                                   
                                    
                                    
                                    //var blkDatas = _unitofWork.eppBulkRefTblRepository.Find(x => x.GrpprdctId == prod.GrpprdctId).Result;
                               
                                    //Type typeInfo = groupSetupModel.ER_CI.GetType();
                                    //PropertyInfo[] props = typeInfo.GetProperties();
                                    //foreach (var blk in blkDatas)
                                    //{
                                    //    var eppAttrs = _unitofWork.eppAttributeRepository.SingleOrDefault(x => x.AttrId == blk.AttrId).Result;
                                    //    var propName = props.Where(x => x.Name == eppAttrs.DbAttrNm).Select(x => new { x.Name, x.PropertyType }).FirstOrDefault();
                                    //    if (propName != null)
                                    //    {
                                    //        typeInfo.GetProperty(propName.Name).SetValue(groupSetupModel.ER_CI, Convert.ChangeType(blk.Value, propName.PropertyType), null);

                                    //        var actionPropName = propName.Name + "_action";
                                    //        var isActionAvail = props.Where(x => x.Name == actionPropName).Select(x => x.Name).FirstOrDefault();
                                    //        if (isActionAvail != null)
                                    //        {
                                    //            typeInfo.GetProperty(actionPropName).SetValue(groupSetupModel.ER_CI, Convert.ChangeType(blk.ActionId, propName.PropertyType), null);
                                    //        }

                                    //    }
                                    //}

                                    groupSetupModel.ER_CI.emp_ProductCode = GetProductCode(groupSetupModel.ER_CI.emp_plan_cd);
                                    groupSetupModel.ER_CI.sp_ProductCode = GetProductCode(groupSetupModel.ER_CI.sp_plan_cd);
                                    groupSetupModel.ER_CI.ch_ProductCode = GetProductCode(groupSetupModel.ER_CI.sp_plan_cd);
                                    break;
                                }
                            case "VOL_CI":
                                {
                                    groupSetupModel.isVOL_CIActive = true;
                                    groupSetupModel.VOL_CI = new VOL_CI();
                                    GetProductValue(groupSetupModel.VOL_CI, prod.GrpprdctId);
                                   
                                    //var blkDatas = _unitofWork.eppBulkRefTblRepository.Find(x => x.GrpprdctId == prod.GrpprdctId).Result;
                                  
                                    //Type typeInfo = groupSetupModel.VOL_CI.GetType();
                                    //PropertyInfo[] props = typeInfo.GetProperties();
                                    //foreach (var blk in blkDatas)
                                    //{
                                    //    var eppAttrs = _unitofWork.eppAttributeRepository.SingleOrDefault(x => x.AttrId == blk.AttrId).Result;
                                    //    var propName = props.Where(x => x.Name == eppAttrs.DbAttrNm).Select(x => new { x.Name, x.PropertyType }).FirstOrDefault();
                                    //    if (propName != null)
                                    //    {
                                    //        typeInfo.GetProperty(propName.Name).SetValue(groupSetupModel.VOL_CI, Convert.ChangeType(blk.Value, propName.PropertyType), null);

                                    //        var actionPropName = propName.Name + "_action";
                                    //        var isActionAvail = props.Where(x => x.Name == actionPropName).Select(x => x.Name).FirstOrDefault();
                                    //        if (isActionAvail != null)
                                    //        {
                                    //            typeInfo.GetProperty(actionPropName).SetValue(groupSetupModel.VOL_CI, Convert.ChangeType(blk.ActionId, propName.PropertyType), null);
                                    //        }

                                    //    }
                                    //}

                                    groupSetupModel.VOL_CI.emp_ProductCode = GetProductCode(groupSetupModel.VOL_CI.emp_plan_cd);
                                    groupSetupModel.VOL_CI.sp_ProductCode = GetProductCode(groupSetupModel.VOL_CI.sp_plan_cd);
                                    groupSetupModel.VOL_CI.ch_ProductCode = GetProductCode(groupSetupModel.VOL_CI.sp_plan_cd);

                                    break;
                                }
                            case "VGL":
                                {
                                    groupSetupModel.isVGLActive = true;
                                    groupSetupModel.VGL = new VGL();
                                    GetProductValue(groupSetupModel.VGL, prod.GrpprdctId);

                                    //var blkDatas = _unitofWork.eppBulkRefTblRepository.Find(x => x.GrpprdctId == prod.GrpprdctId).Result;
                                    
                                    //Type typeInfo = groupSetupModel.VGL.GetType();
                                    //PropertyInfo[] props = typeInfo.GetProperties();
                                    //foreach (var blk in blkDatas)
                                    //{
                                    //    var eppAttrs = _unitofWork.eppAttributeRepository.SingleOrDefault(x => x.AttrId == blk.AttrId).Result;
                                    //    var propName = props.Where(x => x.Name == eppAttrs.DbAttrNm).Select(x => new { x.Name, x.PropertyType }).FirstOrDefault();
                                    //    if (propName != null)
                                    //    {
                                    //        typeInfo.GetProperty(propName.Name).SetValue(groupSetupModel.VGL, Convert.ChangeType(blk.Value, propName.PropertyType), null);

                                    //        var actionPropName = propName.Name + "_action";
                                    //        var isActionAvail = props.Where(x => x.Name == actionPropName).Select(x => x.Name).FirstOrDefault();
                                    //        if (isActionAvail != null)
                                    //        {
                                    //            typeInfo.GetProperty(actionPropName).SetValue(groupSetupModel.VGL, Convert.ChangeType(blk.ActionId, propName.PropertyType), null);
                                    //        }

                                    //    }
                                    //}
                                    break;
                                }
                            case "BGL":
                                {
                                    groupSetupModel.isBGLActive = true;
                                    groupSetupModel.BGL = new BGL();
                                    GetProductValue(groupSetupModel.BGL, prod.GrpprdctId);
                                    
                                    //var blkDatas = _unitofWork.eppBulkRefTblRepository.Find(x => x.GrpprdctId == prod.GrpprdctId).Result;
                                 
                                    //Type typeInfo = groupSetupModel.BGL.GetType();
                                    //PropertyInfo[] props = typeInfo.GetProperties();
                                    //foreach (var blk in blkDatas)
                                    //{
                                    //    var eppAttrs = _unitofWork.eppAttributeRepository.SingleOrDefault(x => x.AttrId == blk.AttrId).Result;
                                    //    var propName = props.Where(x => x.Name == eppAttrs.DbAttrNm).Select(x => new { x.Name, x.PropertyType }).FirstOrDefault();
                                    //    if (propName != null)
                                    //    {
                                    //        typeInfo.GetProperty(propName.Name).SetValue(groupSetupModel.BGL, Convert.ChangeType(blk.Value, propName.PropertyType), null);

                                    //        var actionPropName = propName.Name + "_action";
                                    //        var isActionAvail = props.Where(x => x.Name == actionPropName).Select(x => x.Name).FirstOrDefault();
                                    //        if (isActionAvail != null)
                                    //        {
                                    //            typeInfo.GetProperty(actionPropName).SetValue(groupSetupModel.BGL, Convert.ChangeType(blk.ActionId, propName.PropertyType), null);
                                    //        }

                                    //    }
                                    //}
                                    break;
                                }
                            case "FPPI":
                                {

                                    groupSetupModel.isFPPIActive = true;
                                    groupSetupModel.FPPI = new FPPI();
                                    GetProductValue(groupSetupModel.FPPI, prod.GrpprdctId);

                                    //var blkDatas = _unitofWork.eppBulkRefTblRepository.Find(x => x.GrpprdctId == prod.GrpprdctId).Result;
                                   
                                    //Type typeInfo = groupSetupModel.FPPI.GetType();
                                    //PropertyInfo[] props = typeInfo.GetProperties();
                                    //foreach (var blk in blkDatas)
                                    //{
                                    //    var eppAttrs = _unitofWork.eppAttributeRepository.SingleOrDefault(x => x.AttrId == blk.AttrId).Result;
                                    //    var propName = props.Where(x => x.Name == eppAttrs.DbAttrNm).Select(x => new { x.Name, x.PropertyType }).FirstOrDefault();
                                    //    if (propName != null)
                                    //    {
                                    //        typeInfo.GetProperty(propName.Name).SetValue(groupSetupModel.FPPI, Convert.ChangeType(blk.Value, propName.PropertyType), null);

                                    //        var actionPropName = propName.Name + "_action";
                                    //        var isActionAvail = props.Where(x => x.Name == actionPropName).Select(x => x.Name).FirstOrDefault();
                                    //        if (isActionAvail != null)
                                    //        {
                                    //            typeInfo.GetProperty(actionPropName).SetValue(groupSetupModel.FPPI, Convert.ChangeType(blk.ActionId, propName.PropertyType), null);
                                    //        }

                                    //    }
                                    //}

                                    groupSetupModel.FPPI.emp_ProductCode = GetProductCode(groupSetupModel.FPPI.emp_plan_cd);
                                    groupSetupModel.FPPI.sp_ProductCode = GetProductCode(groupSetupModel.FPPI.sp_plan_cd);
                                    groupSetupModel.FPPI.ch_ProductCode = GetProductCode(groupSetupModel.FPPI.sp_plan_cd);

                                    break;
                                }
                            case "HI":
                                {

                                    groupSetupModel.isHIActive = true;
                                    groupSetupModel.HI = new HI();
                                    GetProductValue(groupSetupModel.HI, prod.GrpprdctId);

                                    //var blkDatas = _unitofWork.eppBulkRefTblRepository.Find(x => x.GrpprdctId == prod.GrpprdctId).Result;
                                
                                    //Type typeInfo = groupSetupModel.HI.GetType();
                                    //PropertyInfo[] props = typeInfo.GetProperties();
                                    //foreach (var blk in blkDatas)
                                    //{
                                    //    var eppAttrs = _unitofWork.eppAttributeRepository.SingleOrDefault(x => x.AttrId == blk.AttrId).Result;
                                    //    var propName = props.Where(x => x.Name == eppAttrs.DbAttrNm).Select(x => new { x.Name, x.PropertyType }).FirstOrDefault();
                                    //    if (propName != null)
                                    //    {
                                    //        typeInfo.GetProperty(propName.Name).SetValue(groupSetupModel.HI, Convert.ChangeType(blk.Value, propName.PropertyType), null);

                                    //        var actionPropName = propName.Name + "_action";
                                    //        var isActionAvail = props.Where(x => x.Name == actionPropName).Select(x => x.Name).FirstOrDefault();
                                    //        if (isActionAvail != null)
                                    //        {
                                    //            typeInfo.GetProperty(actionPropName).SetValue(groupSetupModel.HI, Convert.ChangeType(blk.ActionId, propName.PropertyType), null);
                                    //        }

                                    //    }
                                    //}
                                    break;
                                }


                        }

                    }



                }

               return Ok(groupSetupModel);
            }catch(  Exception ex)
            {
                throw ex;
            }
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
                        eppBulkRefTbl.BulkId = Helper.GetRandomNumber();
                        eppBulkRefTbl.GrpprdctId = grpPrdId;
                        eppBulkRefTbl.AttrId = eppAttribute.AttrId;
                        eppBulkRefTbl.Value = prop.PropertyValue;
                        eppBulkRefTbl.CrtdBy = "";
                        bulkRefTbls.Add(eppBulkRefTbl);
                    }
                    
                }
              
            }

        }

       

        [NonAction]
       private void GetProductValue<T>( T Product, long grpprdctId)
        {
            var blkDatas = _unitofWork.eppBulkRefTblRepository.Find(x => x.GrpprdctId == grpprdctId).Result;

            Type typeInfo = Product.GetType();
            PropertyInfo[] props = typeInfo.GetProperties();
            foreach (var blk in blkDatas)
            {
                var eppAttrs = _unitofWork.eppAttributeRepository.SingleOrDefault(x => x.AttrId == blk.AttrId).Result;
                var propName = props.Where(x => x.Name == eppAttrs.DbAttrNm).Select(x => new { x.Name, x.PropertyType }).FirstOrDefault();
                if (propName != null)
                {
                    typeInfo.GetProperty(propName.Name).SetValue(Product, Convert.ChangeType(blk.Value, propName.PropertyType), null);

                    var actionPropName = propName.Name + "_action";
                    var isActionAvail = props.Where(x => x.Name == actionPropName).Select(x => x.Name).FirstOrDefault();
                    if (isActionAvail != null)
                    {
                        typeInfo.GetProperty(actionPropName).SetValue(Product, Convert.ChangeType(blk.ActionId, propName.PropertyType), null);
                    }

                }
            }
        }

        [NonAction]
        private string GetProductCode(string ProdctCdId)
        {
            string productCode = "";
            var result = _unitofWork.eppProductCodesRepository.Find(x => x.ProdctCdId == long.Parse( ProdctCdId)).Result.FirstOrDefault();
            if (result != null)
            {
                productCode=result.ProductCode;
            }
          return  productCode;
        }


        //[NonAction]
        //private void LoadProductBulkRefData(long GrpprdctId)
        //{
        //   var blkData= _unitofWork.eppBulkRefTblRepository.Find(x => x.GrpprdctId == GrpprdctId).Result;
        //}


        [NonAction]
        private void AddProductCodes(ProductCodesViewModel productCodesView)
        {
            var isAvail=_unitofWork.eppProductCodesRepository.SingleOrDefault(x => x.ProductCode == productCodesView.ProductCode && x.ProductId == productCodesView.ProductId).Result;
            if(isAvail == null)
            {
                _unitofWork.eppProductCodesRepository.Add(new EppProductCodes
                {
                     ProdctCdId=Helper.GetRandomNumber(),
                     ProductCode= productCodesView.ProductCode,
                     ProductId= productCodesView.ProductId,
                     CrtdBy=""
                });
            }


        }
    }
}
