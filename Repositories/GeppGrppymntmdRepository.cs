using AFBA.EPP.Models;
using AFBA.EPP.Repositories.Interfaces;


namespace AFBA.EPP.Repositories
{

    public class GeppGrppymntmdRepository : EPPRepository<GeppGrppymntmd>, IGeppGrppymntmdRepository
    {
        private readonly EppAppDbContext _dbContext;
        public GeppGrppymntmdRepository(EppAppDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }
    }

  
}
