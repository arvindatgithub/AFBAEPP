using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
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

        [Route("grpNbr/{grpNbr?}")]
        [HttpGet]
        public IActionResult EppGetGrpSetup( string grpNbr)
        {
            GroupSetupModel groupSetupModel = new GroupSetupModel();
            var GrpMaster = _unitofWork.GroupMasterRepository.SingleOrDefault(x => x.GrpNbr == grpNbr).Result ;
           if(GrpMaster != null)
            {
              
                groupSetupModel.GrpId = GrpMaster.GrpId;
                groupSetupModel.GrpNbr = GrpMaster.GrpNbr;
                groupSetupModel.GrpNm = GrpMaster.GrpNm;
                groupSetupModel.ActvFlg = GrpMaster.ActvFlg;
              var enrlPartner=  _unitofWork.eppEnrlmntPrtnrsRepository.SingleOrDefault(x => x.EnrlmntPrtnrsId == GrpMaster.EnrlmntPrtnrsId).Result;
                if (enrlPartner != null)
                {
                    groupSetupModel.EmlAddrss = enrlPartner.EmlAddrss;
                    groupSetupModel.EnrlmntPrtnrsNm = enrlPartner.EnrlmntPrtnrsNm;
                }
                               
                groupSetupModel.GrpEfftvDt = GrpMaster.GrpEfftvDt;
                groupSetupModel.GrpPymn = groupSetupModel.GrpPymn;
                groupSetupModel.GrpSitusSt = groupSetupModel.GrpSitusSt;
                groupSetupModel.OccClass = groupSetupModel.OccClass;

                // Load Product Master

                var Grpprdcts = _unitofWork.eppGrpprdctRepository.Find(x => x.GrpId == groupSetupModel.GrpId).Result;
                foreach( var prod in Grpprdcts)
                {
                    var venderData = _unitofWork.eppAcctMgrCntctsRepository.SingleOrDefault(x => x.GrpprdctId == prod.GrpprdctId).Result;
                    if (venderData != null)
                    {
                        groupSetupModel.EmailAddress = venderData.EmailAddress;
                        groupSetupModel.AcctMgrNm = venderData.AcctMgrNm;
                    }
                    // load product  

                    var prodData = _unitofWork.EppProductRepository.SingleOrDefault(x => x.ProductId == prod.ProductId).Result;
                    switch (prodData.ProductNm)
                    {
                        case "FPPG":
                            {
                                groupSetupModel.isFPPGActive =  true;
                                LoadProductBulkRefData(prod.GrpprdctId);
                                var blkDatas = _unitofWork.eppBulkRefTblRepository.Find(x => x.GrpprdctId == prod.GrpprdctId).Result;
                                groupSetupModel.FPPG = new FPPG();
                                Type typeInfo = groupSetupModel.FPPG.GetType();
                                PropertyInfo[] props = typeInfo.GetProperties();
                                foreach ( var blk in blkDatas)
                                {
                                    var eppAttrs = _unitofWork.eppAttributeRepository.SingleOrDefault(x => x.AttrId == blk.AttrId).Result;
                                    var  propName = props.Where(x => x.Name == eppAttrs.DbAttrNm).Select( x=> new  { x.Name, x.PropertyType}).FirstOrDefault();
                                    if (propName != null)
                                    {                                      
                                        typeInfo.GetProperty(propName.Name).SetValue(groupSetupModel.FPPG, Convert.ChangeType(blk.Value, propName.PropertyType), null);

                                        var actionPropName = propName.Name + "_action";
                                        var isActionAvail = props.Where(x => x.Name == actionPropName).Select(x=>x.Name).FirstOrDefault();
                                        if (isActionAvail != null)
                                        {
                                            typeInfo.GetProperty(actionPropName).SetValue(groupSetupModel.FPPG, Convert.ChangeType(blk.ActionId, propName.PropertyType), null);
                                        }
                                   
                                    }
                                }                              
                                break;
                            }
                        case "ACC_HI":
                            {
                                groupSetupModel.isACC_HIActive = true;
                                LoadProductBulkRefData(prod.GrpprdctId);
                                var blkDatas = _unitofWork.eppBulkRefTblRepository.Find(x => x.GrpprdctId == prod.GrpprdctId).Result;
                                groupSetupModel.ACC_HI = new ACC_HI();
                                Type typeInfo = groupSetupModel.ACC_HI.GetType();
                                PropertyInfo[] props = typeInfo.GetProperties();
                                foreach (var blk in blkDatas)
                                {
                                    var eppAttrs = _unitofWork.eppAttributeRepository.SingleOrDefault(x => x.AttrId == blk.AttrId).Result;
                                    var propName = props.Where(x => x.Name == eppAttrs.DbAttrNm).Select(x => new { x.Name, x.PropertyType }).FirstOrDefault();
                                    if (propName != null)
                                    {
                                        typeInfo.GetProperty(propName.Name).SetValue(groupSetupModel.ACC_HI, Convert.ChangeType(blk.Value, propName.PropertyType), null);

                                        var actionPropName = propName.Name + "_action";
                                        var isActionAvail = props.Where(x => x.Name == actionPropName).Select(x => x.Name).FirstOrDefault();
                                        if (isActionAvail != null)
                                        {
                                            typeInfo.GetProperty(actionPropName).SetValue(groupSetupModel.ACC_HI, Convert.ChangeType(blk.ActionId, propName.PropertyType), null);
                                        }

                                    }
                                }
                                break;
                            }
                        case "ER_CI":
                            {
                                groupSetupModel.isER_CIActive = true;
                                LoadProductBulkRefData(prod.GrpprdctId);
                                var blkDatas = _unitofWork.eppBulkRefTblRepository.Find(x => x.GrpprdctId == prod.GrpprdctId).Result;
                                groupSetupModel.ER_CI = new ER_CI();
                                Type typeInfo = groupSetupModel.ER_CI.GetType();
                                PropertyInfo[] props = typeInfo.GetProperties();
                                foreach (var blk in blkDatas)
                                {
                                    var eppAttrs = _unitofWork.eppAttributeRepository.SingleOrDefault(x => x.AttrId == blk.AttrId).Result;
                                    var propName = props.Where(x => x.Name == eppAttrs.DbAttrNm).Select(x => new { x.Name, x.PropertyType }).FirstOrDefault();
                                    if (propName != null)
                                    {
                                        typeInfo.GetProperty(propName.Name).SetValue(groupSetupModel.ER_CI, Convert.ChangeType(blk.Value, propName.PropertyType), null);

                                        var actionPropName = propName.Name + "_action";
                                        var isActionAvail = props.Where(x => x.Name == actionPropName).Select(x => x.Name).FirstOrDefault();
                                        if (isActionAvail != null)
                                        {
                                            typeInfo.GetProperty(actionPropName).SetValue(groupSetupModel.ER_CI, Convert.ChangeType(blk.ActionId, propName.PropertyType), null);
                                        }

                                    }
                                }
                                break;
                            }
                        case "VOL_CI":
                            {
                                groupSetupModel.isVOL_CIActive = true;
                                LoadProductBulkRefData(prod.GrpprdctId);
                                var blkDatas = _unitofWork.eppBulkRefTblRepository.Find(x => x.GrpprdctId == prod.GrpprdctId).Result;
                                groupSetupModel.VOL_CI = new VOL_CI();
                                Type typeInfo = groupSetupModel.VOL_CI.GetType();
                                PropertyInfo[] props = typeInfo.GetProperties();
                                foreach (var blk in blkDatas)
                                {
                                    var eppAttrs = _unitofWork.eppAttributeRepository.SingleOrDefault(x => x.AttrId == blk.AttrId).Result;
                                    var propName = props.Where(x => x.Name == eppAttrs.DbAttrNm).Select(x => new { x.Name, x.PropertyType }).FirstOrDefault();
                                    if (propName != null)
                                    {
                                        typeInfo.GetProperty(propName.Name).SetValue(groupSetupModel.VOL_CI, Convert.ChangeType(blk.Value, propName.PropertyType), null);

                                        var actionPropName = propName.Name + "_action";
                                        var isActionAvail = props.Where(x => x.Name == actionPropName).Select(x => x.Name).FirstOrDefault();
                                        if (isActionAvail != null)
                                        {
                                            typeInfo.GetProperty(actionPropName).SetValue(groupSetupModel.FPPG, Convert.ChangeType(blk.ActionId, propName.PropertyType), null);
                                        }

                                    }
                                }
                                break;
                            }
                        case "VGL":
                            {
                                groupSetupModel.isVGLActive = true;
                                LoadProductBulkRefData(prod.GrpprdctId);
                                var blkDatas = _unitofWork.eppBulkRefTblRepository.Find(x => x.GrpprdctId == prod.GrpprdctId).Result;
                                groupSetupModel.VGL = new VGL();
                                Type typeInfo = groupSetupModel.VGL.GetType();
                                PropertyInfo[] props = typeInfo.GetProperties();
                                foreach (var blk in blkDatas)
                                {
                                    var eppAttrs = _unitofWork.eppAttributeRepository.SingleOrDefault(x => x.AttrId == blk.AttrId).Result;
                                    var propName = props.Where(x => x.Name == eppAttrs.DbAttrNm).Select(x => new { x.Name, x.PropertyType }).FirstOrDefault();
                                    if (propName != null)
                                    {
                                        typeInfo.GetProperty(propName.Name).SetValue(groupSetupModel.VGL, Convert.ChangeType(blk.Value, propName.PropertyType), null);

                                        var actionPropName = propName.Name + "_action";
                                        var isActionAvail = props.Where(x => x.Name == actionPropName).Select(x => x.Name).FirstOrDefault();
                                        if (isActionAvail != null)
                                        {
                                            typeInfo.GetProperty(actionPropName).SetValue(groupSetupModel.VGL, Convert.ChangeType(blk.ActionId, propName.PropertyType), null);
                                        }

                                    }
                                }
                                    break;
                            }
                        case "BGL":
                            {
                                groupSetupModel.isBGLActive = true;
                                LoadProductBulkRefData(prod.GrpprdctId);
                                var blkDatas = _unitofWork.eppBulkRefTblRepository.Find(x => x.GrpprdctId == prod.GrpprdctId).Result;
                                groupSetupModel.BGL = new BGL();
                                Type typeInfo = groupSetupModel.BGL.GetType();
                                PropertyInfo[] props = typeInfo.GetProperties();
                                foreach (var blk in blkDatas)
                                {
                                    var eppAttrs = _unitofWork.eppAttributeRepository.SingleOrDefault(x => x.AttrId == blk.AttrId).Result;
                                    var propName = props.Where(x => x.Name == eppAttrs.DbAttrNm).Select(x => new { x.Name, x.PropertyType }).FirstOrDefault();
                                    if (propName != null)
                                    {
                                        typeInfo.GetProperty(propName.Name).SetValue(groupSetupModel.BGL, Convert.ChangeType(blk.Value, propName.PropertyType), null);

                                        var actionPropName = propName.Name + "_action";
                                        var isActionAvail = props.Where(x => x.Name == actionPropName).Select(x => x.Name).FirstOrDefault();
                                        if (isActionAvail != null)
                                        {
                                            typeInfo.GetProperty(actionPropName).SetValue(groupSetupModel.BGL, Convert.ChangeType(blk.ActionId, propName.PropertyType), null);
                                        }

                                    }
                                }
                                break;
                            }
                        case "FPPI":
                            {

                                groupSetupModel.isFPPIActive = true;
                                LoadProductBulkRefData(prod.GrpprdctId);
                                var blkDatas = _unitofWork.eppBulkRefTblRepository.Find(x => x.GrpprdctId == prod.GrpprdctId).Result;
                                groupSetupModel.FPPI = new FPPI();
                                Type typeInfo = groupSetupModel.FPPI.GetType();
                                PropertyInfo[] props = typeInfo.GetProperties();
                                foreach (var blk in blkDatas)
                                {
                                    var eppAttrs = _unitofWork.eppAttributeRepository.SingleOrDefault(x => x.AttrId == blk.AttrId).Result;
                                    var propName = props.Where(x => x.Name == eppAttrs.DbAttrNm).Select(x => new { x.Name, x.PropertyType }).FirstOrDefault();
                                    if (propName != null)
                                    {
                                        typeInfo.GetProperty(propName.Name).SetValue(groupSetupModel.FPPI, Convert.ChangeType(blk.Value, propName.PropertyType), null);

                                        var actionPropName = propName.Name + "_action";
                                        var isActionAvail = props.Where(x => x.Name == actionPropName).Select(x => x.Name).FirstOrDefault();
                                        if (isActionAvail != null)
                                        {
                                            typeInfo.GetProperty(actionPropName).SetValue(groupSetupModel.FPPI, Convert.ChangeType(blk.ActionId, propName.PropertyType), null);
                                        }

                                    }
                                }
                                break;
                            }
                    }
                        
                }



            }

            return Ok(groupSetupModel);
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


        [NonAction]

        private void LoadProductBulkRefData(long GrpprdctId)
        {
           var blkData= _unitofWork.eppBulkRefTblRepository.Find(x => x.GrpprdctId == GrpprdctId).Result;
        }

    }
}
