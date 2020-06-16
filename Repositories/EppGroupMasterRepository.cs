using AFBA.EPP.Models;
using AFBA.EPP.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AFBA.EPP.Repositories
{
      public class EppGroupMasterRepository : EPPRepository<EppGrpmstr>, IEppGroupMasterRepository
    {
        private readonly EppAppDbContext _dbContext;
        public EppGroupMasterRepository(EppAppDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }
    }
}
