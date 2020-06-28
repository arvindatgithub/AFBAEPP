using System;
using System.Collections.Generic;

namespace AFBA.EPP.Models
{
    public partial class EppProcessedEnrollment
    {
        public long RcrdId { get; set; }
        public string CompnyCd { get; set; }
        public string GrpId { get; set; }
        public string PlcyNbr { get; set; }
        public string BenftSeqNbr { get; set; }
        public string BenftIssueDt { get; set; }
        public string BenftSystmStatusCd { get; set; }
        public string BenftSystmStatusEfftvDt { get; set; }
        public string PrdctPlnCd { get; set; }
        public string BenftCovAmt { get; set; }
        public string BenftCovTierCd { get; set; }
        public string OwnrSoclScrtyNbr { get; set; }
        public string OwnrFrstNm { get; set; }
        public string OwnrLstNm { get; set; }
        public string OwnrBrthDt { get; set; }
        public string OwnrAddrsLn1 { get; set; }
        public string OwnrAddrsLn2 { get; set; }
        public string OwnrCtyNm { get; set; }
        public string OwnrAddrStCd { get; set; }
        public string OwnrAddrZipCd { get; set; }
        public string OwnrPhnNbr { get; set; }
        public string InsrdSoclScrtyNbr { get; set; }
        public string InsrdFullNm { get; set; }
        public string InsrdFrstNm { get; set; }
        public string InsrdMidlNm { get; set; }
        public string InsrdLstNm { get; set; }
        public string InsrdGndrCd { get; set; }
        public string InsrdBrthDt { get; set; }
        public string InsrdOccuptnCd { get; set; }
        public string UndrWrtngClsCd { get; set; }
        public DateTime CrtdDt { get; set; }
        public string CrtdBy { get; set; }
        public DateTime? LstUpdtDt { get; set; }
        public string LstUpdtBy { get; set; }
    }
}
