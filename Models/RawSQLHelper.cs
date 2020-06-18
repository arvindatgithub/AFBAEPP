using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;

namespace AFBA.EPP.Models
{
    public class RawSQLHelper
    {
        public static List<T> RawSqlQuery<T>(DbContext  dbContext, string query, Func<DbDataReader, T> map)
        {
         
                using (var command = dbContext.Database.GetDbConnection().CreateCommand())
                {
                    command.CommandText = query;
                    command.CommandType = CommandType.Text;

                    dbContext.Database.OpenConnection();

                    using (var result = command.ExecuteReader())
                    {
                        var entities = new List<T>();

                        while (result.Read())
                        {
                            entities.Add(map(result));
                        }

                        return entities;
                    }
                }
           
        }
    }
}

