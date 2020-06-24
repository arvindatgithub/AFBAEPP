using AFBA.EPP.Models;
using AFBA.EPP.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AFBA.EPP.Repositories.Interfaces
{
    public interface IEppPrdctattrbtRepository: IRepository<EppPrdctattrbt>
    {

        public IList<EppAttrFieldViewModel> GetEppPrdctattrbts(long GrpprdctId);
    }
}
