﻿using AFBA.EPP.Models;
using AFBA.EPP.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AFBA.EPP.Repositories
{
    public class EppGrpprdctRepositry : EPPRepository<EppGrpprdct>,IEppGrpprdctRepository
    {
        private readonly EppAppDbContext _dbContext;
        public EppGrpprdctRepositry(EppAppDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public EppGrpprdct GetEppGrpprdct(string groupNo, string producId)
        {
            return this._dbContext.EppGrpprdct.Where(x => x.Grp.GrpNbr == groupNo && x.ProductId == long.Parse(producId)).FirstOrDefault();
        }


    }

    
}
