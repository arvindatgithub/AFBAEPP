using AFBA.EPP.ViewModels;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Text.Json;
using System.Threading.Tasks;

namespace AFBA.EPP.Helpers
{
    public static class Helper
    {


       
       
        public static Dictionary<string, List<EppAttrFieldViewModel>> GetProductAvailableFields(string webRootPath)
        {
           string  path = Path.Combine(webRootPath, "attrs_maps.json");

              string[] REQUIRED_FPPG = new string[] {
                             "emp_hire_dt", "effctv_dt", "grp_nmbr", "emp_sig_dt", "agnt_cd_1",
                              "agntsub_1", "agnt_comm_split_1", "owners_lname", "owners_fname",
                             "owners_ssn", "owners_addr_ln_1", "owners_addr_city",
                            "owners_addr_state", "owners_addr_zip", "emp_plan_cd"
        };

            string[] REQUIRED_ACC_HI = new string[] {
                           "grp_nm", "grp_nmbr", "emp_id", "payment_mode", "signd_at_state",
                "agnt_cd_1", "agnt_nm", "owners_fname", "owners_lname",
                "owners_addr_ln_1", "owners_addr_city", "owners_addr_state",
                "owners_addr_zip", "owners_phn", "owners_ssn", "owners_dob",
                "owners_sex"
        };


            string[] REQUIRED_ER_CI = new string[] {
                            "emp_hire_dt","emp_sig_dt","grp_nmbr","emp_id","agnt_cd_1","agntsub_1",
                "agnt_comm_split_1","owners_fname","owners_lname","owners_addr_ln_1",
                "owners_addr_city", "owners_addr_state","owners_addr_zip",
                "owners_ssn", "owners_dob", "owners_sex"
        };
            string[] REQUIRED_VOL_CI = new string[] {
                          "emp_hire_dt", "enrl_typ", "signd_at_state", "payment_mode","prduct_cd",
                "effctv_dt","enrl_typ","agnt_cd_1", "emp_fname", "emp_lname",
                "emp_addr_ln_1", "emp_addr_city", "emp_addr_state",
                "emp_addr_zip", "emp_ssn", "emp_dob", "emp_gndr", "owners_phn"
        };
            string[] REQUIRED_VGL = new string[] {
                          "emp_hire_dt", "enrl_typ", "signd_at_state", "payment_mode","prduct_cd",
                "effctv_dt","enrl_typ","agnt_cd_1", "emp_fname", "emp_lname",
                "emp_addr_ln_1", "emp_addr_city", "emp_addr_state",
                "emp_addr_zip", "emp_ssn", "emp_dob", "emp_gndr", "owners_phn"
        };
            string[] REQUIRED_BGL = new string[] {
                          "emp_hire_dt", "enrl_typ", "signd_at_state", "payment_mode","prduct_cd",
                "effctv_dt","enrl_typ","agnt_cd_1", "emp_fname", "emp_lname",
                "emp_addr_ln_1", "emp_addr_city", "emp_addr_state",
                "emp_addr_zip", "emp_ssn", "emp_dob", "emp_gndr", "owners_phn"
        };

            var jsonBytes = File.ReadAllText(path);
            var jsonDoc = JsonDocument.Parse(jsonBytes);               
                 
            var root = jsonDoc.RootElement;
            var dEppAttrField = new Dictionary<string, List<EppAttrFieldViewModel>>();
            foreach ( var productnm in root.EnumerateObject())
            {
              
                List<EppAttrFieldViewModel> lsteavm = new List<EppAttrFieldViewModel>();
                var enumRoot = root.GetProperty(productnm.Name).EnumerateObject();
                dEppAttrField.Add(productnm.Name, lsteavm);
                foreach (var attrName in enumRoot)
                {

                    lsteavm.Add( new EppAttrFieldViewModel {  DbAttrNm= attrName.Value.ToString()});
                }

                // mark required field for each product 
                switch ( productnm.Name)
                {
                    case "FPPG":
                        MarkRequired(lsteavm, REQUIRED_FPPG);
                        break;
                    case "ACC_HI":
                        MarkRequired(lsteavm, REQUIRED_ACC_HI);
                        break;
                    case "ER_CI":
                        MarkRequired(lsteavm, REQUIRED_ER_CI);
                        break;
                    case "VOL_CI":
                        MarkRequired(lsteavm, REQUIRED_VOL_CI);
                        break;
                    case "VGL":
                        MarkRequired(lsteavm, REQUIRED_VGL);
                        break;
                    case "BGL":
                        MarkRequired(lsteavm, REQUIRED_BGL);
                        break;
                }
                            
            }
                
            
            return dEppAttrField;
        }

        private static void MarkRequired(List<EppAttrFieldViewModel> lstEppAttrFieldViewModel, string[] stringArray)
        {
            foreach( var field in stringArray)
            {
                var d = lstEppAttrFieldViewModel.FirstOrDefault(d => d.DbAttrNm == field);
               if(d != null) { d.RqdFlg = true; }
            }

        }


    }
}
