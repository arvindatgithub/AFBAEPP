using AFBA.EPP.ViewModels;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace AFBA.EPP.Helpers
{
    public static class Helper
    {
            public static Dictionary<string, List<EppAttrFieldViewModel>> GetProductAvailableFields(string webRootPath)
        {
           string  path = Path.Combine(webRootPath, "app_data\\attrs_maps.json");
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
            }
            return dEppAttrField;
        }


    }
}
