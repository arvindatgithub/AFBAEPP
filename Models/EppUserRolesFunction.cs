﻿using System;
using System.Collections.Generic;

namespace AFBA.EPP.Models
{
    public partial class EppUserRolesFunction
    {
        public long UserrolesFunctionId { get; set; }
        public long UserRoleId { get; set; }
        public int FunctionId { get; set; }
        public DateTime CrtdDt { get; set; }
        public string CrtdBy { get; set; }
        public DateTime? LstUpdtDt { get; set; }
        public string LstUpdtBy { get; set; }
        public long ActionTypeId { get; set; }

        public virtual EppUserActionTypes ActionType { get; set; }
        public virtual EppFunctions Function { get; set; }
        public virtual EppUserRoles UserRole { get; set; }
    }
}
