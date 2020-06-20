using System;
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

        [Route("grpNbr/{grpNbr}/productNm/{productNm}")]
        [HttpGet]
        public  IActionResult EppGetGrpPrdAttrbt(string grpNbr, string productNm)
        {
           var grpprdct = _unitofWork.eppGrpprdctRepository.GetEppGrpprdct(grpNbr, productNm);
            if (grpprdct == null) return NotFound("Not available");
            // 
            var eppPrdctattrbt = _unitofWork.eppPrdctattrbtRepository.GetEppPrdctattrbts(grpprdct.GrpprdctId);
            if (eppPrdctattrbt == null) return NotFound("Not available");
            //Get  the data

            EppTemplateViewModel lstEppTemplateViewModel = new EppTemplateViewModel
            {
                AvailableList = new List<EppAttrFieldViewModel>(),
                SelectedList = new List<EppAttrFieldViewModel>()
            };
            IList<EppAttrFieldViewModel> eppAttrFields = new List<EppAttrFieldViewModel>();

             foreach( var item in eppPrdctattrbt)
            {
                var data = _unitofWork.eppAttributeRepository.Get(item.AttrId).Result;
                if (data != null)
                {
                    lstEppTemplateViewModel.SelectedList.Add(new EppAttrFieldViewModel
                    {
                        DbAttrNm = data.DbAttrNm,
                        ClmnOrdr = item.ClmnOrdr,
                        RqdFlg = item.RqdFlg == 'Y' ? true : false,
                        GrpprdctId= item.GrpprdctId

    });
                }
            }
             // removing the item from available list
            foreach (var item in lstEppTemplateViewModel.SelectedList)
            {
                lstEppTemplateViewModel.AvailableList.Remove(lstEppTemplateViewModel.AvailableList.FirstOrDefault(x => x.DbAttrNm.Contains(item.DbAttrNm)));
            }
            return Ok(lstEppTemplateViewModel);
        }

        [Route("[action]")]
        [HttpPut]
        public IActionResult EppEditPrdctAttrbt(EppAddPrdAttrbt eppAddPrdAttrbt)
        {

            List<EppPrdctattrbt> EppPrdctattrbts = new List<EppPrdctattrbt>();
            foreach (var item in eppAddPrdAttrbt.EppPrdAttrFields)
            {

                var data = _unitofWork.eppAttributeRepository.GetAttrId(item.DbAttrNm);
                if (data != null)
                {
                    EppPrdctattrbts.Add(new EppPrdctattrbt
                    {
                        AttrId = data.AttrId,
                        GrpprdctId = item.GrpprdctId,
                        ClmnOrdr = item.ClmnOrdr,
                        RqdFlg = item.RqdFlg == true ? 'Y' : 'N',
                        PrdctAttrbtId= item.PrdctAttrbtId
                    });

                }
            }

            foreach (var data in EppPrdctattrbts)
            {
                var k = _unitofWork.eppPrdctattrbtRepository.Find(x => x.PrdctAttrbtId == data.PrdctAttrbtId).Result.FirstOrDefault();
                if (k != null)
                {
                    k = data;
                }
                else
                {
                    _unitofWork.eppPrdctattrbtRepository.Add(data);
                }
           var id=     _unitofWork.Complete().Result;
            }

            return Ok();
        }

            
       

        [Route("[action]")]
        [HttpPost]
        public IActionResult EppAddPrdctAttrbt(EppAddPrdAttrbt eppAddPrdAttrbt)
        {
            var grpprdct = _unitofWork.eppGrpprdctRepository.GetEppGrpprdct(eppAddPrdAttrbt.GrpNbr, eppAddPrdAttrbt.ProductNm);
            if (grpprdct == null) return NotFound("Not available");
            // 
            var eppPrdctattrbt = _unitofWork.eppPrdctattrbtRepository.Find(x=> x.GrpprdctId== grpprdct.GrpprdctId).Result;
            if (eppPrdctattrbt == null) {

                List<EppPrdctattrbt> EppPrdctattrbts = new List<EppPrdctattrbt>();
                foreach ( var item in eppAddPrdAttrbt.EppPrdAttrFields)
                {
                  
                    var data = _unitofWork.eppAttributeRepository.GetAttrId( item.DbAttrNm);
                    if(data != null)
                    {
                        EppPrdctattrbts.Add(new EppPrdctattrbt {
                        AttrId= data.AttrId,
                       GrpprdctId = grpprdct.GrpprdctId,
                       ClmnOrdr = item.ClmnOrdr,
                        RqdFlg = item.RqdFlg == true ? 'Y' : 'N',
                        });
                       
                    }


                }
                _unitofWork.eppPrdctattrbtRepository.AddRange(EppPrdctattrbts);
           
            }

           var  id= _unitofWork.Complete().Result;


            return Ok(id);
        }


    }
}
