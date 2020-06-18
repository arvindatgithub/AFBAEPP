using AFBA.EPP.Models;
using AFBA.EPP.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AFBA.EPP.Repositories
{
    public class EppEnrlmntPrtnrsRepository : EPPRepository<EppEnrlmntPrtnrs>, IEppEnrlmntPrtnrsRepository
    {
        private readonly EppAppDbContext _dbContext;
        public EppEnrlmntPrtnrsRepository(EppAppDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }
    }
}
