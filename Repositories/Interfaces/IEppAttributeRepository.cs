using AFBA.EPP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AFBA.EPP.Repositories.Interfaces
{
    public interface IEppAttributeRepository : IRepository<EppAttribute>
    {
        public EppAttribute GetAttrId(string DbAttrNm);

        public IEnumerable<EppAttribute> GetQuetsionAttr();
       

    }
}
