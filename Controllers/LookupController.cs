using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AFBA.EPP.Models;
using AFBA.EPP.Repositories;
using AFBA.EPP.Repositories.Interfaces;
using AFBA.EPP.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace AFBA.EPP.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LookupController {
        IUnitofWork _unitofWork;
        private readonly ILogger<LookupController> _logger;
       public LookupController(ILogger<LookupController> logger, IUnitofWork unitofWork)
        {
            _logger = logger;
            _unitofWork = unitofWork;
        }
        [Route("[action]")]
        [HttpGet]
        public IEnumerable<EppActionViewModel> EppAction()
        {
         return  _unitofWork.EppActionsRepository.GetAll().Result.Select(d => new EppActionViewModel
            {
                ActionId = d.ActionId,
                Name = d.Name
            }).ToList();       
         }


        [Route("[action]")]
        [HttpGet]
        public IEnumerable<EppProductViewModel> EppProducts()
        {
            return _unitofWork.EppProductRepository.GetAll().Result.Select(d => new EppProductViewModel
            {
               ProductId= d.ProductId,
                ProductNm= d.ProductNm
            }).ToList();
        }

        [Route("[action]")]
        [HttpGet]
        public IEnumerable<GrppymntmdViewModel> GroupPaymentMethod()
        {
            return _unitofWork.GeppGrppymntmdRepository.GetAll().Result.Select(d => new GrppymntmdViewModel
            {
                GrpPymn = d.GrpPymnId,
                GrpPymntMdCd = d.GrpPymntMdCd,
                GrpPymntMdNm = d.GrpPymntMdCd + " - " +d.GrpPymntMdNm
            }).ToList();
        }


        [Route("[action]")]
        [HttpGet]
        public LookupDictionaryViewModel LookupsData()
        {
            return new LookupDictionaryViewModel();
        }
    }
}
