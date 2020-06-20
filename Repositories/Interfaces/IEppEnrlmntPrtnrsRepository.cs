using AFBA.EPP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AFBA.EPP.Repositories.Interfaces
{
    public interface IEppEnrlmntPrtnrsRepository : IRepository<EppEnrlmntPrtnrs>
    {
        public EppEnrlmntPrtnrs GetEnrlmntPrtnrId(string email);
      

    }
}
