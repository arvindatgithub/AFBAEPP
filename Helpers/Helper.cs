using AFBA.EPP.Repositories;
using AFBA.EPP.Repositories.Interfaces;
using AFBA.EPP.ViewModels;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Cryptography;
using System.Text.Json;
using System.Threading.Tasks;
using System.Reflection;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using Microsoft.AspNetCore.Mvc.DataAnnotations;

namespace AFBA.EPP.Helpers
{
    public static class Helper
    {


        

        public static EppTemplateViewModel GetProductAvailableFields(string webRootPath, IUnitofWork _unitofWork,string groupName)
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
            //var dEppAttrField = new Dictionary<string, List<EppAttrFieldViewModel>>();

            EppTemplateViewModel lstEppTemplateViewModel = new EppTemplateViewModel
            {
                AvailableList = new List<EppAttrFieldViewModel>() ,
                SelectedList = new List<EppAttrFieldViewModel>()
            };

           var listData = EppGetAvailableFields(_unitofWork);
            foreach( var data in listData)
            {
                lstEppTemplateViewModel.AvailableList.Add(data);
            }
            
            var enumRoot = root.GetProperty(groupName).EnumerateObject();
                foreach (var attrName in enumRoot)
                {

                lstEppTemplateViewModel.SelectedList.Add( new EppAttrFieldViewModel {  DbAttrNm= attrName.Value.ToString()});
                }

                // mark required field for each product 
                switch (groupName)
                {
                    case "FPPG":
                        MarkRequired(lstEppTemplateViewModel.SelectedList, REQUIRED_FPPG);
                        break;
                    case "ACC_HI":
                        MarkRequired(lstEppTemplateViewModel.SelectedList, REQUIRED_ACC_HI);
                        break;
                    case "ER_CI":
                        MarkRequired(lstEppTemplateViewModel.SelectedList, REQUIRED_ER_CI);
                        break;
                    case "VOL_CI":
                        MarkRequired(lstEppTemplateViewModel.SelectedList, REQUIRED_VOL_CI);
                        break;
                    case "VGL":
                        MarkRequired(lstEppTemplateViewModel.SelectedList, REQUIRED_VGL);
                        break;
                    case "BGL":
                        MarkRequired(lstEppTemplateViewModel.SelectedList, REQUIRED_BGL);
                        break;
                }

                foreach (var item in lstEppTemplateViewModel.SelectedList)
                {
                    lstEppTemplateViewModel.AvailableList.Remove(lstEppTemplateViewModel.AvailableList.FirstOrDefault(x => x.DbAttrNm.Contains(item.DbAttrNm)));
                }
                
            return lstEppTemplateViewModel;

         }

        private static void MarkRequired(List<EppAttrFieldViewModel> lstEppAttrFieldViewModel, string[] stringArray)
        {
            foreach( var field in stringArray)
            {
                var d = lstEppAttrFieldViewModel.FirstOrDefault(d => d.DbAttrNm == field);
               if(d != null) { d.RqdFlg = true; }
            }

        }

        public static  IEnumerable<EppAttrFieldViewModel> EppGetAvailableFields(IUnitofWork _unitofWork)
        {
            List<EppAttrFieldViewModel> eppAttrFieldViewModels = new List<EppAttrFieldViewModel>();

            var listData = _unitofWork.eppAttributeRepository.GetAll().Result;
             foreach( var data in listData)
            {
                eppAttrFieldViewModels.Add(new EppAttrFieldViewModel
                {
                    DbAttrNm= data.DbAttrNm,
                    RqdFlg = false,

                });
            }
            return eppAttrFieldViewModels;

            //return .Select(d => new EppAttrFieldViewModel
            //{
            //    DbAttrNm = d.DbAttrNm,
            //    RqdFlg = false,
            //}).ToList().OrderBy(x => x.DbAttrNm);
        }


        public static  long GetRandomNumber()
        {
            var min = 1;
            var max = 99999;
            var rndnumber = RandomNumberGenerator.GetInt32(min, max) + DateTime.Now.ToString("MMddmmssff");
            return  RandomNumberGenerator.GetInt32(min, max);
        }


        public static List<ClsPropertyInfo> GetProperties(Object  classobject)
        {
            List<ClsPropertyInfo> clsPropertyInfos = new List<ClsPropertyInfo>();

            Type typeInfo = classobject.GetType();
            PropertyInfo[] props = typeInfo.GetProperties();
            foreach (var prop in props)
            {
                clsPropertyInfos.Add(new ClsPropertyInfo
                {
                    PropertyName = prop.Name,
                    PropertyValue= prop.GetValue(classobject).ToString()
                }); 
               
            }
            return clsPropertyInfos;
        }



        public static long GetProductIdbyName(string productName, IUnitofWork _unitofWork)
        {
            var product = _unitofWork.EppProductRepository.Find(x => x.ProductNm.Contains(productName)).Result.FirstOrDefault();
            return product.ProductId;
        }
    }
}
