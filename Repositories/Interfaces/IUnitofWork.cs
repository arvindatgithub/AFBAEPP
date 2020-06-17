using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AFBA.EPP.Repositories.Interfaces
{
    public interface IUnitofWork: IDisposable
    {
     
       public IEppActionRepository EppActionsRepository { get; }
        public IEppProductRepository EppProductRepository { get; }
        public IGeppGrppymntmdRepository GeppGrppymntmdRepository { get; }
        public IEppGroupMasterRepository GroupMasterRepository { get; }
        public IEppAttributeRepository eppAttributeRepository { get; }
        Task< int> Complete();
    }
}
