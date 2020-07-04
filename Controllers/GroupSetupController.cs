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
            try
            {
                var grpId = long.Parse(groupSetupModel.GrpId);

                var grpMstdata = _unitofWork.GroupMasterRepository.Find(x => x.GrpId == grpId).Result.FirstOrDefault();
                if (grpMstdata == null) return BadRequest("Incorrect group id");

                if (!string.IsNullOrEmpty(groupSetupModel.EmlAddrss))
                {
                    // get partner id 
                    var enrlmntPrtnr = _unitofWork.eppEnrlmntPrtnrsRepository.GetEnrlmntPrtnrId(groupSetupModel.EmlAddrss);
                    if (enrlmntPrtnr != null)
                    {
                        groupSetupModel.EnrlmntPrtnrsId = enrlmntPrtnr.EnrlmntPrtnrsId.ToString();
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
                grpMstdata.EnrlmntPrtnrsId = long.Parse(groupSetupModel.EnrlmntPrtnrsId);
                grpMstdata.AcctMgrNm = groupSetupModel.AcctMgrNm;
                grpMstdata.AcctMgrEmailAddrs = groupSetupModel.AcctMgrEmailAddrs;
                grpMstdata.GrpEfftvDt = groupSetupModel.GrpEfftvDt;
                grpMstdata.GrpSitusSt = groupSetupModel.GrpSitusSt;

                grpMstdata.GrpPymnId = groupSetupModel.GrpPymn;
                grpMstdata.OccClass = groupSetupModel.OccClass;
                grpMstdata.CrtdBy = CrtdBy;
                // update group Master

                _unitofWork.GroupMasterRepository.Update(grpMstdata);

                UpdateAgent(groupSetupModel.GrpAgents, grpId);

                // add  update enrollment partner
                if (!string.IsNullOrEmpty(groupSetupModel.EmlAddrss))
                {
                    // get partner id 
                    var enrlmntPrtnr = _unitofWork.eppEnrlmntPrtnrsRepository.GetEnrlmntPrtnrId(groupSetupModel.EmlAddrss);
                    if (enrlmntPrtnr != null)
                    {
                        groupSetupModel.EnrlmntPrtnrsId = enrlmntPrtnr.EnrlmntPrtnrsId.ToString();
                    }
                    else
                    {
                        groupSetupModel.EnrlmntPrtnrsId = Helper.GetRandomNumber().ToString();
                        _unitofWork.eppEnrlmntPrtnrsRepository.Add(new EppEnrlmntPrtnrs
                        {
                            EnrlmntPrtnrsId = long.Parse(groupSetupModel.EnrlmntPrtnrsId),
                            CrtdBy = CrtdBy,
                            EmlAddrss = groupSetupModel.EmlAddrss,
                            EnrlmntPrtnrsNm = groupSetupModel.EnrlmntPrtnrsNm

                        });
                    }

                }
                // goup product for existing products

                var Grpprdcts = _unitofWork.eppGrpprdctRepository.Find(x => x.GrpId == grpId).Result;

                // For Edit
                foreach (var prod in Grpprdcts)
                {

                    var prodData = _unitofWork.EppProductRepository.SingleOrDefault(x => x.ProductId == prod.ProductId).Result;
                    switch (prodData.ProductNm)
                    {
                        case "FPPG":
                            {
                                UpdateBulkRefTable(groupSetupModel.FPPG, prod.GrpprdctId);
                                groupSetupModel.isFPPGActive = false;

                                break;
                            }
                        case "ACC_HI":
                            {

                                UpdateBulkRefTable(groupSetupModel.ACC_HI, prod.GrpprdctId);
                                groupSetupModel.isACC_HIActive = false;
                                break;
                            }
                        case "ER_CI":
                            {
                                UpdateBulkRefTable(groupSetupModel.ER_CI, prod.GrpprdctId);
                                groupSetupModel.isER_CIActive = false;
                                break;
                            }
                        case "VOL_CI":
                            {
                                UpdateBulkRefTable(groupSetupModel.VOL_CI, prod.GrpprdctId);
                                groupSetupModel.isVOL_CIActive = false;
                                break;
                            }
                        case "VGL":
                            {
                                UpdateBulkRefTable(groupSetupModel.VGL, prod.GrpprdctId);
                                groupSetupModel.isVGLActive = false;
                                break;
                            }
                        case "BGL":
                            {
                                UpdateBulkRefTable(groupSetupModel.BGL, prod.GrpprdctId);
                                groupSetupModel.isBGLActive = false;
                                break;
                            }
                        case "FPPI":
                            {

                                UpdateBulkRefTable(groupSetupModel.FPPI, prod.GrpprdctId);
                                groupSetupModel.isFPPIActive = false;
                                break;
                            }
                        case "HI":
                            {
                                UpdateBulkRefTable(groupSetupModel.HI, prod.GrpprdctId);
                                groupSetupModel.isHIActive = false;
                                break;
                            }
                    }

                }

                // for  New Add
                // Add BulkRef data
                List<EppBulkRefTbl> bulkRefTbls = new List<EppBulkRefTbl>();
                if (groupSetupModel.isFPPGActive)
                {

                    AddFPPG(groupSetupModel.FPPG, "FPPG", grpId, bulkRefTbls);
                }
                if (groupSetupModel.isACC_HIActive)
                {
                    AddACCHI(groupSetupModel.ACC_HI, "ACC_HI", grpId, bulkRefTbls);

                }
                if (groupSetupModel.isER_CIActive)
                {
                    AddER_CI(groupSetupModel.ER_CI, "ER_CI", grpId, bulkRefTbls);
                }
                if (groupSetupModel.isVOL_CIActive)
                {
                    AddVOL_CI(groupSetupModel.VOL_CI, "VOL_CI", grpId, bulkRefTbls);
                }
                if (groupSetupModel.isVGLActive)
                {
                    AddVGL(groupSetupModel.VGL, "VGL", grpId, bulkRefTbls);

                }
                if (groupSetupModel.isBGLActive)
                {
                    AddBGL(groupSetupModel.BGL, "BGL", grpId, bulkRefTbls);
                }
                if (groupSetupModel.isFPPIActive)
                {
                    AddFPPI(groupSetupModel.FPPI, "FPPI", grpId, bulkRefTbls);
                }
                if (groupSetupModel.isHIActive)
                {
                    AddHI(groupSetupModel.HI, "HI", grpId, bulkRefTbls);

                }
                if (bulkRefTbls.Count > 0)
                _unitofWork.eppBulkRefTblRepository.AddRange(bulkRefTbls);
                var id = _unitofWork.Complete().Result;
                return Ok($"Group No. {groupSetupModel.GrpNbr} updated sucessfully!");
            }
            catch( Exception ex)
            {
                throw ex;
            }
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

                    var s = fppgType.GetProperty(actionPrpp).GetValue(productAttr).ToString();
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
                long enrlmntPrtnrsId=0;
                var grpprdct = _unitofWork.GroupMasterRepository.Find(x => x.GrpNbr == groupSetupModel.GrpNbr || x.GrpNm == groupSetupModel.GrpNm).Result;
                if (grpprdct.Count != 0) return BadRequest(" Group name or number already exist");

                if (!string.IsNullOrEmpty(groupSetupModel.EmlAddrss))
                {
                    // get partner id 
                    var enrlmntPrtnr = _unitofWork.eppEnrlmntPrtnrsRepository.GetEnrlmntPrtnrId(groupSetupModel.EmlAddrss);
                    if (enrlmntPrtnr != null)
                    {
                        enrlmntPrtnrsId = enrlmntPrtnr.EnrlmntPrtnrsId;
                        groupSetupModel.EnrlmntPrtnrsId = enrlmntPrtnrsId.ToString();
                    }
                    else
                    {
                        enrlmntPrtnrsId = Helper.GetRandomNumber();
                        groupSetupModel.EnrlmntPrtnrsId = enrlmntPrtnrsId.ToString();
                        _unitofWork.eppEnrlmntPrtnrsRepository.Add(new EppEnrlmntPrtnrs
                        {
                            EnrlmntPrtnrsId = long.Parse(groupSetupModel.EnrlmntPrtnrsId),
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
                    EnrlmntPrtnrsId = enrlmntPrtnrsId,
                    AcctMgrNm = groupSetupModel.AcctMgrNm,
                    AcctMgrEmailAddrs = groupSetupModel.AcctMgrEmailAddrs,
                    GrpEfftvDt = groupSetupModel.GrpEfftvDt,
                    GrpSitusSt = groupSetupModel.GrpSitusSt,
                    GrpPymnId =groupSetupModel.GrpPymn,
                    OccClass = groupSetupModel.OccClass,
                    CaseTkn = groupSetupModel.case_token,
                    UsrTkn= groupSetupModel.user_token,
                    GrpId = grpId,
                    CrtdBy = CrtdBy,
                    CrtdDt = DateTime.UtcNow,

                }

                );
                // add Aggents 
                UpdateAgent(groupSetupModel.GrpAgents,  grpId);  
                
                // Add BulkRef data
                List<EppBulkRefTbl> bulkRefTbls = new List<EppBulkRefTbl>();            
                if (groupSetupModel.isFPPGActive)
                {

                    AddFPPG(groupSetupModel.FPPG, "FPPG", grpId, bulkRefTbls);
                }
                if (groupSetupModel.isACC_HIActive)
                {
                    AddACCHI(groupSetupModel.ACC_HI, "ACC_HI", grpId, bulkRefTbls);
                  
                }
                if (groupSetupModel.isER_CIActive)
                {
                     AddER_CI(groupSetupModel.ER_CI, "ER_CI", grpId, bulkRefTbls);
                }
                if (groupSetupModel.isVOL_CIActive)
                {
                    AddVOL_CI(groupSetupModel.VOL_CI, "VOL_CI", grpId, bulkRefTbls);
                }
                if (groupSetupModel.isVGLActive)
                {
                    AddVGL(groupSetupModel.VGL, "VGL", grpId, bulkRefTbls);
                    
                }
                if (groupSetupModel.isBGLActive)
                {
                    AddBGL(groupSetupModel.BGL, "BGL", grpId, bulkRefTbls);
                }
                if (groupSetupModel.isFPPIActive)
                {
                    AddFPPI(groupSetupModel.FPPI, "FPPI", grpId, bulkRefTbls);                    
                }
                if (groupSetupModel.isHIActive)
                {
                    AddHI(groupSetupModel.HI, "HI", grpId, bulkRefTbls);
                    
                }
                if (bulkRefTbls.Count > 0)
                    _unitofWork.eppBulkRefTblRepository.AddRange(bulkRefTbls);
                var id = _unitofWork.Complete().Result;
                return Ok($"Group No. {groupSetupModel.GrpNbr} saved successfully.");
            }catch( Exception ex)
            {
                throw ex;
            }
        }


        [NonAction]
        public  void AddFPPG(FPPG fppg, string productName, long grpId, List<EppBulkRefTbl> bulkRefTbls)
        {
            var prdid = Helper.GetProductIdbyName(productName, _unitofWork);
            // add Product code
            if (!string.IsNullOrEmpty(fppg.emp_ProductCode))
            {
                PlanCodeViewModel planCodeViewModel = new PlanCodeViewModel
                {
                    ProductCode = fppg.emp_ProductCode,
                    ProductId = prdid

                };
                fppg.emp_plan_cd = DataHelper.UpdatePlanCode(planCodeViewModel, _unitofWork).ProdctCdId.ToString();
            }

            if (!string.IsNullOrEmpty(fppg.sp_ProductCode))
            {
                PlanCodeViewModel planCodeViewModel = new PlanCodeViewModel
                {
                    ProductCode = fppg.sp_ProductCode,
                    ProductId = prdid

                };
                fppg.sp_plan_cd = DataHelper.UpdatePlanCode(planCodeViewModel, _unitofWork).ProdctCdId.ToString();
            }

            if (!string.IsNullOrEmpty(fppg.ch_ProductCode))
            {
                PlanCodeViewModel planCodeViewModel = new PlanCodeViewModel
                {
                    ProductCode = fppg.ch_ProductCode,
                    ProductId = prdid

                };
                fppg.ch_plan_cd = DataHelper.UpdatePlanCode(planCodeViewModel, _unitofWork).ProdctCdId.ToString();
            }

            AddGrpPrdBulkRef(fppg, bulkRefTbls, productName, grpId);           
        
        
        }

        [NonAction]
        public void AddACCHI(ACC_HI acchi, string productName, long grpId, List<EppBulkRefTbl> bulkRefTbls)
        {
             AddGrpPrdBulkRef(acchi, bulkRefTbls, productName, grpId);

        }

        [NonAction]
        public void AddER_CI(ER_CI  eR_CI, string productName, long grpId, List<EppBulkRefTbl> bulkRefTbls)
        {
            var prdid = Helper.GetProductIdbyName(productName, _unitofWork);
            // add Product code
            if (!string.IsNullOrEmpty(eR_CI.emp_ProductCode))
            {
                PlanCodeViewModel planCodeViewModel = new PlanCodeViewModel
                {
                    ProductCode = eR_CI.emp_ProductCode,
                    ProductId = prdid

                };
                eR_CI.emp_plan_cd = DataHelper.UpdatePlanCode(planCodeViewModel, _unitofWork).ProdctCdId.ToString();
            }
            if (!string.IsNullOrEmpty(eR_CI.sp_ProductCode))
            {
                PlanCodeViewModel planCodeViewModel = new PlanCodeViewModel
                {
                    ProductCode = eR_CI.sp_ProductCode,
                    ProductId = prdid

                };
                eR_CI.sp_plan_cd = DataHelper.UpdatePlanCode(planCodeViewModel, _unitofWork).ProdctCdId.ToString();
            }
            if (!string.IsNullOrEmpty(eR_CI.ch_ProductCode))
            {
                PlanCodeViewModel planCodeViewModel = new PlanCodeViewModel
                {
                    ProductCode = eR_CI.ch_ProductCode,
                    ProductId = prdid

                };
                eR_CI.ch_plan_cd = DataHelper.UpdatePlanCode(planCodeViewModel, _unitofWork).ProdctCdId.ToString();
            }

            AddGrpPrdBulkRef(eR_CI, bulkRefTbls, productName, grpId);
        }

        [NonAction]
        public void AddVOL_CI(VOL_CI  vOL_CI, string productName, long grpId, List<EppBulkRefTbl> bulkRefTbls)
        {
            var prdid = Helper.GetProductIdbyName(productName, _unitofWork);
            var grpprdId = Helper.GetRandomNumber();
            AddProductCodes(new ProductCodesViewModel
            {
                ProductCode =vOL_CI.emp_ProductCode,
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
            if (!string.IsNullOrEmpty(vOL_CI.emp_ProductCode))
            {
                PlanCodeViewModel planCodeViewModel = new PlanCodeViewModel
                {
                    ProductCode =vOL_CI.emp_ProductCode,
                    ProductId = prdid

                };
               vOL_CI.emp_plan_cd = DataHelper.UpdatePlanCode(planCodeViewModel, _unitofWork).ProdctCdId.ToString();
            }
            if (!string.IsNullOrEmpty(vOL_CI.sp_ProductCode))
            {
                PlanCodeViewModel planCodeViewModel = new PlanCodeViewModel
                {
                    ProductCode =vOL_CI.sp_ProductCode,
                    ProductId = prdid

                };
               vOL_CI.sp_plan_cd = DataHelper.UpdatePlanCode(planCodeViewModel, _unitofWork).ProdctCdId.ToString();
            }
            if (!string.IsNullOrEmpty(vOL_CI.ch_ProductCode))
            {
                PlanCodeViewModel planCodeViewModel = new PlanCodeViewModel
                {
                    ProductCode =vOL_CI.ch_ProductCode,
                    ProductId = prdid

                };
               vOL_CI.ch_plan_cd = DataHelper.UpdatePlanCode(planCodeViewModel, _unitofWork).ProdctCdId.ToString();
            }

            AddGrpPrdBulkRef(vOL_CI, bulkRefTbls, productName, grpId);

        }

        [NonAction]
        public void AddVGL(VGL  vGL, string productName, long grpId, List<EppBulkRefTbl> bulkRefTbls)
        {
          
            AddGrpPrdBulkRef(vGL, bulkRefTbls, productName, grpId);

        }

        [NonAction]
        public void AddBGL(BGL bGL, string productName, long grpId, List<EppBulkRefTbl> bulkRefTbls)
        {

            AddGrpPrdBulkRef(bGL, bulkRefTbls, productName, grpId);

        }
        [NonAction]
        public void AddFPPI(FPPI  fPPI, string productName, long grpId, List<EppBulkRefTbl> bulkRefTbls)
        {
            var prdid = Helper.GetProductIdbyName(productName, _unitofWork);
            if (!string.IsNullOrEmpty(fPPI.emp_ProductCode))
            {
                PlanCodeViewModel planCodeViewModel = new PlanCodeViewModel
                {
                    ProductCode = fPPI.emp_ProductCode,
                    ProductId = prdid

                };
                fPPI.emp_plan_cd = DataHelper.UpdatePlanCode(planCodeViewModel, _unitofWork).ProdctCdId.ToString();
            }
            if (!string.IsNullOrEmpty(fPPI.sp_ProductCode))
            {
                PlanCodeViewModel planCodeViewModel = new PlanCodeViewModel
                {
                    ProductCode = fPPI.sp_ProductCode,
                    ProductId = prdid

                };
                fPPI.sp_plan_cd = DataHelper.UpdatePlanCode(planCodeViewModel, _unitofWork).ProdctCdId.ToString();
            }
            if (!string.IsNullOrEmpty(fPPI.ch_ProductCode))
            {
                PlanCodeViewModel planCodeViewModel = new PlanCodeViewModel
                {
                    ProductCode = fPPI.ch_ProductCode,
                    ProductId = prdid

                };
                fPPI.ch_plan_cd = DataHelper.UpdatePlanCode(planCodeViewModel, _unitofWork).ProdctCdId.ToString();
            }

            AddGrpPrdBulkRef(fPPI, bulkRefTbls, productName, grpId);

        }
        [NonAction]
        public void AddHI(HI  hI, string productName, long grpId, List<EppBulkRefTbl> bulkRefTbls)
        {

            AddGrpPrdBulkRef(hI, bulkRefTbls, productName, grpId);

        }

        [NonAction]
        public void AddGrpPrdBulkRef<T>( T  product, List<EppBulkRefTbl> bulkRefTbls, string ProductName, long grpId)
        {
                 var prdid = Helper.GetProductIdbyName(ProductName, _unitofWork);
                var grpprdId = Helper.GetRandomNumber();

                _unitofWork.eppGrpprdctRepository.Add(new EppGrpprdct
                {
                    GrpprdctId = grpprdId,
                    GrpId = grpId,
                    ProductId = prdid,
                    CrtdBy = CrtdBy,
                    CrtdDt = CreatedDate
                });

                var bulkAttrs = Helper.GetProperties(product);
                AddEppBulkRefTblData(bulkAttrs, bulkRefTbls, grpprdId);        


        }


        [NonAction]
        private  void UpdateProductCode<T>( T product , PlanCodeViewModel planCodeViewModel)
        {
            var result = _unitofWork.eppProductCodesRepository.Find(x => x.ProductCode == planCodeViewModel.ProductCode && x.ProductId == planCodeViewModel.ProductId).Result.FirstOrDefault();
            if (result == null)
            {
                planCodeViewModel.ProdctCdId = Helper.GetRandomNumber();
                var data = new EppProductCodes
                {
                    ProdctCdId = planCodeViewModel.ProdctCdId,
                    ProductCode = planCodeViewModel.ProductCode,
                    ProductId = planCodeViewModel.ProductId,
                    CrtdBy = CrtdBy,
                    CrtdDt= CreatedDate
                    
                };
                _unitofWork.eppProductCodesRepository.Add(data);

            }
            else
            {
                planCodeViewModel.ProductId = result.ProductId;
            }
           
        }


        [Route("grpNbr/{grpNbr?}")]
        [HttpGet]
        public IActionResult EppGetGrpSetup( string grpNbr)
        {
            try
            {


                    GroupSetupModel groupSetupModel = new GroupSetupModel();
                    if (string.IsNullOrEmpty(grpNbr))
                    {
                        groupSetupModel.GrpPymn = 10007;
                        return Ok(groupSetupModel);
                    }

                var GrpMaster = _unitofWork.GroupMasterRepository.SingleOrDefault(x => x.GrpNbr == grpNbr).Result;
                if (GrpMaster != null)
                {

                    groupSetupModel.GrpId = GrpMaster.GrpId.ToString();
                    groupSetupModel.GrpNbr = GrpMaster.GrpNbr;
                    groupSetupModel.GrpNm = GrpMaster.GrpNm;
                    groupSetupModel.ActvFlg = GrpMaster.ActvFlg;
                    groupSetupModel.EnrlmntPrtnrsId = GrpMaster.EnrlmntPrtnrsId.ToString();
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
                    groupSetupModel.user_token = GrpMaster.UsrTkn;
                    groupSetupModel.case_token = GrpMaster.CaseTkn;
                    groupSetupModel.OccClass = GrpMaster.OccClass;


                    // Load Agent 
                    groupSetupModel.GrpAgents= GetAgents(GrpMaster.GrpId);


                    // Load Product Master
                    var Grpprdcts = _unitofWork.eppGrpprdctRepository.Find(x => x.GrpId == GrpMaster.GrpId).Result;
                    foreach (var prod in Grpprdcts)
                    {
                        
                        // load product  

                        var prodData = _unitofWork.EppProductRepository.SingleOrDefault(x => x.ProductId == prod.ProductId).Result;
                        switch (prodData.ProductNm)
                        {
                            case "FPPG":
                                {
                                    groupSetupModel.isFPPGActive = true;
                                    groupSetupModel.FPPG = new FPPG();
                                    GetProductValue(groupSetupModel.FPPG, prod.GrpprdctId);
                                  

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
                                    



                                }
                            case "ER_CI":
                                {
                                    groupSetupModel.isER_CIActive = true;
                                    groupSetupModel.ER_CI = new ER_CI();
                                    GetProductValue(groupSetupModel.ER_CI, prod.GrpprdctId);
                                   

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

                                  
                                    break;
                                }
                            case "BGL":
                                {
                                    groupSetupModel.isBGLActive = true;
                                    groupSetupModel.BGL = new BGL();
                                    GetProductValue(groupSetupModel.BGL, prod.GrpprdctId);
                                    
                                    
                                    break;
                                }
                            case "FPPI":
                                {

                                    groupSetupModel.isFPPIActive = true;
                                    groupSetupModel.FPPI = new FPPI();
                                    GetProductValue(groupSetupModel.FPPI, prod.GrpprdctId);

                                   

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
                        eppBulkRefTbl.CrtdBy = CrtdBy;
                        eppBulkRefTbl.CrtdDt = CreatedDate;
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



        [NonAction]
        private List<EppAgentsViewModel> GetAgents( long grpId)
        {
            List<EppAgentsViewModel> eppAgentsModels = new List<EppAgentsViewModel>();

            var agents= _unitofWork.eppAgentRepository.Find(x => x.GrpId == grpId).Result;
            foreach( var agent in agents)
            {
                eppAgentsModels.Add(new EppAgentsViewModel
                {   AgentId = agent.AgentId.ToString(),
                    AgntNbr = agent.AgntNbr,
                    AgntComsnSplt = agent.AgntComsnSplt.ToString(),
                    AgntNm = agent.AgntNm,
                    AgntSubCnt = agent.AgntSubCnt,
                    GrpId = agent.GrpId.ToString(),
                });
            }
            
            return eppAgentsModels;
        }
        [NonAction]
        private  void UpdateAgent(List<EppAgentsViewModel> eppAgentsModels, long grpId)
        {
            foreach (var eppAgent in eppAgentsModels)
            {
                decimal agntComsnSplt = 0;
                decimal.TryParse(eppAgent.AgntComsnSplt, out agntComsnSplt);
                if (string.IsNullOrEmpty(eppAgent.AgentId)) eppAgent.AgentId = "0";

                var data = _unitofWork.eppAgentRepository.Find(x => x.AgentId == long.Parse(eppAgent.AgentId)).Result.FirstOrDefault();
                if (data != null)
                {
                    data.AgntNm = eppAgent.AgntNm;
                    data.AgntNbr = eppAgent.AgntNbr;
                    data.AgntSubCnt = eppAgent.AgntSubCnt;
                    data.GrpId = grpId;
                    data.AgntComsnSplt = agntComsnSplt;
                    data.AgentId = long.Parse(eppAgent.AgentId);
                    data.LstUpdtBy = CrtdBy;
                    data.LstUpdtDt = DateTime.UtcNow;

                    _unitofWork.eppAgentRepository.Update(data);
                }
                else
                {
                    data = new EppAgents();
                   data.AgentId= Helper.GetRandomNumber();
                    data.AgntNm = eppAgent.AgntNm;
                    data.AgntNbr = eppAgent.AgntNbr;
                    data.AgntSubCnt = eppAgent.AgntSubCnt;
                    data.GrpId = grpId;
                    data.AgntComsnSplt = agntComsnSplt;
                    data.CrtdBy = CrtdBy;
                    data.CrtdDt = DateTime.UtcNow;
                    _unitofWork.eppAgentRepository.Add(data);
                }

            }
        }


  
    }
}
