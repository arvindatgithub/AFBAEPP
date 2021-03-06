﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AFBA.EPP.Helpers;
using AFBA.EPP.Models;
using AFBA.EPP.Repositories.Interfaces;
using AFBA.EPP.ViewModels;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace AFBA.EPP.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CustomController : ControllerBase
    {
        IUnitofWork _unitofWork;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly ILogger<LookupController> _logger;
        public CustomController(IWebHostEnvironment webHostEnvironment,ILogger<LookupController> logger, IUnitofWork unitofWork)
        {
            _logger = logger;
            _unitofWork = unitofWork;
            _webHostEnvironment = webHostEnvironment;
        }

        [Route("[action]")]
        [HttpGet]
        public IEnumerable<EppAttributeViewModel> GetQuetsionAttr()
        {
            return _unitofWork.eppAttributeRepository.GetQuetsionAttr().Select(d => new EppAttributeViewModel
            {

                AttrId = d.AttrId,
                DbAttrNm = d.DbAttrNm,
                DisplyAttrNm = d.DisplyAttrNm,


            }).ToList().OrderBy(x => x.DisplyAttrNm);
        }


        
        [Route("[action]")]
        [HttpPost]
        public IActionResult UpdateQuestionAttrs(GroupBlkQuestionAttrbs  groupBlkQuestionAttrbs)
        {
                     
            

           return Ok();
        }
        //groupNbr
        //GetEppQuestionAtrr


        [Route("[action]")]
        [HttpGet]
        public IEnumerable<EppAttributeViewModel> EppAttributes()
        {
            return _unitofWork.eppAttributeRepository.GetAll().Result.Select(d => new EppAttributeViewModel
            {
             
               AttrId= d.AttrId,
              DbAttrNm= d.DbAttrNm,
              DisplyAttrNm= d.DisplyAttrNm
              
            }).ToList().OrderBy(x=>x.DbAttrNm);
        }

        [Route("product/{product?}")]
        [HttpGet]
        public EppTemplateViewModel EppGetSelectedFields  (string product)
        {
            string filepath= _webHostEnvironment.WebRootPath;
            return   Helper.GetProductAvailableFields( filepath, _unitofWork, product);           
        }

        [Route("[action]")]
        [HttpGet]
        public IEnumerable<EppAttrFieldViewModel> EppGetTemplateFields()
        {
            return _unitofWork.eppAttributeRepository.GetAll().Result.Select(d => new EppAttrFieldViewModel
            {

                DbAttrNm = d.DbAttrNm,
                 RqdFlg = false,
            }).ToList().OrderBy(x => x.DbAttrNm);
        }


        [Route("Tobecloned/{grpNo}/productId/{productId}")]
        [HttpGet]
        public IActionResult Tobecloned(string grpNo, string productId)
        {
           
                var grpprdct = _unitofWork.eppGrpprdctRepository.GetEppGrpprdct(grpNo, productId);
                if (grpprdct == null) return NotFound("incorret group number  or product id ");
                EppTemplateViewModel lstEppTemplateViewModel = new EppTemplateViewModel
                {
                    AvailableList = new List<EppAttrFieldViewModel>(),
                    SelectedList = new List<EppAttrFieldViewModel>()
                };
                lstEppTemplateViewModel.AvailableList = Helper.EppGetAvailableFields(_unitofWork).ToList();
                lstEppTemplateViewModel.isEdit = false;

            lstEppTemplateViewModel.AvailableList = Helper.EppGetAvailableFields(_unitofWork).ToList();
            IList<EppAttrFieldViewModel> eppAttrFields = new List<EppAttrFieldViewModel>();
            if (grpprdct != null)
            {
                var eppPrdctattrbt = _unitofWork.eppPrdctattrbtRepository.ClonedEppPrdctattrbts(grpprdct.GrpprdctId);
                 foreach (var item in eppPrdctattrbt)
                {
                    var data = _unitofWork.eppAttributeRepository.Get(long.Parse(item.AttrId)).Result;
                    if (data != null)
                    {
                        lstEppTemplateViewModel.SelectedList.Add(new EppAttrFieldViewModel
                        {
                            AttrId = item.AttrId,
                            DisplyAttrNm = data.DisplyAttrNm,
                            DbAttrNm = data.DbAttrNm,
                            ClmnOrdr = item.ClmnOrdr,
                            RqdFlg = item.RqdFlg,
                       });
                    }
                }
                // removing the item from available list
                foreach (var item in lstEppTemplateViewModel.SelectedList)
                {
                    var isdata = lstEppTemplateViewModel.AvailableList.Where(x => x.DbAttrNm.Contains(item.DbAttrNm)).FirstOrDefault();
                    if (isdata != null)
                    {
                        lstEppTemplateViewModel.AvailableList.Remove(isdata);
                    }

                }
            }

            return Ok(lstEppTemplateViewModel);
        }
        [Route("grpNbr/{grpNbr}/productId/{productId}")]
        [HttpGet]
        public  IActionResult EppGetGrpPrdAttrbt(string grpNbr, string productId)
        {
            try
            {
                //var grpprdct = _unitofWork.eppGrpprdctRepository.GetEppGrpprdct(grpNbr, productId);

                var grpprdct = _unitofWork.eppGrpprdctRepository.Find(x => x.Grp.GrpNbr == grpNbr && x.ProductId == long.Parse(productId)).Result.FirstOrDefault();
                 if (grpprdct ==null) return NotFound("incorret group number  or product id ");
                

                EppTemplateViewModel lstEppTemplateViewModel = new EppTemplateViewModel
                {
                    AvailableList = new List<EppAttrFieldViewModel>(),
                    SelectedList = new List<EppAttrFieldViewModel>()
                };
                lstEppTemplateViewModel.isEdit = false;

                lstEppTemplateViewModel.AvailableList = Helper.EppGetAvailableFields(_unitofWork).ToList();
                IList<EppAttrFieldViewModel> eppAttrFields = new List<EppAttrFieldViewModel>();
                if (grpprdct != null)
                {
                    var eppPrdctattrbt = _unitofWork.eppPrdctattrbtRepository.GetEppPrdctattrbts(grpprdct.GrpprdctId);
                    if (eppPrdctattrbt.Count != 0)
                    { 
                        lstEppTemplateViewModel.isEdit = true;
                        lstEppTemplateViewModel.GrpprdctId = grpprdct.GrpprdctId;
                    }
                   
                    foreach (var item in eppPrdctattrbt)
                    {
                        var data = _unitofWork.eppAttributeRepository.Get(long.Parse(item.AttrId)).Result;
                        if (data != null)
                        {
                            lstEppTemplateViewModel.SelectedList.Add(new EppAttrFieldViewModel
                            {
                                 AttrId= item.AttrId,
                                DisplyAttrNm= data.DisplyAttrNm,
                                 DbAttrNm = data.DbAttrNm,
                                ClmnOrdr = item.ClmnOrdr,
                                RqdFlg = item.RqdFlg,
                                GrpprdctId = item.GrpprdctId,
                                PrdctAttrbtId = item.PrdctAttrbtId,

                            });
                        }
                    }
                    // removing the item from available list
                    foreach (var item in lstEppTemplateViewModel.SelectedList)
                    {
                        var isdata = lstEppTemplateViewModel.AvailableList.Where(x => x.DbAttrNm.Contains(item.DbAttrNm)).FirstOrDefault();
                        if (isdata != null)
                        {
                            lstEppTemplateViewModel.AvailableList.Remove(isdata);
                        }

                    }
                }


                
                return Ok(lstEppTemplateViewModel);
            }catch ( Exception ex)
            {
                throw ex;
            }
        }

       
        
        
        [Route("[action]")]
        [HttpPut]
        public IActionResult EppEditPrdctAttrbt(EppAddPrdAttrbt eppAddPrdAttrbt)
        {
            try
            {
                long  grpprdctId = long.Parse(eppAddPrdAttrbt.GrpprdctId); 
                List<EppPrdctattrbt> EppPrdctattrbts = new List<EppPrdctattrbt>();
                foreach (var item in eppAddPrdAttrbt.EppPrdAttrFields)
                {
                  
                   //var data = _unitofWork.eppAttributeRepository.GetAttrId(item.DbAttrNm);
                   // if (data != null)
                   // {

                        EppPrdctattrbts.Add(new EppPrdctattrbt
                        {
                            AttrId = long.Parse(item.AttrId),
                            GrpprdctId = grpprdctId,
                            ClmnOrdr = long.Parse(item.ClmnOrdr),
                            RqdFlg = item.RqdFlg == true ? 'Y' : 'N',
                            PrdctAttrbtId = long.Parse(item.PrdctAttrbtId),
                            CrtdBy = "",
                        });

                    //}
                }
               
                foreach (var data in EppPrdctattrbts)
                {
                    if (data.PrdctAttrbtId != 0)
                    {
                        var modifiabledata = _unitofWork.eppPrdctattrbtRepository.SingleOrDefault(x => x.PrdctAttrbtId == data.PrdctAttrbtId).Result;
                        if (modifiabledata != null)
                        {
                            modifiabledata.ClmnOrdr = data.ClmnOrdr;
                            modifiabledata.RqdFlg = data.RqdFlg;
                            modifiabledata.AttrId = data.AttrId;
                           _unitofWork.eppPrdctattrbtRepository.Update(modifiabledata);
                        }
                    }
                   
                    else
                    {
                        data.PrdctAttrbtId = Helper.GetRandomNumber();
                        _unitofWork.eppPrdctattrbtRepository.Add(data);
                    }
                   
                }
                 var result=   _unitofWork.Complete().Result;
                // deleted rows 
                List<EppPrdctattrbt> eppPrdctattrbts_1 = new List<EppPrdctattrbt>();
                var deletableDataList= _unitofWork.eppPrdctattrbtRepository.Find(x => x.GrpprdctId == grpprdctId).Result;
                    foreach( var data in deletableDataList)
                    {
                        var bfound = EppPrdctattrbts.Find(x => x.PrdctAttrbtId == data.PrdctAttrbtId);
                        if (bfound==null)
                        {
                                eppPrdctattrbts_1.Add(data);
                          // _unitofWork.eppPrdctattrbtRepository.Remove(data);
                        }
                    }

                if (eppPrdctattrbts_1.Count > 0)
                {
                    _unitofWork.eppPrdctattrbtRepository.RemoveRange(eppPrdctattrbts_1);
                    var id = _unitofWork.Complete().Result;
                }



                return Ok("Custom layout template updated successfully!");
            } catch( Exception ex)
            {
                throw ex;
            }
        }

            
       

        [Route("[action]")]
        [HttpPost]
        public IActionResult EppAddPrdctAttrbt(EppAddPrdAttrbt eppAddPrdAttrbt)
        {
            try
            {
                var grpprdct = _unitofWork.eppGrpprdctRepository.GetEppGrpprdct(eppAddPrdAttrbt.GrpNbr, eppAddPrdAttrbt.ProductId);
                if (grpprdct == null) return NotFound("Either  Group no and product is not available  ");
                // 
                var eppPrdctattrbt = _unitofWork.eppPrdctattrbtRepository.Find(x => x.GrpprdctId == grpprdct.GrpprdctId).Result;
                if (eppPrdctattrbt.Count == 0)
                {

                    List<EppPrdctattrbt> EppPrdctattrbts = new List<EppPrdctattrbt>();
                    foreach (var item in eppAddPrdAttrbt.EppPrdAttrFields)
                    {

                        var data = _unitofWork.eppAttributeRepository.GetAttrId(item.DbAttrNm);
                        if (data != null)
                        {
                            var prdctAttrbtId = Helper.GetRandomNumber();
                            EppPrdctattrbts.Add(new EppPrdctattrbt
                            {   
                                PrdctAttrbtId= prdctAttrbtId,
                                AttrId = data.AttrId,
                                GrpprdctId = grpprdct.GrpprdctId,
                                ClmnOrdr = long.Parse(item.ClmnOrdr),
                                RqdFlg = item.RqdFlg == true ? 'Y' : 'N',
                                CrtdBy = "",
                            });

                        }


                    }
                    _unitofWork.eppPrdctattrbtRepository.AddRange(EppPrdctattrbts);

                }

                var id = _unitofWork.Complete().Result;


                return Ok(id);
            }
            catch (Exception ex)
            {
                throw (ex);

            }
        }


    }
}
