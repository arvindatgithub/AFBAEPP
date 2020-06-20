using AFBA.EPP.Models;
using AFBA.EPP.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AFBA.EPP.Repositories
{
 

    public class EppAcctMgrCntctsRepository : EPPRepository<EppAcctMgrCntcts>, IEppAcctMgrCntctsRepository
    {
        private readonly EppAppDbContext _dbContext;
        public EppAcctMgrCntctsRepository(EppAppDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public EppAcctMgrCntcts GetEppAcctMgrId(string EmailAddress)
        {
            return _dbContext.EppAcctMgrCntcts.Where(x => x.EmailAddress.Contains(EmailAddress)).FirstOrDefault();
        }
    }
}
