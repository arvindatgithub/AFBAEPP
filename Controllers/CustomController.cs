using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AFBA.EPP.Helpers;
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

    }
}
