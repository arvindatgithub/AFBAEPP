using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AFBA.EPP.ViewModels
{
    public class LookupDictionaryViewModel
    {
        public IDictionary<string, string> PaymentMode
        {
            get
            {
                return new Dictionary<string, string>
                 {
                    { "01" , "01 - annual" },
                    {"02",  "02 - semi-annual"},
                    {"04", "04 - quarterly" },
                    {"08", "08 - eight times per year, skips four calendar months" },
                    {"09",  "09 - nine times per year, skips three calendar months"},
                    {"10",  "10 - every 37 days for odd months, 36 days for even months, or tenthly, ten times per year, skips two calendar months"},
                    {"12","12 - monthly" },
                    {"13","13 - every four weeks" },
                    {"16",  "16 - semi-monthly, eight times per year, skips four calendar months"},
                    {"18",  "18 - semi-monthly, nine times per year, skips three calendar months"},
                    { "20", "20 - every 18 days, or semi-monthly, ten times per year, skips two calendar months"},
                    {"21", "21- every 18 days for odd months, 17 days for even months" },
                    {"22",  "22 - semi-monthly, eleven times per year, skips one calendar month"},
                    {"24", "24 - twice a month" },
                    {"26", "26 - every two weeks" },
                    {"52", "52 - seven days" },
                 };
            }
        }
        public IDictionary<string, string> SitusState
        {
            get
            {
                return new Dictionary<string, string>
                {
                    { "AL", "AL" },
                    { "AK", "AK" },
                    { "AZ","AZ" },
                    { "AR", "AR" },
                    { "CA", "CA" },
                    { "CO", "CO" },
                    { "CT", "CT" }, 
                    {"DC", "DC" },
                    { "DE", "DE" },
                    {  "FL", "FL" },
                    { "GA","GA" },
                    { "HI","HI" },
                    { "ID", "ID" },
                    { "IL", "IL" },
                    { "IN","IN" },
                    { "IA", "IA" },
                    { "KS", "KS" },
                    { "KY", "KY" },
                    {  "LA", "LA" },
                    { "ME","ME" },
                    { "MD", "MD" },
                    { "MA", "MA" },
                    { "MI", "MI" },
                    { "MN", "MN" },
                    { "MS", "MS" },
                    { "MO", "MO" },
                    { "MT","MT" },
                    { "NE", "NE" }, 
                    {"NV", "NV" }, 
                    {"NH", "NH" },
                    { "NJ", "NJ" },
                    {"NM", "NM" },
                    { "NY", "NY" }, 
                    {"NC", "NC" },
                    { "ND", "ND" },
                    { "OH", "OH" },
                    { "OK", "OK" },
                    { "OR", "OR" }, 
                    {"PA", "PA" }, 
                    {"RI", "RI" }, 
                    {"SC", "SC" }, 
                    {"SD", "SD" }, 
                    {"TN", "TN" }, 
                    {"TX", "TX" },
                    { "UT", "UT" },
                    {  "VT", "VT" },
                    { "VA", "VA" }, 
                    {"WA", "WA" },
                    { "WV", "WV" }, 
                    {"WI", "WI" }, 
                    {"WY", "WY" },
                    {"PR", "PR" },
                    {"VI", "VI" }
                };
            }
        }
        public IDictionary<string,string> AccidentRateLevel { get
            {
                return new Dictionary<string, string>
                {
                    {"1", "1" },
                     {"2", "2" },
                    {"3",   "3" },
                    {"B", "B" }
                };
            }
        }

    }
}
