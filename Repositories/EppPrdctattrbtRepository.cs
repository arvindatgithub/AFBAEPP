using AFBA.EPP.Models;
using AFBA.EPP.Repositories.Interfaces;
using AFBA.EPP.ViewModels;
using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace AFBA.EPP.Repositories
{
    public class EppPrdctattrbtRepository : EPPRepository<EppPrdctattrbt>, IEppPrdctattrbtRepository
    {
        private readonly EppAppDbContext _dbContext;
        public EppPrdctattrbtRepository(EppAppDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public IList<EppAttrFieldViewModel> GetEppPrdctattrbts(long GrpprdctId)
        {
            var result = _dbContext.EppPrdctattrbt.Where(x => x.GrpprdctId == GrpprdctId).Select(x =>
             new EppAttrFieldViewModel
             {
                 PrdctAttrbtId = x.PrdctAttrbtId.ToString(),
                 AttrId = x.AttrId.ToString(),
                 DbAttrNm = x.Attr.DbAttrNm,
                 ClmnOrdr = x.ClmnOrdr.ToString(),
                 DisplyAttrNm = x.Attr.DisplyAttrNm,
                 GrpprdctId = x.GrpprdctId.ToString(),
                 RqdFlg = x.RqdFlg == 'N' ? false : true
             }).OrderBy( x=> x.ClmnOrdr);

            return result.ToList();
        }


        public IList<EppAttrFieldViewModel> ClonedEppPrdctattrbts(long GrpprdctId)
        {
            var result = _dbContext.EppPrdctattrbt.Where(x => x.GrpprdctId == GrpprdctId).Select(x =>
             new EppAttrFieldViewModel
             {
                  AttrId =  x.AttrId.ToString(),
                 DbAttrNm = x.Attr.DbAttrNm,
                 ClmnOrdr =  x.ClmnOrdr.ToString(),
                 DisplyAttrNm = x.Attr.DisplyAttrNm,
                 RqdFlg = x.RqdFlg == 'N' ? false : true
             }).OrderBy(x => x.ClmnOrdr);

            return result.ToList();
        }


    }

}
