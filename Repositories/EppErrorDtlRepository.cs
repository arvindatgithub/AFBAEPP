using AFBA.EPP.Models;
using AFBA.EPP.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AFBA.EPP.Repositories
{
    public class EppErrorDtlRepository : EPPRepository<EppErrorDtl>, IEppErrorDtlRepository
    {
        private readonly EppAppDbContext _dbContext;
        public EppErrorDtlRepository(EppAppDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }
    }
}
