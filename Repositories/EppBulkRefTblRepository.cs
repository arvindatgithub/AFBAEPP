using AFBA.EPP.Models;
using AFBA.EPP.Repositories.Interfaces;
using AFBA.EPP.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace AFBA.EPP.Repositories
{
    public class EppBulkRefTblRepository : EPPRepository<EppBulkRefTbl>, IEppBulkRefTblRepository
    {
        private readonly EppAppDbContext _dbContext;
        public EppBulkRefTblRepository(EppAppDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<EppQueAtrrViewModel> GetEppQuestionAtrr(string groupNo, long productId)
        {
            var result = _dbContext.EppBulkRefTbl.Where( x=> x.Grpprdct.Grp.GrpNbr== groupNo &&  x.Grpprdct.ProductId== productId  && x.Attr.IsQstnAttrbt=='Y').Select(
            data=> new EppQueAtrrViewModel {
             AttrId= data.AttrId,
            BulkId= data.BulkId,
            DbAttrNm=data.Attr.DbAttrNm,
            DisplyAttrNm=data.Attr.DisplyAttrNm,
            GrpNbr = data.Grpprdct.Grp.GrpNbr,
            GrpprdctId= data.GrpprdctId,
             ProductId=data.Grpprdct.ProductId,
              Value= data.Value,
            } );

            return result;
        }
    }
}
