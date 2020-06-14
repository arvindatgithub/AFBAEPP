using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AFBA.EPP.Repositories.Interfaces
{
    public interface IUnitofWork: IDisposable
    {
       public IEppActionRepository EppActions { get; }
      Task< int> Complete();
    }
}
