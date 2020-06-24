using AFBA.EPP.Models;
using AFBA.EPP.Repositories.Interfaces;
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

        public IList<EppPrdctattrbt> GetEppPrdctattrbts(long GrpprdctId)
        {
            return _dbContext.EppPrdctattrbt.Where(x => x.GrpprdctId == GrpprdctId).OrderBy(x=>x.ClmnOrdr).
              ToList();
        }

      
    }

}
