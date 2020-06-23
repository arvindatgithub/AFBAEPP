using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AFBA.EPP.ViewModels
{
    public class LookupDictionaryViewModel
    {
        //public IDictionary<string, string> PaymentMode1
        //{
        //    get
        //    {
        //        return new Dictionary<string, string>
        //         {
        //            { "01" , "01 - annual" },
        //            {"02",  "02 - semi-annual"},
        //            {"04", "04 - quarterly" },
        //            {"08", "08 - eight times per year, skips four calendar months" },
        //            {"09",  "09 - nine times per year, skips three calendar months"},
        //            {"10",  "10 - every 37 days for odd months, 36 days for even months, or tenthly, ten times per year, skips two calendar months"},
        //            {"12","12 - monthly" },
        //            {"13","13 - every four weeks" },
        //            {"16",  "16 - semi-monthly, eight times per year, skips four calendar months"},
        //            {"18",  "18 - semi-monthly, nine times per year, skips three calendar months"},
        //            { "20", "20 - every 18 days, or semi-monthly, ten times per year, skips two calendar months"},
        //            {"21", "21- every 18 days for odd months, 17 days for even months" },
        //            {"22",  "22 - semi-monthly, eleven times per year, skips one calendar month"},
        //            {"24", "24 - twice a month" },
        //            {"26", "26 - every two weeks" },
        //            {"52", "52 - seven days" },
        //         };
        //    }
        //}

        public IEnumerable<SitusState> SitusState
        {
            get
            {
                return new List<SitusState>
                {
                    new SitusState{ Id="AL", State="AL"},
                    new SitusState{ Id="AK", State="AK"},
                    new SitusState{ Id="AZ", State="AZ"},
                    new SitusState{ Id="AR", State="AR"},
                    new SitusState{ Id="CA", State="CA"},
                    new SitusState{ Id="CO", State="CO"},
                    new SitusState{ Id="CT", State="CT"},
                    new SitusState{ Id="DC", State="DC"},
                    new SitusState{ Id="DE", State="DE"},
                    new SitusState{ Id="FL", State="FL"},
                    new SitusState{ Id="GA", State="GA"},
                    new SitusState{ Id="HI", State="HI"},
                    new SitusState{ Id="ID", State="ID"},
                    new SitusState{ Id="IL", State="IL"},
                    new SitusState{ Id="IN", State="IN"},
                    new SitusState{ Id="IA", State="IA"},
                    new SitusState{ Id="KS", State="KS"},
                    new SitusState{ Id="KY", State="KY"},
                    new SitusState{ Id="LA", State="LA"},
                    new SitusState{ Id="ME", State="ME"},
                    new SitusState{ Id="MD", State="MD"},
                    new SitusState{ Id="MA", State="MA"},
                    new SitusState{ Id="MI", State="MI"},
                    new SitusState{ Id="MN", State="MN"},
                    new SitusState{ Id="MS", State="MS"},
                    new SitusState{ Id="MO", State="MO"},
                    new SitusState{ Id="MT", State="MT"},
                    new SitusState{ Id="NE", State="NE"},
                    new SitusState{ Id="NV", State="NV"},
                    new SitusState{ Id="NH", State="NH" },
                    new SitusState{ Id="NJ", State="NJ" },
                    new SitusState{ Id="NM", State="NM" },
                    new SitusState{ Id="NY", State="NY"},
                    new SitusState{ Id="NC", State="NC"},
                    new SitusState{ Id="ND", State="ND"},
                    new SitusState{ Id="OH", State="OH"},
                    new SitusState{ Id="OK", State="OK" },
                    new SitusState{ Id="OR", State="OR" },
                    new SitusState{ Id="PA", State="PA" },                    
                    new SitusState{ Id="RI", State="RI"},
                    new SitusState{ Id="SC", State="SC"},
                    new SitusState{ Id="SD", State="SD"},
                    new SitusState{ Id="TN", State="TN"},
                    new SitusState{ Id="TX", State="TX" },
                    new SitusState{ Id="UT", State="UT" },
                    new SitusState{ Id="VT", State="VT" },                    
                    new SitusState{ Id="VA", State="VA"},
                    new SitusState{ Id="WA", State="WA"},
                    new SitusState{ Id="WV", State="WV"},
                    new SitusState{ Id="WI", State="WI"},
                    new SitusState{ Id="WY", State="WY" },
                    new SitusState{ Id="PR", State="PR" },
                    new SitusState{ Id="VI", State="VI" },

                };

            }
        }
       
        public IEnumerable<AccidentRateLevel> AccidentRateLevels { get
            {
                return new List<AccidentRateLevel>
                {
                   new AccidentRateLevel{  Code="1", AccidentDesc="1"  },
                   new AccidentRateLevel{  Code="2", AccidentDesc="2"  },
                   new AccidentRateLevel{  Code="3", AccidentDesc="3"  },
                   new AccidentRateLevel{  Code="B", AccidentDesc="B"  },
                };
            }
        }

        public IEnumerable<PaymentMode> PaymentMode
        {
            get
            {
                return new List<PaymentMode>
                {
                        new  PaymentMode{ PaymentCode= "1", PaymentDescription="annual" },
                        new  PaymentMode{ PaymentCode= "2", PaymentDescription="semi-annual" },
                        new  PaymentMode{ PaymentCode= "4", PaymentDescription="quarterly" },
                        new  PaymentMode{ PaymentCode= "8", PaymentDescription="eight times per year, skips four calendar months" },
                        new  PaymentMode{ PaymentCode= "10", PaymentDescription="every 37 days for odd months, 36 days for even months, or tenthly, ten times per year, skips two calendar months" },
                        new  PaymentMode{ PaymentCode= "12", PaymentDescription="monthly" },
                        new  PaymentMode{ PaymentCode= "13", PaymentDescription="every four weeks" },
                        new  PaymentMode{ PaymentCode= "16", PaymentDescription="semi-monthly, eight times per year, skips four calendar months" },
                        new  PaymentMode{ PaymentCode= "18", PaymentDescription="semi-monthly, nine times per year, skips three calendar months" },
                        new  PaymentMode{ PaymentCode= "20", PaymentDescription="every 18 days, or semi-monthly, ten times per year, skips two calendar months" },
                        new  PaymentMode{ PaymentCode= "21", PaymentDescription="every 18 days for odd months, 17 days for even months" },
                        new  PaymentMode{ PaymentCode= "22", PaymentDescription="semi-monthly, eleven times per year, skips one calendar month" },
                        new  PaymentMode{ PaymentCode= "24", PaymentDescription="twice a month" },
                        new  PaymentMode{ PaymentCode= "24", PaymentDescription="twice a month" },
                        new  PaymentMode{ PaymentCode= "26", PaymentDescription="every two weeks" },
                        new  PaymentMode{ PaymentCode= "52", PaymentDescription="seven days" }

                };
            }

        }

    }
}

public class AccidentRateLevel
{
    public string  Code { get; set; }
    public string AccidentDesc { get; set; }
}

public class SitusState
{
    public string  Id { get; set; }
    public string  State  { get; set; }

}


public class PaymentMode
{
    public string PaymentCode { get; set; }
    public string PaymentDescription { get; set; }
    public string FormattedData { get
        {
            return PaymentCode + " - " + PaymentDescription;
        } 
    }
}