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
        public IEppEnrlmntPrtnrsRepository eppEnrlmntPrtnrsRepository { get; }
        //public IEppAcctMgrCntctsRepository   eppAcctMgrCntctsRepository { get; }
        public IEppGrpprdctRepository eppGrpprdctRepository { get; }
        public IEppProductCodesRepository eppProductCodesRepository { get; }
        public IEppPrdctattrbtRepository eppPrdctattrbtRepository { get; }
        public IEppBulkRefTblRepository eppBulkRefTblRepository { get; }
        public IEppErrorMessageRepository eppErrorMessageRepository { get; }
        public IEppErrorDtlRepository eppErrorDtlRepository { get; }
        public IEppAgentRepository eppAgentRepository { get; }
        void RejectChanges();
        Task< int> Complete();
    }
}
