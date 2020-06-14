using AFBA.EPP.Models;
using AFBA.EPP.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AFBA.EPP.Repositories
{
    public class UnitofWork : IUnitofWork
    {
        private readonly EppAppDbContext _dbContext;

        public UnitofWork(EppAppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEppActionRepository EppActions => new EppActionRepository(_dbContext);

        public async Task<int> Complete()
        {
            return await _dbContext.SaveChangesAsync();
        }

        public void Dispose()
        {
            _dbContext.Dispose();
        }

       
        
    }
}
