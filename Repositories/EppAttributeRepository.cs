﻿using AFBA.EPP.Models;
using AFBA.EPP.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AFBA.EPP.Repositories
{
    public class EppAttributeRepository: EPPRepository<EppAttribute>, IEppAttributeRepository
    {
        private readonly EppAppDbContext _dbContext;
        public EppAttributeRepository(EppAppDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public EppAttribute GetAttrId(string DbAttrNm)
        {
            return _dbContext.EppAttribute.Where(x => x.DbAttrNm == DbAttrNm).FirstOrDefault();
        }

        public IEnumerable<EppAttribute> GetQuetsionAttr()
        {

            return _dbContext.EppAttribute.Where(x => x.IsQstnAttrbt == 'Y');
        }
    }

   }
