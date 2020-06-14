using AFBA.EPP.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace AFBA.EPP.Repositories
{
    public class EPPRepository<TEntity> : IRepository<TEntity>
        where TEntity: class
      
    {
        private readonly DbSet<TEntity> _entities;

        public EPPRepository(DbContext context)
        {
            _entities = context.Set<TEntity>();
        }
        public async Task<List<TEntity>> GetAll()
        {
            return await _entities.ToListAsync();
        }

        public async Task<TEntity> Get(int id)
        {
            return await _entities.FindAsync(id);
        }
        public async Task<List<TEntity>> Find(Expression<Func<TEntity, bool>> predicate)
        {
            return await _entities.Where(predicate).AsNoTracking<TEntity>().ToListAsync();
        }

        public async Task<TEntity> SingleOrDefault(Expression<Func<TEntity, bool>> predicate)
        {
            return await _entities.SingleOrDefaultAsync(predicate);
        }
    }
}
