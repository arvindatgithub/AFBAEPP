using AFBA.EPP.Models;
using AFBA.EPP.Repositories.Interfaces;
using AFBA.EPP.ViewModels;
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
            return _dbContext.EppPrdctattrbt.Where(x => x.GrpprdctId == GrpprdctId).Select(x =>
            new EppAttrFieldViewModel
            {
                PrdctAttrbtId = x.PrdctAttrbtId,
                AttrId = x.AttrId,
                DbAttrNm= x.Attr.DbAttrNm,
                ClmnOrdr= x.ClmnOrdr,
                DisplyAttrNm= x.Attr.DisplyAttrNm,
               GrpprdctId= x.GrpprdctId
               

           

            }

            ).ToList().OrderBy(x => x.ClmnOrdr);

            //return _dbContext.EppPrdctattrbt.Where(x => x.GrpprdctId == GrpprdctId).OrderBy(x=>x.ClmnOrdr).
            //  ToList();
        }

      
    }

}
