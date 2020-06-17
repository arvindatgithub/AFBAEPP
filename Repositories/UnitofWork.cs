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
        public IEppActionRepository EppActionsRepository => new EppActionRepository(_dbContext);

        public IEppProductRepository EppProductRepository => new EppProductRepository(_dbContext);

        public IGeppGrppymntmdRepository GeppGrppymntmdRepository => new GeppGrppymntmdRepository(_dbContext);

        public IEppGroupMasterRepository GroupMasterRepository => new EppGroupMasterRepository(_dbContext);

        public IEppAttributeRepository eppAttributeRepository => new EppAttributeRepository(_dbContext);

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
