using AFBA.EPP.Models;
using AFBA.EPP.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace AFBA.EPP.Repositories
{
      public class EppGroupMasterRepository : EPPRepository<EppGrpmstr>, IEppGroupMasterRepository
    {
        private readonly EppAppDbContext _dbContext;
        public EppGroupMasterRepository(EppAppDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public  void  GetGroupData()
        {

        //    public class TopUser
        //{
        //    public string Name { get; set; }

        //    public int Count { get; set; }
        //}

        //var result = Helper.RawSqlQuery(
        //    "SELECT TOP 10 Name, COUNT(*) FROM Users U"
        //    + " INNER JOIN Signups S ON U.UserId = S.UserId"
        //    + " GROUP BY U.Name ORDER BY COUNT(*) DESC",
        //    x => new TopUser { Name = (string)x[0], Count = (int)x[1] });
        
            using (var command = this._dbContext.Database.GetDbConnection().CreateCommand())
            {
                command.CommandText = "SELECT grp_id, grp_nbr, grp_nm FROM public.\"EPP_GRPMSTR\"";
                command.CommandType = CommandType.Text;
            
                this._dbContext.Database.OpenConnection();

                using (var result = command.ExecuteReader())
                {
                    while (result.Read())
                    {
                        Console.Write("{0}\tn", result[0]);
                    }
                }
            }


            
        }
    }
}
