using System;
using System.Collections.Generic;

namespace AFBA.EPP.Models
{
    public partial class EppProcessedEnrollment
    {
        public long RcrdId { get; set; }
        public string HashKey { get; set; }
        public string GrpId { get; set; }
        public string OwnrFrstNm { get; set; }
        public string OwnrLstNm { get; set; }
        public string InsrdFullNm { get; set; }
        public string InsrdOccuptnCd { get; set; }
        public string BenftCovAmt { get; set; }
        public string BenftIssueDt { get; set; }
        public string OwnrAddrsLn1 { get; set; }
        public string OwnrAddrsLn2 { get; set; }
        public string OwnrCtyNm { get; set; }
        public string OwnrAddrStCd { get; set; }
        public string OwnrAddrZipCd { get; set; }
        public string OwnrBrthDt { get; set; }
        public string SoclScrtyNbr { get; set; }
        public string OwnrPhnNbr { get; set; }
        public string PolcyStatusCd { get; set; }
        public string PolcyStatusEfftvDt { get; set; }
        public string BenftConTierCd { get; set; }
        public string ProductCd { get; set; }
        public string PolcyNbr { get; set; }
        public string BenftSeqNbr { get; set; }
        public string DpndntInsrdFrstName01 { get; set; }
        public string DpndntInsrdMidlNm01 { get; set; }
        public string DpndntInsrdLstNm01 { get; set; }
        public string DpndntInsrdSexCd01 { get; set; }
        public string DpndntBenftCovTierCd01 { get; set; }
        public string DpndntInsrdBrthDt01 { get; set; }
        public string DpndntInsrdFrstName02 { get; set; }
        public string DpndntInsrdMidlNm02 { get; set; }
        public string DpndntInsrdLstNm02 { get; set; }
        public string DpndntInsrdSexCd02 { get; set; }
        public string DpndntBenftCovTierCd02 { get; set; }
        public string DpndntInsrdBrthDt02 { get; set; }
        public string UndrWrtngClsCd { get; set; }
        public DateTime CrtdDt { get; set; }
        public string CrtdBy { get; set; }
        public DateTime? LstUpdtDt { get; set; }
        public string LstUpdtBy { get; set; }
    }
}
