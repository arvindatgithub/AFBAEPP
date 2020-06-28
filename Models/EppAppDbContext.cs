using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace AFBA.EPP.Models
{
    public partial class EppAppDbContext : DbContext
    {
        public EppAppDbContext()
        {
        }

        public EppAppDbContext(DbContextOptions<EppAppDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<EppAcctMgrCntcts> EppAcctMgrCntcts { get; set; }
        public virtual DbSet<EppAction> EppAction { get; set; }
        public virtual DbSet<EppAttribute> EppAttribute { get; set; }
        public virtual DbSet<EppBulkRefTbl> EppBulkRefTbl { get; set; }
        public virtual DbSet<EppDate> EppDate { get; set; }
        public virtual DbSet<EppEnrlmntPrtnrs> EppEnrlmntPrtnrs { get; set; }
        public virtual DbSet<EppEnrollmentFact> EppEnrollmentFact { get; set; }
        public virtual DbSet<EppErrorDtl> EppErrorDtl { get; set; }
        public virtual DbSet<EppErrorMessage> EppErrorMessage { get; set; }
        public virtual DbSet<EppFunctions> EppFunctions { get; set; }
        public virtual DbSet<EppGrpmstr> EppGrpmstr { get; set; }
        public virtual DbSet<EppGrpprdct> EppGrpprdct { get; set; }
        public virtual DbSet<EppGrppymntmd> EppGrppymntmd { get; set; }
        public virtual DbSet<EppPartnersData> EppPartnersData { get; set; }
        public virtual DbSet<EppPartnersDataChangeStatus> EppPartnersDataChangeStatus { get; set; }
        public virtual DbSet<EppPartnersDataErr> EppPartnersDataErr { get; set; }
        public virtual DbSet<EppPrdctattrbt> EppPrdctattrbt { get; set; }
        public virtual DbSet<EppProcessedEnrollment> EppProcessedEnrollment { get; set; }
        public virtual DbSet<EppProduct> EppProduct { get; set; }
        public virtual DbSet<EppProductCodes> EppProductCodes { get; set; }
        public virtual DbSet<EppRoles> EppRoles { get; set; }
        public virtual DbSet<EppUserActionTypes> EppUserActionTypes { get; set; }
        public virtual DbSet<EppUserRoles> EppUserRoles { get; set; }
        public virtual DbSet<EppUserRolesFunction> EppUserRolesFunction { get; set; }
        public virtual DbSet<HoldAttr> HoldAttr { get; set; }
        public virtual DbSet<PgStatStatements> PgStatStatements { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseNpgsql("Host=ec2-54-208-30-123.compute-1.amazonaws.com;Port=5432;Database=d941budah3t4sd;Username=idsstg;Password=p4311b74476d95c05b982733ec26be9240b1a140aa1d293b40f2e5b846054ad90; SSL Mode=Require; TrustServerCertificate=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasPostgresExtension("pg_stat_statements");

            modelBuilder.Entity<EppAcctMgrCntcts>(entity =>
            {
                entity.HasKey(e => e.AcctMgrCntctId)
                    .HasName("PK27");

                entity.ToTable("EPP_ACCT_MGR_CNTCTS");

                entity.Property(e => e.AcctMgrCntctId)
                    .HasColumnName("acct_mgr_cntct_id")
                    .ValueGeneratedNever();

                entity.Property(e => e.AcctMgrNm)
                    .HasColumnName("acct_mgr_nm")
                    .HasMaxLength(100);

                entity.Property(e => e.CrdtBy)
                    .IsRequired()
                    .HasColumnName("crdt_by")
                    .HasMaxLength(50);

                entity.Property(e => e.CrdtDt)
                    .HasColumnName("crdt_dt")
                    .HasColumnType("date");

                entity.Property(e => e.EmailAddress)
                    .HasColumnName("email_address")
                    .HasMaxLength(100);

                entity.Property(e => e.GrpprdctId).HasColumnName("grpprdct_id");

                entity.Property(e => e.LstUpdtBy)
                    .HasColumnName("lst_updt_by")
                    .HasMaxLength(50);

                entity.Property(e => e.LstUpdtDt)
                    .HasColumnName("lst_updt_dt")
                    .HasColumnType("date");

                entity.HasOne(d => d.Grpprdct)
                    .WithMany(p => p.EppAcctMgrCntcts)
                    .HasForeignKey(d => d.GrpprdctId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("RefEPP_GRPPRDCT37");
            });

            modelBuilder.Entity<EppAction>(entity =>
            {
                entity.HasKey(e => e.ActionId)
                    .HasName("PK_ACTION");

                entity.ToTable("EPP_Action");

                entity.Property(e => e.ActionId)
                    .HasColumnName("action_id")
                    .ValueGeneratedNever();

                entity.Property(e => e.CrtdBy)
                    .IsRequired()
                    .HasColumnName("crtd_by")
                    .HasMaxLength(10);

                entity.Property(e => e.CrtdDt)
                    .HasColumnName("crtd_dt")
                    .HasColumnType("date");

                entity.Property(e => e.LstUpdtBy)
                    .HasColumnName("lst_updt_by")
                    .HasMaxLength(10);

                entity.Property(e => e.LstUpdtDt)
                    .HasColumnName("lst_updt_dt")
                    .HasColumnType("date");

                entity.Property(e => e.Name)
                    .HasColumnName("name")
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<EppAttribute>(entity =>
            {
                entity.HasKey(e => e.AttrId)
                    .HasName("PK_Attribute");

                entity.ToTable("EPP_Attribute");

                entity.Property(e => e.AttrId)
                    .HasColumnName("attr_id")
                    .ValueGeneratedNever();

                entity.Property(e => e.CrtdBy)
                    .IsRequired()
                    .HasColumnName("crtd_by")
                    .HasMaxLength(10);

                entity.Property(e => e.CrtdDt)
                    .HasColumnName("crtd_dt")
                    .HasColumnType("date");

                entity.Property(e => e.DbAttrNm)
                    .HasColumnName("db_attr_nm")
                    .HasMaxLength(100);

                entity.Property(e => e.DisplyAttrNm)
                    .HasColumnName("disply_attr_nm")
                    .HasMaxLength(100);

                entity.Property(e => e.FileAttrNm)
                    .HasColumnName("file_attr_nm")
                    .HasMaxLength(100);

                entity.Property(e => e.IsQstnAttrbt).HasColumnName("is_qstn_attrbt");

                entity.Property(e => e.IsVisibleForTmlt).HasColumnName("is_visible_for_tmlt");

                entity.Property(e => e.LstUpdtBy)
                    .HasColumnName("lst_updt_by")
                    .HasMaxLength(10);

                entity.Property(e => e.LstUpdtDt)
                    .HasColumnName("lst_updt_dt")
                    .HasColumnType("date");
            });

            modelBuilder.Entity<EppBulkRefTbl>(entity =>
            {
                entity.HasKey(e => e.BulkId)
                    .HasName("PK_BulkRefTbl");

                entity.ToTable("EPP_BulkRefTbl");

                entity.Property(e => e.BulkId)
                    .HasColumnName("bulk_id")
                    .ValueGeneratedNever();

                entity.Property(e => e.ActionId).HasColumnName("action_id");

                entity.Property(e => e.AttrId).HasColumnName("attr_id");

                entity.Property(e => e.CrtdBy)
                    .IsRequired()
                    .HasColumnName("crtd_by")
                    .HasMaxLength(10);

                entity.Property(e => e.CrtdDt)
                    .HasColumnName("crtd_dt")
                    .HasColumnType("date");

                entity.Property(e => e.GrpprdctId).HasColumnName("grpprdct_id");

                entity.Property(e => e.LstUpdtBy)
                    .HasColumnName("lst_updt_by")
                    .HasMaxLength(10);

                entity.Property(e => e.LstUpdtDt)
                    .HasColumnName("lst_updt_dt")
                    .HasColumnType("date");

                entity.Property(e => e.Value)
                    .HasColumnName("value")
                    .HasMaxLength(50);

                entity.HasOne(d => d.Action)
                    .WithMany(p => p.EppBulkRefTbl)
                    .HasForeignKey(d => d.ActionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("RefAction10");

                entity.HasOne(d => d.Attr)
                    .WithMany(p => p.EppBulkRefTbl)
                    .HasForeignKey(d => d.AttrId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("RefAttribute9");

                entity.HasOne(d => d.Grpprdct)
                    .WithMany(p => p.EppBulkRefTbl)
                    .HasForeignKey(d => d.GrpprdctId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("RefGRPPRDCT5");
            });

            modelBuilder.Entity<EppDate>(entity =>
            {
                entity.HasKey(e => e.DtId)
                    .HasName("PK_DATE");

                entity.ToTable("EPP_Date");

                entity.Property(e => e.DtId)
                    .HasColumnName("DT_ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.DayName).HasMaxLength(100);

                entity.Property(e => e.DayOfMonth).HasMaxLength(2);

                entity.Property(e => e.DayOfQuarter).HasMaxLength(3);

                entity.Property(e => e.DayOfWeek).HasMaxLength(1);

                entity.Property(e => e.DayOfWeekInMonth).HasMaxLength(2);

                entity.Property(e => e.DayOfWeekInYear).HasMaxLength(2);

                entity.Property(e => e.DayOfYear).HasMaxLength(3);

                entity.Property(e => e.FirstDayOfMonth).HasColumnType("date");

                entity.Property(e => e.FirstDayOfQuarter).HasColumnType("date");

                entity.Property(e => e.FirstDayOfYear).HasColumnType("date");

                entity.Property(e => e.LastDayOfMonth).HasColumnType("date");

                entity.Property(e => e.LastDayOfQuarter).HasColumnType("date");

                entity.Property(e => e.LastDayOfYear).HasColumnType("date");

                entity.Property(e => e.Mmyyyy)
                    .HasColumnName("MMYYYY")
                    .HasMaxLength(6);

                entity.Property(e => e.Month).HasMaxLength(2);

                entity.Property(e => e.MonthName).HasMaxLength(100);

                entity.Property(e => e.MonthOfQuarter).HasMaxLength(2);

                entity.Property(e => e.Quarter).HasMaxLength(1);

                entity.Property(e => e.QuarterName).HasMaxLength(100);

                entity.Property(e => e.RudDt).HasColumnName("RUD_DT");

                entity.Property(e => e.WeekOfMonth).HasMaxLength(1);

                entity.Property(e => e.WeekOfQuarter).HasMaxLength(2);

                entity.Property(e => e.WeekOfYear).HasMaxLength(2);

                entity.Property(e => e.Year).HasMaxLength(4);
            });

            modelBuilder.Entity<EppEnrlmntPrtnrs>(entity =>
            {
                entity.HasKey(e => e.EnrlmntPrtnrsId);

                entity.ToTable("EPP_ENRLMNT_PRTNRS");

                entity.Property(e => e.EnrlmntPrtnrsId)
                    .HasColumnName("enrlmnt_prtnrs_id")
                    .ValueGeneratedNever();

                entity.Property(e => e.CntctNm)
                    .HasColumnName("cntct_nm")
                    .HasMaxLength(100);

                entity.Property(e => e.CrtdBy)
                    .IsRequired()
                    .HasColumnName("crtd_by")
                    .HasMaxLength(10);

                entity.Property(e => e.CrtdDt)
                    .HasColumnName("crtd_dt")
                    .HasColumnType("date");

                entity.Property(e => e.EmlAddrss)
                    .HasColumnName("eml_addrss")
                    .HasMaxLength(100);

                entity.Property(e => e.EnrlmntPrtnrsNm)
                    .HasColumnName("enrlmnt_prtnrs_nm")
                    .HasMaxLength(100);

                entity.Property(e => e.LstUpdtBy)
                    .HasColumnName("lst_updt_by")
                    .HasMaxLength(10);

                entity.Property(e => e.LstUpdtDt)
                    .HasColumnName("lst_updt_dt")
                    .HasColumnType("date");

                entity.Property(e => e.PhnNbr)
                    .HasColumnName("phn_nbr")
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<EppEnrollmentFact>(entity =>
            {
                entity.HasKey(e => e.EnrollmentFactId)
                    .HasName("PK_EnrollmentFact");

                entity.ToTable("EPP_EnrollmentFact");

                entity.Property(e => e.EnrollmentFactId)
                    .HasColumnName("enrollment_fact_id")
                    .ValueGeneratedNever();

                entity.Property(e => e.DtId).HasColumnName("DT_ID");

                entity.Property(e => e.DuplicateEnrollment)
                    .HasColumnName("duplicate_enrollment")
                    .HasColumnType("numeric(10,0)");

                entity.Property(e => e.FailedNumberOfEnrollment)
                    .HasColumnName("failed_number_of_enrollment")
                    .HasColumnType("numeric(10,0)");

                entity.Property(e => e.NbrEnrollmentsRcvd)
                    .HasColumnName("nbr_enrollments_rcvd")
                    .HasColumnType("numeric(10,0)");

                entity.Property(e => e.ProductId).HasColumnName("product_id");

                entity.Property(e => e.SuccessfulNumberOfEnrollment)
                    .HasColumnName("successful_number_of_enrollment")
                    .HasColumnType("numeric(10,0)");

                entity.HasOne(d => d.Dt)
                    .WithMany(p => p.EppEnrollmentFact)
                    .HasForeignKey(d => d.DtId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("RefDate7");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.EppEnrollmentFact)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("RefProduct6");
            });

            modelBuilder.Entity<EppErrorDtl>(entity =>
            {
                entity.HasKey(e => e.ErrorDtlId)
                    .HasName("PK_ERRDTL");

                entity.ToTable("EPP_ErrorDtl");

                entity.Property(e => e.ErrorDtlId)
                    .HasColumnName("ErrorDtl_ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.AttrId).HasColumnName("attr_id");

                entity.Property(e => e.CrtdBy)
                    .IsRequired()
                    .HasColumnName("crtd_by")
                    .HasMaxLength(10);

                entity.Property(e => e.CrtdDt)
                    .HasColumnName("crtd_dt")
                    .HasColumnType("date");

                entity.Property(e => e.ErrmsgId).HasColumnName("errmsg_id");

                entity.Property(e => e.ErrorDtl).HasMaxLength(2000);

                entity.Property(e => e.LstUpdtBy)
                    .HasColumnName("lst_updt_by")
                    .HasMaxLength(10);

                entity.Property(e => e.LstUpdtDt)
                    .HasColumnName("lst_updt_dt")
                    .HasColumnType("date");

                entity.Property(e => e.RcrdId).HasColumnName("rcrd_id");

                entity.HasOne(d => d.Attr)
                    .WithMany(p => p.EppErrorDtl)
                    .HasForeignKey(d => d.AttrId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("RefAttribute2");

                entity.HasOne(d => d.Errmsg)
                    .WithMany(p => p.EppErrorDtl)
                    .HasForeignKey(d => d.ErrmsgId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("RefRules8");

                entity.HasOne(d => d.Rcrd)
                    .WithMany(p => p.EppErrorDtl)
                    .HasForeignKey(d => d.RcrdId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("RefPartnersData_ERR1");
            });

            modelBuilder.Entity<EppErrorMessage>(entity =>
            {
                entity.HasKey(e => e.ErrmsgId)
                    .HasName("PK_RULES");

                entity.ToTable("EPP_ErrorMessage");

                entity.Property(e => e.ErrmsgId)
                    .HasColumnName("errmsg_id")
                    .ValueGeneratedNever();

                entity.Property(e => e.CrtdBy)
                    .IsRequired()
                    .HasColumnName("crtd_by")
                    .HasMaxLength(10);

                entity.Property(e => e.CrtdDt)
                    .HasColumnName("crtd_dt")
                    .HasColumnType("date");

                entity.Property(e => e.ErrmsgDesc)
                    .HasColumnName("errmsg_desc")
                    .HasMaxLength(2000);

                entity.Property(e => e.LstUpdtBy)
                    .HasColumnName("lst_updt_by")
                    .HasMaxLength(10);

                entity.Property(e => e.LstUpdtDt)
                    .HasColumnName("lst_updt_dt")
                    .HasColumnType("date");
            });

            modelBuilder.Entity<EppFunctions>(entity =>
            {
                entity.HasKey(e => e.FunctionId)
                    .HasName("PK23");

                entity.ToTable("EPP_Functions");

                entity.Property(e => e.FunctionId)
                    .HasColumnName("function_id")
                    .ValueGeneratedNever();

                entity.Property(e => e.CrtdBy)
                    .IsRequired()
                    .HasColumnName("crtd_by")
                    .HasMaxLength(50);

                entity.Property(e => e.CrtdDt)
                    .HasColumnName("crtd_dt")
                    .HasColumnType("date");

                entity.Property(e => e.FunctionName)
                    .HasColumnName("function_name")
                    .HasMaxLength(100);

                entity.Property(e => e.LstUpdtBy)
                    .HasColumnName("lst_updt_by")
                    .HasMaxLength(50);

                entity.Property(e => e.LstUpdtDt)
                    .HasColumnName("lst_updt_dt")
                    .HasColumnType("date");
            });

            modelBuilder.Entity<EppGrpmstr>(entity =>
            {
                entity.HasKey(e => e.GrpId)
                    .HasName("PK_GRPMSTR");

                entity.ToTable("EPP_GRPMSTR");

                entity.Property(e => e.GrpId)
                    .HasColumnName("grp_id")
                    .ValueGeneratedNever();

                entity.Property(e => e.ActvFlg).HasColumnName("actv_flg");

                entity.Property(e => e.CrtdBy)
                    .IsRequired()
                    .HasColumnName("crtd_by")
                    .HasMaxLength(10);

                entity.Property(e => e.CrtdDt)
                    .HasColumnName("crtd_dt")
                    .HasColumnType("date");

                entity.Property(e => e.EnrlmntPrtnrsId).HasColumnName("enrlmnt_prtnrs_id");

                entity.Property(e => e.GrpEfftvDt)
                    .HasColumnName("grp_efftv_dt")
                    .HasColumnType("date");

                entity.Property(e => e.GrpNbr)
                    .HasColumnName("grp_nbr")
                    .HasMaxLength(100);

                entity.Property(e => e.GrpNm)
                    .HasColumnName("grp_nm")
                    .HasMaxLength(100);

                entity.Property(e => e.GrpPymn).HasColumnName("grpPymn");

                entity.Property(e => e.GrpSitusSt)
                    .HasColumnName("grp_situs_st")
                    .HasMaxLength(10);

                entity.Property(e => e.LstUpdtBy)
                    .HasColumnName("lst_updt_by")
                    .HasMaxLength(10);

                entity.Property(e => e.LstUpdtDt)
                    .HasColumnName("lst_updt_dt")
                    .HasColumnType("date");

                entity.Property(e => e.NewOpnEnrlmntPrd)
                    .HasColumnName("new_opn_enrlmnt_prd")
                    .HasColumnType("numeric(2,0)");

                entity.Property(e => e.OccClass).HasColumnName("occ_class");

                entity.Property(e => e.PerpetualEnrlmntFlg).HasColumnName("perpetual_enrlmnt_flg");

                entity.HasOne(d => d.EnrlmntPrtnrs)
                    .WithMany(p => p.EppGrpmstr)
                    .HasForeignKey(d => d.EnrlmntPrtnrsId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("RefEPP_ENRLMNT_PRTNRS27");

                entity.HasOne(d => d.GrpPymnNavigation)
                    .WithMany(p => p.EppGrpmstr)
                    .HasForeignKey(d => d.GrpPymn)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("RefGEPP_GRPPYMNTMD39");
            });

            modelBuilder.Entity<EppGrpprdct>(entity =>
            {
                entity.HasKey(e => e.GrpprdctId)
                    .HasName("PK_GRPPRDCT");

                entity.ToTable("EPP_GRPPRDCT");

                entity.Property(e => e.GrpprdctId)
                    .HasColumnName("grpprdct_id")
                    .ValueGeneratedNever();

                entity.Property(e => e.CrtdBy)
                    .IsRequired()
                    .HasColumnName("crtd_by")
                    .HasMaxLength(10);

                entity.Property(e => e.CrtdDt)
                    .HasColumnName("crtd_dt")
                    .HasColumnType("date");

                entity.Property(e => e.GrpId).HasColumnName("grp_id");

                entity.Property(e => e.LstUpdtBy)
                    .HasColumnName("lst_updt_by")
                    .HasMaxLength(10);

                entity.Property(e => e.LstUpdtDt)
                    .HasColumnName("lst_updt_dt")
                    .HasColumnType("date");

                entity.Property(e => e.ProductId).HasColumnName("product_id");

                entity.HasOne(d => d.Grp)
                    .WithMany(p => p.EppGrpprdct)
                    .HasForeignKey(d => d.GrpId)
                    .HasConstraintName("RefGRPMSTR3");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.EppGrpprdct)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("RefProduct4");
            });

            modelBuilder.Entity<EppGrppymntmd>(entity =>
            {
                entity.HasKey(e => e.GrpPymn)
                    .HasName("PK28");

                entity.ToTable("EPP_GRPPYMNTMD");

                entity.Property(e => e.GrpPymn)
                    .HasColumnName("grpPymn")
                    .ValueGeneratedNever();

                entity.Property(e => e.CrtdBy)
                    .IsRequired()
                    .HasColumnName("crtd_by")
                    .HasMaxLength(50);

                entity.Property(e => e.CrtdDt)
                    .HasColumnName("crtd_dt")
                    .HasColumnType("date");

                entity.Property(e => e.GrpPymntMdCd)
                    .HasColumnName("grp_pymnt_md_cd")
                    .HasMaxLength(10);

                entity.Property(e => e.GrpPymntMdNm)
                    .HasColumnName("grp_pymnt_md_nm")
                    .HasMaxLength(200);

                entity.Property(e => e.LstUpdtBy)
                    .HasColumnName("lst_updt_by")
                    .HasMaxLength(50);

                entity.Property(e => e.LstUpdtDt)
                    .HasColumnName("lst_updt_dt")
                    .HasColumnType("date");
            });

            modelBuilder.Entity<EppPartnersData>(entity =>
            {
                entity.HasKey(e => e.RcrdId)
                    .HasName("PK_PartnersData");

                entity.ToTable("EPP_PartnersData");

                entity.Property(e => e.RcrdId)
                    .HasColumnName("rcrd_id")
                    .ValueGeneratedNever();

                entity.Property(e => e.AccidntCat)
                    .HasColumnName("accidnt_cat")
                    .HasMaxLength(100);

                entity.Property(e => e.ActivlyAtWrk)
                    .HasColumnName("activly_at_wrk")
                    .HasMaxLength(100);

                entity.Property(e => e.AgentInitialsTxt)
                    .HasColumnName("agent_initials_txt")
                    .HasMaxLength(100);

                entity.Property(e => e.AgntCd1)
                    .HasColumnName("agnt_cd_1")
                    .HasMaxLength(100);

                entity.Property(e => e.AgntCd2)
                    .HasColumnName("agnt_cd_2")
                    .HasMaxLength(100);

                entity.Property(e => e.AgntCd3)
                    .HasColumnName("agnt_cd_3")
                    .HasMaxLength(100);

                entity.Property(e => e.AgntCd4)
                    .HasColumnName("agnt_cd_4")
                    .HasMaxLength(100);

                entity.Property(e => e.AgntCommSplit1)
                    .HasColumnName("agnt_comm_split_1")
                    .HasMaxLength(100);

                entity.Property(e => e.AgntCommSplit2)
                    .HasColumnName("agnt_comm_split_2")
                    .HasMaxLength(100);

                entity.Property(e => e.AgntCommSplit3)
                    .HasColumnName("agnt_comm_split_3")
                    .HasMaxLength(100);

                entity.Property(e => e.AgntCommSplit4)
                    .HasColumnName("agnt_comm_split_4")
                    .HasMaxLength(100);

                entity.Property(e => e.AgntNm)
                    .HasColumnName("agnt_nm")
                    .HasMaxLength(100);

                entity.Property(e => e.AgntSigTxt1)
                    .HasColumnName("agnt_sig_txt_1")
                    .HasMaxLength(100);

                entity.Property(e => e.AgntSigTxt2)
                    .HasColumnName("agnt_sig_txt_2")
                    .HasMaxLength(100);

                entity.Property(e => e.AgntSigTxt3)
                    .HasColumnName("agnt_sig_txt_3")
                    .HasMaxLength(100);

                entity.Property(e => e.AgntSigTxt4)
                    .HasColumnName("agnt_sig_txt_4")
                    .HasMaxLength(100);

                entity.Property(e => e.Agntsub1)
                    .HasColumnName("agntsub_1")
                    .HasMaxLength(100);

                entity.Property(e => e.Agntsub2)
                    .HasColumnName("agntsub_2")
                    .HasMaxLength(100);

                entity.Property(e => e.Agntsub3)
                    .HasColumnName("agntsub_3")
                    .HasMaxLength(100);

                entity.Property(e => e.Agntsub4)
                    .HasColumnName("agntsub_4")
                    .HasMaxLength(100);

                entity.Property(e => e.ApplicationDt)
                    .HasColumnName("application_dt")
                    .HasMaxLength(100);

                entity.Property(e => e.Basplan)
                    .HasColumnName("basplan")
                    .HasMaxLength(100);

                entity.Property(e => e.BillingCtgry)
                    .HasColumnName("billing_ctgry")
                    .HasMaxLength(100);

                entity.Property(e => e.ChAdBnft01)
                    .HasColumnName("ch_ad_bnft_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChAdBnft02)
                    .HasColumnName("ch_ad_bnft_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChAdBnft03)
                    .HasColumnName("ch_ad_bnft_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChAdBnft04)
                    .HasColumnName("ch_ad_bnft_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChAdBnft05)
                    .HasColumnName("ch_ad_bnft_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChAdBnft06)
                    .HasColumnName("ch_ad_bnft_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChAdBnft07)
                    .HasColumnName("ch_ad_bnft_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChCovAmnt)
                    .HasColumnName("ch_cov_amnt")
                    .HasMaxLength(100);

                entity.Property(e => e.ChCovAmnt01)
                    .HasColumnName("ch_cov_amnt_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChCovAmnt02)
                    .HasColumnName("ch_cov_amnt_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChCovAmnt03)
                    .HasColumnName("ch_cov_amnt_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChCovAmnt04)
                    .HasColumnName("ch_cov_amnt_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChCovAmnt05)
                    .HasColumnName("ch_cov_amnt_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChCovAmnt06)
                    .HasColumnName("ch_cov_amnt_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChCovTyp)
                    .HasColumnName("ch_cov_typ")
                    .HasMaxLength(100);

                entity.Property(e => e.ChCovTyp01)
                    .HasColumnName("ch_cov_typ_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChCovTyp02)
                    .HasColumnName("ch_cov_typ_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChCovTyp03)
                    .HasColumnName("ch_cov_typ_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChCovTyp04)
                    .HasColumnName("ch_cov_typ_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChCovTyp05)
                    .HasColumnName("ch_cov_typ_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChCovTyp06)
                    .HasColumnName("ch_cov_typ_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChCovTyp07)
                    .HasColumnName("ch_cov_typ_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChDob01)
                    .HasColumnName("ch_dob_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChDob02)
                    .HasColumnName("ch_dob_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChDob03)
                    .HasColumnName("ch_dob_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChDob04)
                    .HasColumnName("ch_dob_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChDob05)
                    .HasColumnName("ch_dob_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChDob06)
                    .HasColumnName("ch_dob_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChDob07)
                    .HasColumnName("ch_dob_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChFaceAmtMonBnft01)
                    .HasColumnName("ch_face_amt_mon_bnft_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChFaceAmtMonBnft02)
                    .HasColumnName("ch_face_amt_mon_bnft_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChFaceAmtMonBnft03)
                    .HasColumnName("ch_face_amt_mon_bnft_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChFaceAmtMonBnft04)
                    .HasColumnName("ch_face_amt_mon_bnft_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChFaceAmtMonBnft05)
                    .HasColumnName("ch_face_amt_mon_bnft_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChFaceAmtMonBnft06)
                    .HasColumnName("ch_face_amt_mon_bnft_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChFaceAmtMonBnft07)
                    .HasColumnName("ch_face_amt_mon_bnft_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChFname01)
                    .HasColumnName("ch_fname_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChFname02)
                    .HasColumnName("ch_fname_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChFname03)
                    .HasColumnName("ch_fname_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChFname04)
                    .HasColumnName("ch_fname_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChFname05)
                    .HasColumnName("ch_fname_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChFname06)
                    .HasColumnName("ch_fname_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChFname07)
                    .HasColumnName("ch_fname_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChGndr01)
                    .HasColumnName("ch_gndr_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChGndr02)
                    .HasColumnName("ch_gndr_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChGndr03)
                    .HasColumnName("ch_gndr_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChGndr04)
                    .HasColumnName("ch_gndr_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChGndr05)
                    .HasColumnName("ch_gndr_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChGndr06)
                    .HasColumnName("ch_gndr_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChGndr07)
                    .HasColumnName("ch_gndr_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChHandcappd05)
                    .HasColumnName("ch_handcappd_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChHandcappd07)
                    .HasColumnName("ch_handcappd_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChHandcppd03)
                    .HasColumnName("ch_handcppd_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChHandcppd04)
                    .HasColumnName("ch_handcppd_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChHandcppd06)
                    .HasColumnName("ch_handcppd_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChHandicppd01)
                    .HasColumnName("ch_handicppd_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChHandicppd02)
                    .HasColumnName("ch_handicppd_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChHght01)
                    .HasColumnName("ch_hght_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChHght02)
                    .HasColumnName("ch_hght_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChHght03)
                    .HasColumnName("ch_hght_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChHght04)
                    .HasColumnName("ch_hght_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChHght05)
                    .HasColumnName("ch_hght_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChHght06)
                    .HasColumnName("ch_hght_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChHght07)
                    .HasColumnName("ch_hght_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChLname01)
                    .HasColumnName("ch_lname_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChLname02)
                    .HasColumnName("ch_lname_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChLname03)
                    .HasColumnName("ch_lname_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChLname04)
                    .HasColumnName("ch_lname_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChLname06)
                    .HasColumnName("ch_lname_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChLname07)
                    .HasColumnName("ch_lname_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChLstNam05)
                    .HasColumnName("ch_lst_nam_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChMidInit01)
                    .HasColumnName("ch_mid_init_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChMidInit02)
                    .HasColumnName("ch_mid_init_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChMidInit03)
                    .HasColumnName("ch_mid_init_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChMidInit04)
                    .HasColumnName("ch_mid_init_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChMidInit05)
                    .HasColumnName("ch_mid_init_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChMidInit06)
                    .HasColumnName("ch_mid_init_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChMidInit07)
                    .HasColumnName("ch_mid_init_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChOccClass01)
                    .HasColumnName("ch_occ_class_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChOccClass02)
                    .HasColumnName("ch_occ_class_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChOccClass03)
                    .HasColumnName("ch_occ_class_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChOccClass04)
                    .HasColumnName("ch_occ_class_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChOccClass05)
                    .HasColumnName("ch_occ_class_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChOccClass06)
                    .HasColumnName("ch_occ_class_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChOccClass07)
                    .HasColumnName("ch_occ_class_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPlanCd)
                    .HasColumnName("ch_plan_cd")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPlanfrmcd01)
                    .HasColumnName("ch_planfrmcd_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPlanfrmcd02)
                    .HasColumnName("ch_planfrmcd_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPlanfrmcd03)
                    .HasColumnName("ch_planfrmcd_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPlanoptn01)
                    .HasColumnName("ch_planoptn_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPlanoptn02)
                    .HasColumnName("ch_planoptn_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPlanoptn03)
                    .HasColumnName("ch_planoptn_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrem01)
                    .HasColumnName("ch_prem_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrem02)
                    .HasColumnName("ch_prem_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrem03)
                    .HasColumnName("ch_prem_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrem04)
                    .HasColumnName("ch_prem_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrem05)
                    .HasColumnName("ch_prem_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrem06)
                    .HasColumnName("ch_prem_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrem07)
                    .HasColumnName("ch_prem_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneAddrCty)
                    .HasColumnName("ch_prim_bene_addr_cty")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneAddrLn1)
                    .HasColumnName("ch_prim_bene_addr_ln1")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneAddrLn2)
                    .HasColumnName("ch_prim_bene_addr_ln2")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneAddrState)
                    .HasColumnName("ch_prim_bene_addr_state")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneAddrZip)
                    .HasColumnName("ch_prim_bene_addr_zip")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneNm01)
                    .HasColumnName("ch_prim_bene_nm_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneNm02)
                    .HasColumnName("ch_prim_bene_nm_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneNm03)
                    .HasColumnName("ch_prim_bene_nm_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneNm04)
                    .HasColumnName("ch_prim_bene_nm_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneNm05)
                    .HasColumnName("ch_prim_bene_nm_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneNm06)
                    .HasColumnName("ch_prim_bene_nm_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneNm07)
                    .HasColumnName("ch_prim_bene_nm_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBenePercent01)
                    .HasColumnName("ch_prim_bene_percent_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneRel01)
                    .HasColumnName("ch_prim_bene_rel_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneRel02)
                    .HasColumnName("ch_prim_bene_rel_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneRel03)
                    .HasColumnName("ch_prim_bene_rel_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneRel04)
                    .HasColumnName("ch_prim_bene_rel_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneRel05)
                    .HasColumnName("ch_prim_bene_rel_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneRel06)
                    .HasColumnName("ch_prim_bene_rel_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneRel07)
                    .HasColumnName("ch_prim_bene_rel_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneSsn01)
                    .HasColumnName("ch_prim_bene_ssn_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneSsn02)
                    .HasColumnName("ch_prim_bene_ssn_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneSsn03)
                    .HasColumnName("ch_prim_bene_ssn_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneSsn04)
                    .HasColumnName("ch_prim_bene_ssn_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneSsn05)
                    .HasColumnName("ch_prim_bene_ssn_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneSsn06)
                    .HasColumnName("ch_prim_bene_ssn_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneSsn07)
                    .HasColumnName("ch_prim_bene_ssn_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1001)
                    .HasColumnName("ch_qstn_10_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1002)
                    .HasColumnName("ch_qstn_10_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1003)
                    .HasColumnName("ch_qstn_10_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1004)
                    .HasColumnName("ch_qstn_10_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1005)
                    .HasColumnName("ch_qstn_10_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1006)
                    .HasColumnName("ch_qstn_10_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn101)
                    .HasColumnName("ch_qstn_1_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn102)
                    .HasColumnName("ch_qstn_1_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn103)
                    .HasColumnName("ch_qstn_1_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn104)
                    .HasColumnName("ch_qstn_1_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn105)
                    .HasColumnName("ch_qstn_1_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn106)
                    .HasColumnName("ch_qstn_1_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn107)
                    .HasColumnName("ch_qstn_1_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1a01)
                    .HasColumnName("ch_qstn_1a_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1a02)
                    .HasColumnName("ch_qstn_1a_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1a03)
                    .HasColumnName("ch_qstn_1a_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1a04)
                    .HasColumnName("ch_qstn_1a_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1a05)
                    .HasColumnName("ch_qstn_1a_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1a06)
                    .HasColumnName("ch_qstn_1a_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1a07)
                    .HasColumnName("ch_qstn_1a_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1b01)
                    .HasColumnName("ch_qstn_1b_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1b02)
                    .HasColumnName("ch_qstn_1b_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1b03)
                    .HasColumnName("ch_qstn_1b_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1b04)
                    .HasColumnName("ch_qstn_1b_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1b05)
                    .HasColumnName("ch_qstn_1b_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1b06)
                    .HasColumnName("ch_qstn_1b_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1b07)
                    .HasColumnName("ch_qstn_1b_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn201)
                    .HasColumnName("ch_qstn_2_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn202)
                    .HasColumnName("ch_qstn_2_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn203)
                    .HasColumnName("ch_qstn_2_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn204)
                    .HasColumnName("ch_qstn_2_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn205)
                    .HasColumnName("ch_qstn_2_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn206)
                    .HasColumnName("ch_qstn_2_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn207)
                    .HasColumnName("ch_qstn_2_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn301)
                    .HasColumnName("ch_qstn_3_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn302)
                    .HasColumnName("ch_qstn_3_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn303)
                    .HasColumnName("ch_qstn_3_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn304)
                    .HasColumnName("ch_qstn_3_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn305)
                    .HasColumnName("ch_qstn_3_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn306)
                    .HasColumnName("ch_qstn_3_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn307)
                    .HasColumnName("ch_qstn_3_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3a01)
                    .HasColumnName("ch_qstn_3a_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3a02)
                    .HasColumnName("ch_qstn_3a_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3a03)
                    .HasColumnName("ch_qstn_3a_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3a04)
                    .HasColumnName("ch_qstn_3a_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3a05)
                    .HasColumnName("ch_qstn_3a_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3a06)
                    .HasColumnName("ch_qstn_3a_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3a07)
                    .HasColumnName("ch_qstn_3a_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3b01)
                    .HasColumnName("ch_qstn_3b_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3b02)
                    .HasColumnName("ch_qstn_3b_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3b03)
                    .HasColumnName("ch_qstn_3b_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3b04)
                    .HasColumnName("ch_qstn_3b_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3b05)
                    .HasColumnName("ch_qstn_3b_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3b06)
                    .HasColumnName("ch_qstn_3b_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3b07)
                    .HasColumnName("ch_qstn_3b_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3c01)
                    .HasColumnName("ch_qstn_3c_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3c02)
                    .HasColumnName("ch_qstn_3c_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3c03)
                    .HasColumnName("ch_qstn_3c_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3c04)
                    .HasColumnName("ch_qstn_3c_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3c05)
                    .HasColumnName("ch_qstn_3c_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3c06)
                    .HasColumnName("ch_qstn_3c_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3c07)
                    .HasColumnName("ch_qstn_3c_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3d01)
                    .HasColumnName("ch_qstn_3d_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3d02)
                    .HasColumnName("ch_qstn_3d_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3d03)
                    .HasColumnName("ch_qstn_3d_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3d04)
                    .HasColumnName("ch_qstn_3d_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3d05)
                    .HasColumnName("ch_qstn_3d_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3d06)
                    .HasColumnName("ch_qstn_3d_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3d07)
                    .HasColumnName("ch_qstn_3d_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3e01)
                    .HasColumnName("ch_qstn_3e_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3e02)
                    .HasColumnName("ch_qstn_3e_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3e03)
                    .HasColumnName("ch_qstn_3e_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3e04)
                    .HasColumnName("ch_qstn_3e_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3e05)
                    .HasColumnName("ch_qstn_3e_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3e06)
                    .HasColumnName("ch_qstn_3e_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3e07)
                    .HasColumnName("ch_qstn_3e_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn401)
                    .HasColumnName("ch_qstn_4_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn402)
                    .HasColumnName("ch_qstn_4_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn403)
                    .HasColumnName("ch_qstn_4_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn404)
                    .HasColumnName("ch_qstn_4_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn405)
                    .HasColumnName("ch_qstn_4_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn406)
                    .HasColumnName("ch_qstn_4_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn407)
                    .HasColumnName("ch_qstn_4_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn501)
                    .HasColumnName("ch_qstn_5_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn502)
                    .HasColumnName("ch_qstn_5_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn503)
                    .HasColumnName("ch_qstn_5_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn504)
                    .HasColumnName("ch_qstn_5_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn505)
                    .HasColumnName("ch_qstn_5_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn506)
                    .HasColumnName("ch_qstn_5_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn507)
                    .HasColumnName("ch_qstn_5_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn601)
                    .HasColumnName("ch_qstn_6_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn602)
                    .HasColumnName("ch_qstn_6_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn603)
                    .HasColumnName("ch_qstn_6_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn604)
                    .HasColumnName("ch_qstn_6_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn605)
                    .HasColumnName("ch_qstn_6_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn606)
                    .HasColumnName("ch_qstn_6_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn701)
                    .HasColumnName("ch_qstn_7_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn702)
                    .HasColumnName("ch_qstn_7_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn703)
                    .HasColumnName("ch_qstn_7_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn704)
                    .HasColumnName("ch_qstn_7_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn705)
                    .HasColumnName("ch_qstn_7_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn706)
                    .HasColumnName("ch_qstn_7_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn801)
                    .HasColumnName("ch_qstn_8_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn802)
                    .HasColumnName("ch_qstn_8_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn803)
                    .HasColumnName("ch_qstn_8_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn804)
                    .HasColumnName("ch_qstn_8_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn805)
                    .HasColumnName("ch_qstn_8_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn806)
                    .HasColumnName("ch_qstn_8_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn901)
                    .HasColumnName("ch_qstn_9_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn902)
                    .HasColumnName("ch_qstn_9_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn903)
                    .HasColumnName("ch_qstn_9_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn904)
                    .HasColumnName("ch_qstn_9_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn905)
                    .HasColumnName("ch_qstn_9_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn906)
                    .HasColumnName("ch_qstn_9_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChSsn01)
                    .HasColumnName("ch_ssn_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChSsn02)
                    .HasColumnName("ch_ssn_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChSsn03)
                    .HasColumnName("ch_ssn_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChSsn04)
                    .HasColumnName("ch_ssn_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChSsn05)
                    .HasColumnName("ch_ssn_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChSsn06)
                    .HasColumnName("ch_ssn_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChSsn07)
                    .HasColumnName("ch_ssn_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChWght01)
                    .HasColumnName("ch_wght_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChWght02)
                    .HasColumnName("ch_wght_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChWght03)
                    .HasColumnName("ch_wght_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChWght04)
                    .HasColumnName("ch_wght_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChWght05)
                    .HasColumnName("ch_wght_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChWght06)
                    .HasColumnName("ch_wght_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChWght07)
                    .HasColumnName("ch_wght_07")
                    .HasMaxLength(100);

                entity.Property(e => e.CrtdBy)
                    .IsRequired()
                    .HasColumnName("crtd_by")
                    .HasMaxLength(50);

                entity.Property(e => e.CrtdDt)
                    .HasColumnName("crtd_dt")
                    .HasColumnType("date");

                entity.Property(e => e.CvrdPrsn)
                    .HasColumnName("cvrd_prsn")
                    .HasMaxLength(100);

                entity.Property(e => e.EffctvDt)
                    .HasColumnName("effctv_dt")
                    .HasMaxLength(100);

                entity.Property(e => e.EmailAddr)
                    .HasColumnName("email_addr")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpAdBnft)
                    .HasColumnName("emp_ad_bnft")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpAddCity)
                    .HasColumnName("emp_add_city")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpAddrLn1)
                    .HasColumnName("emp_addr_ln_1")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpAddrLn2)
                    .HasColumnName("emp_addr_ln_2")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpAddrState)
                    .HasColumnName("emp_addr_state")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpAddrZip)
                    .HasColumnName("emp_addr_zip")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneAddrCty)
                    .HasColumnName("emp_cont_bene_addr_cty")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneAddrLn1)
                    .HasColumnName("emp_cont_bene_addr_ln1")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneAddrLn2)
                    .HasColumnName("emp_cont_bene_addr_ln2")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneAddrState)
                    .HasColumnName("emp_cont_bene_addr_state")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneAddrZp)
                    .HasColumnName("emp_cont_bene_addr_zp")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneDob)
                    .HasColumnName("emp_cont_bene_dob")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneDob01)
                    .HasColumnName("emp_cont_bene_dob_01")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneDob02)
                    .HasColumnName("emp_cont_bene_dob_02")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneDob03)
                    .HasColumnName("emp_cont_bene_dob_03")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneDob04)
                    .HasColumnName("emp_cont_bene_dob_04")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneDob05)
                    .HasColumnName("emp_cont_bene_dob_05")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneDob06)
                    .HasColumnName("emp_cont_bene_dob_06")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneDob07)
                    .HasColumnName("emp_cont_bene_dob_07")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneDob08)
                    .HasColumnName("emp_cont_bene_dob_08")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneDob09)
                    .HasColumnName("emp_cont_bene_dob_09")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneDob10)
                    .HasColumnName("emp_cont_bene_dob_10")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneNm)
                    .HasColumnName("emp_cont_bene_nm")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneNm01)
                    .HasColumnName("emp_cont_bene_nm_01")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneNm02)
                    .HasColumnName("emp_cont_bene_nm_02")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneNm03)
                    .HasColumnName("emp_cont_bene_nm_03")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneNm04)
                    .HasColumnName("emp_cont_bene_nm_04")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneNm05)
                    .HasColumnName("emp_cont_bene_nm_05")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneNm06)
                    .HasColumnName("emp_cont_bene_nm_06")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneNm07)
                    .HasColumnName("emp_cont_bene_nm_07")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneNm08)
                    .HasColumnName("emp_cont_bene_nm_08")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneNm09)
                    .HasColumnName("emp_cont_bene_nm_09")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneNm10)
                    .HasColumnName("emp_cont_bene_nm_10")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBenePercent)
                    .HasColumnName("emp_cont_bene_percent")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBenePercent01)
                    .HasColumnName("emp_cont_bene_percent_01")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBenePercent02)
                    .HasColumnName("emp_cont_bene_percent_02")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBenePercent03)
                    .HasColumnName("emp_cont_bene_percent_03")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBenePercent04)
                    .HasColumnName("emp_cont_bene_percent_04")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBenePercent05)
                    .HasColumnName("emp_cont_bene_percent_05")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBenePercent06)
                    .HasColumnName("emp_cont_bene_percent_06")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBenePercent07)
                    .HasColumnName("emp_cont_bene_percent_07")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBenePercent08)
                    .HasColumnName("emp_cont_bene_percent_08")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBenePercent09)
                    .HasColumnName("emp_cont_bene_percent_09")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBenePercent10)
                    .HasColumnName("emp_cont_bene_percent_10")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneRel)
                    .HasColumnName("emp_cont_bene_rel")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneRel01)
                    .HasColumnName("emp_cont_bene_rel_01")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneRel02)
                    .HasColumnName("emp_cont_bene_rel_02")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneRel03)
                    .HasColumnName("emp_cont_bene_rel_03")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneRel04)
                    .HasColumnName("emp_cont_bene_rel_04")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneRel05)
                    .HasColumnName("emp_cont_bene_rel_05")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneRel06)
                    .HasColumnName("emp_cont_bene_rel_06")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneRel07)
                    .HasColumnName("emp_cont_bene_rel_07")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneRel08)
                    .HasColumnName("emp_cont_bene_rel_08")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneRel09)
                    .HasColumnName("emp_cont_bene_rel_09")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneRel10)
                    .HasColumnName("emp_cont_bene_rel_10")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneSsn)
                    .HasColumnName("emp_cont_bene_ssn")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneSsn01)
                    .HasColumnName("emp_cont_bene_ssn_01")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneSsn02)
                    .HasColumnName("emp_cont_bene_ssn_02")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneSsn03)
                    .HasColumnName("emp_cont_bene_ssn_03")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneSsn04)
                    .HasColumnName("emp_cont_bene_ssn_04")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneSsn05)
                    .HasColumnName("emp_cont_bene_ssn_05")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneSsn06)
                    .HasColumnName("emp_cont_bene_ssn_06")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneSsn07)
                    .HasColumnName("emp_cont_bene_ssn_07")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneSsn08)
                    .HasColumnName("emp_cont_bene_ssn_08")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneSsn09)
                    .HasColumnName("emp_cont_bene_ssn_09")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneSsn10)
                    .HasColumnName("emp_cont_bene_ssn_10")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpCovAmnt)
                    .HasColumnName("emp_cov_amnt")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpCovTyp)
                    .HasColumnName("emp_cov_typ")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpDob)
                    .HasColumnName("emp_dob")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpFaceAmtMonBnft)
                    .HasColumnName("emp_face_amt_mon_bnft")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpFname)
                    .HasColumnName("emp_fname")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpGndr)
                    .HasColumnName("emp_gndr")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpHandicppd)
                    .HasColumnName("emp_handicppd")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpHeight)
                    .HasColumnName("emp_height")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpHireDt)
                    .HasColumnName("emp_hire_dt")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpId)
                    .HasColumnName("emp_id")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpInitialsTxt)
                    .HasColumnName("emp_initials_txt")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpLname)
                    .HasColumnName("emp_lname")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpMidInit)
                    .HasColumnName("emp_mid_init")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpOccClass)
                    .HasColumnName("emp_occ_class")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPlanCd)
                    .HasColumnName("emp_plan_cd")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPlanFrmCd)
                    .HasColumnName("emp_plan_frm_cd")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPlanOptn)
                    .HasColumnName("emp_plan_optn")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrem)
                    .HasColumnName("emp_prem")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrCity02)
                    .HasColumnName("emp_prim_bene_addr_city_02")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrCity03)
                    .HasColumnName("emp_prim_bene_addr_city_03")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrCity04)
                    .HasColumnName("emp_prim_bene_addr_city_04")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrCty01)
                    .HasColumnName("emp_prim_bene_addr_cty_01")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrLn101)
                    .HasColumnName("emp_prim_bene_addr_ln1_01")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrLn102)
                    .HasColumnName("emp_prim_bene_addr_ln1_02")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrLn103)
                    .HasColumnName("emp_prim_bene_addr_ln1_03")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrLn104)
                    .HasColumnName("emp_prim_bene_addr_ln1_04")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrLn201)
                    .HasColumnName("emp_prim_bene_addr_ln2_01")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrLn202)
                    .HasColumnName("emp_prim_bene_addr_ln2_02")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrLn203)
                    .HasColumnName("emp_prim_bene_addr_ln2_03")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrLn204)
                    .HasColumnName("emp_prim_bene_addr_ln2_04")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrState01)
                    .HasColumnName("emp_prim_bene_addr_state_01")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrState02)
                    .HasColumnName("emp_prim_bene_addr_state_02")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrState03)
                    .HasColumnName("emp_prim_bene_addr_state_03")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrState04)
                    .HasColumnName("emp_prim_bene_addr_state_04")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrZip01)
                    .HasColumnName("emp_prim_bene_addr_zip_01")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrZip02)
                    .HasColumnName("emp_prim_bene_addr_zip_02")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrZip03)
                    .HasColumnName("emp_prim_bene_addr_zip_03")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrZip04)
                    .HasColumnName("emp_prim_bene_addr_zip_04")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneDob)
                    .HasColumnName("emp_prim_bene_dob")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneDob01)
                    .HasColumnName("emp_prim_bene_dob_01")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneDob02)
                    .HasColumnName("emp_prim_bene_dob_02")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneDob03)
                    .HasColumnName("emp_prim_bene_dob_03")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneDob04)
                    .HasColumnName("emp_prim_bene_dob_04")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneDob05)
                    .HasColumnName("emp_prim_bene_dob_05")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneDob06)
                    .HasColumnName("emp_prim_bene_dob_06")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneDob07)
                    .HasColumnName("emp_prim_bene_dob_07")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneDob08)
                    .HasColumnName("emp_prim_bene_dob_08")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneDob09)
                    .HasColumnName("emp_prim_bene_dob_09")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneDob10)
                    .HasColumnName("emp_prim_bene_dob_10")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneNm)
                    .HasColumnName("emp_prim_bene_nm")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneNm01)
                    .HasColumnName("emp_prim_bene_nm_01")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneNm02)
                    .HasColumnName("emp_prim_bene_nm_02")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneNm03)
                    .HasColumnName("emp_prim_bene_nm_03")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneNm04)
                    .HasColumnName("emp_prim_bene_nm_04")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneNm05)
                    .HasColumnName("emp_prim_bene_nm_05")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneNm06)
                    .HasColumnName("emp_prim_bene_nm_06")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneNm07)
                    .HasColumnName("emp_prim_bene_nm_07")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneNm08)
                    .HasColumnName("emp_prim_bene_nm_08")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneNm09)
                    .HasColumnName("emp_prim_bene_nm_09")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneNm10)
                    .HasColumnName("emp_prim_bene_nm_10")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBenePercent01)
                    .HasColumnName("emp_prim_bene_percent_01")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBenePercent02)
                    .HasColumnName("emp_prim_bene_percent_02")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBenePercent03)
                    .HasColumnName("emp_prim_bene_percent_03")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBenePercent04)
                    .HasColumnName("emp_prim_bene_percent_04")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBenePercent05)
                    .HasColumnName("emp_prim_bene_percent_05")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBenePercent06)
                    .HasColumnName("emp_prim_bene_percent_06")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBenePercent07)
                    .HasColumnName("emp_prim_bene_percent_07")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBenePercent08)
                    .HasColumnName("emp_prim_bene_percent_08")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBenePercent09)
                    .HasColumnName("emp_prim_bene_percent_09")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBenePercent10)
                    .HasColumnName("emp_prim_bene_percent_10")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneRel)
                    .HasColumnName("emp_prim_bene_rel")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneRel01)
                    .HasColumnName("emp_prim_bene_rel_01")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneRel02)
                    .HasColumnName("emp_prim_bene_rel_02")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneRel03)
                    .HasColumnName("emp_prim_bene_rel_03")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneRel04)
                    .HasColumnName("emp_prim_bene_rel_04")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneRel05)
                    .HasColumnName("emp_prim_bene_rel_05")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneRel06)
                    .HasColumnName("emp_prim_bene_rel_06")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneRel07)
                    .HasColumnName("emp_prim_bene_rel_07")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneRel08)
                    .HasColumnName("emp_prim_bene_rel_08")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneRel09)
                    .HasColumnName("emp_prim_bene_rel_09")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneRel10)
                    .HasColumnName("emp_prim_bene_rel_10")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneSsn)
                    .HasColumnName("emp_prim_bene_ssn")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneSsn01)
                    .HasColumnName("emp_prim_bene_ssn_01")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneSsn02)
                    .HasColumnName("emp_prim_bene_ssn_02")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneSsn03)
                    .HasColumnName("emp_prim_bene_ssn_03")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneSsn04)
                    .HasColumnName("emp_prim_bene_ssn_04")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneSsn05)
                    .HasColumnName("emp_prim_bene_ssn_05")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneSsn06)
                    .HasColumnName("emp_prim_bene_ssn_06")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneSsn07)
                    .HasColumnName("emp_prim_bene_ssn_07")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneSsn08)
                    .HasColumnName("emp_prim_bene_ssn_08")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneSsn09)
                    .HasColumnName("emp_prim_bene_ssn_09")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneSsn10)
                    .HasColumnName("emp_prim_bene_ssn_10")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpQstn1)
                    .HasColumnName("emp_qstn_1")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpQstn10)
                    .HasColumnName("emp_qstn_10")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpQstn1a)
                    .HasColumnName("emp_qstn_1a")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpQstn1b)
                    .HasColumnName("emp_qstn_1b")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpQstn2)
                    .HasColumnName("emp_qstn_2")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpQstn3)
                    .HasColumnName("emp_qstn_3")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpQstn3a)
                    .HasColumnName("emp_qstn_3a")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpQstn3b)
                    .HasColumnName("emp_qstn_3b")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpQstn3c)
                    .HasColumnName("emp_qstn_3c")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpQstn3d)
                    .HasColumnName("emp_qstn_3d")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpQstn3e)
                    .HasColumnName("emp_qstn_3e")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpQstn4)
                    .HasColumnName("emp_qstn_4")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpQstn5)
                    .HasColumnName("emp_qstn_5")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpQstn6)
                    .HasColumnName("emp_qstn_6")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpQstn7)
                    .HasColumnName("emp_qstn_7")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpQstn8)
                    .HasColumnName("emp_qstn_8")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpQstn9)
                    .HasColumnName("emp_qstn_9")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpQualityOfLife)
                    .HasColumnName("emp_quality_of_life")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpRiderAir)
                    .HasColumnName("emp_rider_air")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpRiderQol3)
                    .HasColumnName("emp_rider_qol3")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpRiderQol4)
                    .HasColumnName("emp_rider_qol4")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpRiderWp)
                    .HasColumnName("emp_rider_wp")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpSigDt)
                    .HasColumnName("emp_sig_dt")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpSigTxt)
                    .HasColumnName("emp_sig_txt")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpSsn)
                    .HasColumnName("emp_ssn")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpWaiverOfPrem)
                    .HasColumnName("emp_waiver_of_prem")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpWeight)
                    .HasColumnName("emp_weight")
                    .HasMaxLength(100);

                entity.Property(e => e.EnrlActn)
                    .HasColumnName("enrl_actn")
                    .HasMaxLength(100);

                entity.Property(e => e.EnrlTyp)
                    .HasColumnName("enrl_typ")
                    .HasMaxLength(100);

                entity.Property(e => e.ExistingIns)
                    .HasColumnName("existing_ins")
                    .HasMaxLength(100);

                entity.Property(e => e.FileNm)
                    .IsRequired()
                    .HasColumnName("file_nm")
                    .HasMaxLength(100);

                entity.Property(e => e.GrpNm)
                    .HasColumnName("grp_nm")
                    .HasMaxLength(100);

                entity.Property(e => e.GrpNmbr)
                    .HasColumnName("grp_nmbr")
                    .HasMaxLength(100);

                entity.Property(e => e.GrpSitusState)
                    .HasColumnName("grp_situs_state")
                    .HasMaxLength(100);

                entity.Property(e => e.HashKey)
                    .HasColumnName("hash_key")
                    .HasMaxLength(100);

                entity.Property(e => e.HspitalIndmnty)
                    .HasColumnName("hspital_indmnty")
                    .HasMaxLength(100);

                entity.Property(e => e.IssueDt)
                    .HasColumnName("issue_dt")
                    .HasMaxLength(100);

                entity.Property(e => e.LstUpdtBy)
                    .HasColumnName("lst_updt_by")
                    .HasMaxLength(50);

                entity.Property(e => e.LstUpdtDt)
                    .HasColumnName("lst_updt_dt")
                    .HasColumnType("date");

                entity.Property(e => e.Opt)
                    .HasColumnName("opt")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnerHght)
                    .HasColumnName("owner_hght")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnerSal)
                    .HasColumnName("owner_sal")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnerSmkrNoSmkr)
                    .HasColumnName("owner_smkr_no_smkr")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnerWght)
                    .HasColumnName("owner_wght")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnersAddrCity)
                    .HasColumnName("owners_addr_city")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnersAddrLn1)
                    .HasColumnName("owners_addr_ln_1")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnersAddrLn2)
                    .HasColumnName("owners_addr_ln_2")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnersAddrState)
                    .HasColumnName("owners_addr_state")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnersAddrZip)
                    .HasColumnName("owners_addr_zip")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnersDob)
                    .HasColumnName("owners_dob")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnersFname)
                    .HasColumnName("owners_fname")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnersLname)
                    .HasColumnName("owners_lname")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnersMidInit)
                    .HasColumnName("owners_mid_init")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnersPhn)
                    .HasColumnName("owners_phn")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnersSex)
                    .HasColumnName("owners_sex")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnersSsn)
                    .HasColumnName("owners_ssn")
                    .HasMaxLength(100);

                entity.Property(e => e.PaymentMode)
                    .HasColumnName("payment_mode")
                    .HasMaxLength(100);

                entity.Property(e => e.PolcyNbr)
                    .HasColumnName("polcy_nbr")
                    .HasMaxLength(100);

                entity.Property(e => e.PrductCd)
                    .HasColumnName("prduct_cd")
                    .HasMaxLength(100);

                entity.Property(e => e.ProductName)
                    .HasColumnName("product_name")
                    .HasMaxLength(100);

                entity.Property(e => e.RateLvl)
                    .HasColumnName("rate_lvl")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplacementIsTerminating)
                    .HasColumnName("replacement_is_terminating")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplacementReadAloud)
                    .HasColumnName("replacement_read_aloud")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplacementUsingFunds)
                    .HasColumnName("replacement_using_funds")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplacingIns)
                    .HasColumnName("replacing_ins")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy1Insrd)
                    .HasColumnName("replcmnt_polcy1_insrd")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy1Nm)
                    .HasColumnName("replcmnt_polcy1_nm")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy1Nmbr)
                    .HasColumnName("replcmnt_polcy1_nmbr")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy1RplcdOrFncng)
                    .HasColumnName("replcmnt_polcy1_rplcd_or_fncng")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy1Rsn)
                    .HasColumnName("replcmnt_polcy1_rsn")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy2Insrd)
                    .HasColumnName("replcmnt_polcy2_insrd")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy2Nm)
                    .HasColumnName("replcmnt_polcy2_nm")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy2Nmbr)
                    .HasColumnName("replcmnt_polcy2_nmbr")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy2RplcdOrFncng)
                    .HasColumnName("replcmnt_polcy2_rplcd_or_fncng")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy2Rsn)
                    .HasColumnName("replcmnt_polcy2_rsn")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy3Insrd)
                    .HasColumnName("replcmnt_polcy3_insrd")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy3Nm)
                    .HasColumnName("replcmnt_polcy3_nm")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy3Nmbr)
                    .HasColumnName("replcmnt_polcy3_nmbr")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy3RplcdOrFncng)
                    .HasColumnName("replcmnt_polcy3_rplcd_or_fncng")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy3Rsn)
                    .HasColumnName("replcmnt_polcy3_rsn")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy4Insrd)
                    .HasColumnName("replcmnt_polcy4_insrd")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy4Nm)
                    .HasColumnName("replcmnt_polcy4_nm")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy4Nmbr)
                    .HasColumnName("replcmnt_polcy4_nmbr")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy4RplcdOrFncng)
                    .HasColumnName("replcmnt_polcy4_rplcd_or_fncng")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy4Rsn)
                    .HasColumnName("replcmnt_polcy4_rsn")
                    .HasMaxLength(100);

                entity.Property(e => e.SigndAtCity)
                    .HasColumnName("signd_at_city")
                    .HasMaxLength(100);

                entity.Property(e => e.SigndAtState)
                    .HasColumnName("signd_at_state")
                    .HasMaxLength(100);

                entity.Property(e => e.SpAdBnft)
                    .HasColumnName("sp_ad_bnft")
                    .HasMaxLength(100);

                entity.Property(e => e.SpAddrCity)
                    .HasColumnName("sp_addr_city")
                    .HasMaxLength(100);

                entity.Property(e => e.SpAddrLn1)
                    .HasColumnName("sp_addr_ln_1")
                    .HasMaxLength(100);

                entity.Property(e => e.SpAddrLn2)
                    .HasColumnName("sp_addr_ln_2")
                    .HasMaxLength(100);

                entity.Property(e => e.SpAddrState)
                    .HasColumnName("sp_addr_state")
                    .HasMaxLength(100);

                entity.Property(e => e.SpAddrZip)
                    .HasColumnName("sp_addr_zip")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneDob)
                    .HasColumnName("sp_cont_bene_dob")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneDob01)
                    .HasColumnName("sp_cont_bene_dob_01")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneDob02)
                    .HasColumnName("sp_cont_bene_dob_02")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneDob03)
                    .HasColumnName("sp_cont_bene_dob_03")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneDob04)
                    .HasColumnName("sp_cont_bene_dob_04")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneDob05)
                    .HasColumnName("sp_cont_bene_dob_05")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneDob06)
                    .HasColumnName("sp_cont_bene_dob_06")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneDob07)
                    .HasColumnName("sp_cont_bene_dob_07")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneDob08)
                    .HasColumnName("sp_cont_bene_dob_08")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneDob09)
                    .HasColumnName("sp_cont_bene_dob_09")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneDob10)
                    .HasColumnName("sp_cont_bene_dob_10")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneNm)
                    .HasColumnName("sp_cont_bene_nm")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneNm01)
                    .HasColumnName("sp_cont_bene_nm_01")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneNm02)
                    .HasColumnName("sp_cont_bene_nm_02")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneNm03)
                    .HasColumnName("sp_cont_bene_nm_03")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneNm04)
                    .HasColumnName("sp_cont_bene_nm_04")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneNm05)
                    .HasColumnName("sp_cont_bene_nm_05")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneNm06)
                    .HasColumnName("sp_cont_bene_nm_06")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneNm07)
                    .HasColumnName("sp_cont_bene_nm_07")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneNm08)
                    .HasColumnName("sp_cont_bene_nm_08")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneNm09)
                    .HasColumnName("sp_cont_bene_nm_09")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneNm10)
                    .HasColumnName("sp_cont_bene_nm_10")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBenePercent01)
                    .HasColumnName("sp_cont_bene_percent_01")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBenePercent02)
                    .HasColumnName("sp_cont_bene_percent_02")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBenePercent03)
                    .HasColumnName("sp_cont_bene_percent_03")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBenePercent04)
                    .HasColumnName("sp_cont_bene_percent_04")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBenePercent05)
                    .HasColumnName("sp_cont_bene_percent_05")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBenePercent06)
                    .HasColumnName("sp_cont_bene_percent_06")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBenePercent07)
                    .HasColumnName("sp_cont_bene_percent_07")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBenePercent08)
                    .HasColumnName("sp_cont_bene_percent_08")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBenePercent09)
                    .HasColumnName("sp_cont_bene_percent_09")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBenePercent10)
                    .HasColumnName("sp_cont_bene_percent_10")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneRel)
                    .HasColumnName("sp_cont_bene_rel")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneRel01)
                    .HasColumnName("sp_cont_bene_rel_01")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneRel02)
                    .HasColumnName("sp_cont_bene_rel_02")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneRel03)
                    .HasColumnName("sp_cont_bene_rel_03")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneRel04)
                    .HasColumnName("sp_cont_bene_rel_04")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneRel05)
                    .HasColumnName("sp_cont_bene_rel_05")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneRel06)
                    .HasColumnName("sp_cont_bene_rel_06")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneRel07)
                    .HasColumnName("sp_cont_bene_rel_07")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneRel08)
                    .HasColumnName("sp_cont_bene_rel_08")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneRel09)
                    .HasColumnName("sp_cont_bene_rel_09")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneRel10)
                    .HasColumnName("sp_cont_bene_rel_10")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneSsn)
                    .HasColumnName("sp_cont_bene_ssn")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneSsn01)
                    .HasColumnName("sp_cont_bene_ssn_01")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneSsn02)
                    .HasColumnName("sp_cont_bene_ssn_02")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneSsn03)
                    .HasColumnName("sp_cont_bene_ssn_03")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneSsn04)
                    .HasColumnName("sp_cont_bene_ssn_04")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneSsn05)
                    .HasColumnName("sp_cont_bene_ssn_05")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneSsn06)
                    .HasColumnName("sp_cont_bene_ssn_06")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneSsn07)
                    .HasColumnName("sp_cont_bene_ssn_07")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneSsn08)
                    .HasColumnName("sp_cont_bene_ssn_08")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneSsn09)
                    .HasColumnName("sp_cont_bene_ssn_09")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneSsn10)
                    .HasColumnName("sp_cont_bene_ssn_10")
                    .HasMaxLength(100);

                entity.Property(e => e.SpCovAmnt)
                    .HasColumnName("sp_cov_amnt")
                    .HasMaxLength(100);

                entity.Property(e => e.SpCovTyp)
                    .HasColumnName("sp_cov_typ")
                    .HasMaxLength(100);

                entity.Property(e => e.SpCovTypDesc)
                    .HasColumnName("sp_cov_typ_desc")
                    .HasMaxLength(100);

                entity.Property(e => e.SpDisabled6Months)
                    .HasColumnName("sp_disabled_6_months")
                    .HasMaxLength(100);

                entity.Property(e => e.SpDob)
                    .HasColumnName("sp_dob")
                    .HasMaxLength(100);

                entity.Property(e => e.SpEmail)
                    .HasColumnName("sp_email")
                    .HasMaxLength(100);

                entity.Property(e => e.SpFaceAmtMonBnft)
                    .HasColumnName("sp_face_amt_mon_bnft")
                    .HasMaxLength(100);

                entity.Property(e => e.SpFname)
                    .HasColumnName("sp_fname")
                    .HasMaxLength(100);

                entity.Property(e => e.SpGndr)
                    .HasColumnName("sp_gndr")
                    .HasMaxLength(100);

                entity.Property(e => e.SpHandicppd)
                    .HasColumnName("sp_handicppd")
                    .HasMaxLength(100);

                entity.Property(e => e.SpHght)
                    .HasColumnName("sp_hght")
                    .HasMaxLength(100);

                entity.Property(e => e.SpLname)
                    .HasColumnName("sp_lname")
                    .HasMaxLength(100);

                entity.Property(e => e.SpMidInit)
                    .HasColumnName("sp_mid_init")
                    .HasMaxLength(100);

                entity.Property(e => e.SpOccClass)
                    .HasColumnName("sp_occ_class")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPlanCd)
                    .HasColumnName("sp_plan_cd")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPlanFrmCd)
                    .HasColumnName("sp_plan_frm_cd")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPlanOptn)
                    .HasColumnName("sp_plan_optn")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrem)
                    .HasColumnName("sp_prem")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneAddrCty)
                    .HasColumnName("sp_prim_bene_addr_cty")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneAddrLn1)
                    .HasColumnName("sp_prim_bene_addr_ln1")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneAddrLn2)
                    .HasColumnName("sp_prim_bene_addr_ln2")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneAddrState)
                    .HasColumnName("sp_prim_bene_addr_state")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneAddrZip)
                    .HasColumnName("sp_prim_bene_addr_zip")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneDob)
                    .HasColumnName("sp_prim_bene_dob")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneDob02)
                    .HasColumnName("sp_prim_bene_dob_02")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneDob03)
                    .HasColumnName("sp_prim_bene_dob_03")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneDob04)
                    .HasColumnName("sp_prim_bene_dob_04")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneDob05)
                    .HasColumnName("sp_prim_bene_dob_05")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneDob06)
                    .HasColumnName("sp_prim_bene_dob_06")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneDob07)
                    .HasColumnName("sp_prim_bene_dob_07")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneDob08)
                    .HasColumnName("sp_prim_bene_dob_08")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneDob09)
                    .HasColumnName("sp_prim_bene_dob_09")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneDob10)
                    .HasColumnName("sp_prim_bene_dob_10")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneNm)
                    .HasColumnName("sp_prim_bene_nm")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneNm02)
                    .HasColumnName("sp_prim_bene_nm_02")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneNm03)
                    .HasColumnName("sp_prim_bene_nm_03")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneNm04)
                    .HasColumnName("sp_prim_bene_nm_04")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneNm05)
                    .HasColumnName("sp_prim_bene_nm_05")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneNm06)
                    .HasColumnName("sp_prim_bene_nm_06")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneNm07)
                    .HasColumnName("sp_prim_bene_nm_07")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneNm08)
                    .HasColumnName("sp_prim_bene_nm_08")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneNm09)
                    .HasColumnName("sp_prim_bene_nm_09")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneNm10)
                    .HasColumnName("sp_prim_bene_nm_10")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBenePercent)
                    .HasColumnName("sp_prim_bene_percent")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBenePercent02)
                    .HasColumnName("sp_prim_bene_percent_02")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBenePercent03)
                    .HasColumnName("sp_prim_bene_percent_03")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBenePercent04)
                    .HasColumnName("sp_prim_bene_percent_04")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBenePercent05)
                    .HasColumnName("sp_prim_bene_percent_05")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBenePercent06)
                    .HasColumnName("sp_prim_bene_percent_06")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBenePercent07)
                    .HasColumnName("sp_prim_bene_percent_07")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBenePercent08)
                    .HasColumnName("sp_prim_bene_percent_08")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBenePercent09)
                    .HasColumnName("sp_prim_bene_percent_09")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBenePercent10)
                    .HasColumnName("sp_prim_bene_percent_10")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneRel)
                    .HasColumnName("sp_prim_bene_rel")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneRel02)
                    .HasColumnName("sp_prim_bene_rel_02")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneRel03)
                    .HasColumnName("sp_prim_bene_rel_03")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneRel04)
                    .HasColumnName("sp_prim_bene_rel_04")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneRel05)
                    .HasColumnName("sp_prim_bene_rel_05")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneRel06)
                    .HasColumnName("sp_prim_bene_rel_06")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneRel07)
                    .HasColumnName("sp_prim_bene_rel_07")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneRel08)
                    .HasColumnName("sp_prim_bene_rel_08")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneRel09)
                    .HasColumnName("sp_prim_bene_rel_09")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneRel10)
                    .HasColumnName("sp_prim_bene_rel_10")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneSsn)
                    .HasColumnName("sp_prim_bene_ssn")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneSsn02)
                    .HasColumnName("sp_prim_bene_ssn_02")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneSsn03)
                    .HasColumnName("sp_prim_bene_ssn_03")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneSsn04)
                    .HasColumnName("sp_prim_bene_ssn_04")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneSsn05)
                    .HasColumnName("sp_prim_bene_ssn_05")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneSsn06)
                    .HasColumnName("sp_prim_bene_ssn_06")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneSsn07)
                    .HasColumnName("sp_prim_bene_ssn_07")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneSsn08)
                    .HasColumnName("sp_prim_bene_ssn_08")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneSsn09)
                    .HasColumnName("sp_prim_bene_ssn_09")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneSsn10)
                    .HasColumnName("sp_prim_bene_ssn_10")
                    .HasMaxLength(100);

                entity.Property(e => e.SpQstn1)
                    .HasColumnName("sp_qstn_1")
                    .HasMaxLength(100);

                entity.Property(e => e.SpQstn10)
                    .HasColumnName("sp_qstn_10")
                    .HasMaxLength(100);

                entity.Property(e => e.SpQstn1a)
                    .HasColumnName("sp_qstn_1a")
                    .HasMaxLength(100);

                entity.Property(e => e.SpQstn1b)
                    .HasColumnName("sp_qstn_1b")
                    .HasMaxLength(100);

                entity.Property(e => e.SpQstn2)
                    .HasColumnName("sp_qstn_2")
                    .HasMaxLength(100);

                entity.Property(e => e.SpQstn3)
                    .HasColumnName("sp_qstn_3")
                    .HasMaxLength(100);

                entity.Property(e => e.SpQstn3a)
                    .HasColumnName("sp_qstn_3a")
                    .HasMaxLength(100);

                entity.Property(e => e.SpQstn3b)
                    .HasColumnName("sp_qstn_3b")
                    .HasMaxLength(100);

                entity.Property(e => e.SpQstn3c)
                    .HasColumnName("sp_qstn_3c")
                    .HasMaxLength(100);

                entity.Property(e => e.SpQstn3d)
                    .HasColumnName("sp_qstn_3d")
                    .HasMaxLength(100);

                entity.Property(e => e.SpQstn3e)
                    .HasColumnName("sp_qstn_3e")
                    .HasMaxLength(100);

                entity.Property(e => e.SpQstn4)
                    .HasColumnName("sp_qstn_4")
                    .HasMaxLength(100);

                entity.Property(e => e.SpQstn5)
                    .HasColumnName("sp_qstn_5")
                    .HasMaxLength(100);

                entity.Property(e => e.SpQstn6)
                    .HasColumnName("sp_qstn_6")
                    .HasMaxLength(100);

                entity.Property(e => e.SpQstn7)
                    .HasColumnName("sp_qstn_7")
                    .HasMaxLength(100);

                entity.Property(e => e.SpQstn8)
                    .HasColumnName("sp_qstn_8")
                    .HasMaxLength(100);

                entity.Property(e => e.SpQstn9)
                    .HasColumnName("sp_qstn_9")
                    .HasMaxLength(100);

                entity.Property(e => e.SpQualityOfLife)
                    .HasColumnName("sp_quality_of_life")
                    .HasMaxLength(100);

                entity.Property(e => e.SpRiderAir)
                    .HasColumnName("sp_rider_air")
                    .HasMaxLength(100);

                entity.Property(e => e.SpRiderQol3)
                    .HasColumnName("sp_rider_qol3")
                    .HasMaxLength(100);

                entity.Property(e => e.SpRiderQol4)
                    .HasColumnName("sp_rider_qol4")
                    .HasMaxLength(100);

                entity.Property(e => e.SpRiderWp)
                    .HasColumnName("sp_rider_wp")
                    .HasMaxLength(100);

                entity.Property(e => e.SpSmkrNoSmkr)
                    .HasColumnName("sp_smkr_no_smkr")
                    .HasMaxLength(100);

                entity.Property(e => e.SpSsn)
                    .HasColumnName("sp_ssn")
                    .HasMaxLength(100);

                entity.Property(e => e.SpTreated6Months)
                    .HasColumnName("sp_treated_6_months")
                    .HasMaxLength(100);

                entity.Property(e => e.SpWaiverOfPrem)
                    .HasColumnName("sp_waiver_of_prem")
                    .HasMaxLength(100);

                entity.Property(e => e.SpWght)
                    .HasColumnName("sp_wght")
                    .HasMaxLength(100);

                entity.Property(e => e.StatusFlg)
                    .HasColumnName("status_flg")
                    .HasMaxLength(1);

                entity.Property(e => e.TimeStamp)
                    .HasColumnName("time_stamp")
                    .HasMaxLength(100);

                entity.Property(e => e.UsrTkn)
                    .HasColumnName("usr_tkn")
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<EppPartnersDataChangeStatus>(entity =>
            {
                entity.HasKey(e => e.PartnersdatastatusId)
                    .HasName("PK32");

                entity.ToTable("EPP_PartnersDataChangeStatus");

                entity.Property(e => e.PartnersdatastatusId)
                    .HasColumnName("partnersdatastatus_id")
                    .ValueGeneratedNever();

                entity.Property(e => e.ChangeType)
                    .HasColumnName("change_type")
                    .HasMaxLength(4);

                entity.Property(e => e.CrtdBy)
                    .IsRequired()
                    .HasColumnName("crtd_by")
                    .HasMaxLength(50);

                entity.Property(e => e.CrtdDt)
                    .HasColumnName("crtd_dt")
                    .HasColumnType("date");

                entity.Property(e => e.LstUpdtBy)
                    .HasColumnName("lst_updt_by")
                    .HasMaxLength(50);

                entity.Property(e => e.LstUpdtDt)
                    .HasColumnName("lst_updt_dt")
                    .HasColumnType("date");

                entity.Property(e => e.RcrdId).HasColumnName("rcrd_id");

                entity.HasOne(d => d.Rcrd)
                    .WithMany(p => p.EppPartnersDataChangeStatus)
                    .HasForeignKey(d => d.RcrdId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("RefEPP_PartnersData44");
            });

            modelBuilder.Entity<EppPartnersDataErr>(entity =>
            {
                entity.HasKey(e => e.RcrdId)
                    .HasName("PK1_PartnersData_ERR");

                entity.ToTable("EPP_PartnersData_ERR");

                entity.Property(e => e.RcrdId)
                    .HasColumnName("rcrd_id")
                    .ValueGeneratedNever();

                entity.Property(e => e.AccidntCat)
                    .HasColumnName("accidnt_cat")
                    .HasMaxLength(100);

                entity.Property(e => e.ActivlyAtWrk)
                    .HasColumnName("activly_at_wrk")
                    .HasMaxLength(100);

                entity.Property(e => e.AgentInitialsTxt)
                    .HasColumnName("agent_initials_txt")
                    .HasMaxLength(100);

                entity.Property(e => e.AgntCd1)
                    .HasColumnName("agnt_cd_1")
                    .HasMaxLength(100);

                entity.Property(e => e.AgntCd2)
                    .HasColumnName("agnt_cd_2")
                    .HasMaxLength(100);

                entity.Property(e => e.AgntCd3)
                    .HasColumnName("agnt_cd_3")
                    .HasMaxLength(100);

                entity.Property(e => e.AgntCd4)
                    .HasColumnName("agnt_cd_4")
                    .HasMaxLength(100);

                entity.Property(e => e.AgntCommSplit1)
                    .HasColumnName("agnt_comm_split_1")
                    .HasMaxLength(100);

                entity.Property(e => e.AgntCommSplit2)
                    .HasColumnName("agnt_comm_split_2")
                    .HasMaxLength(100);

                entity.Property(e => e.AgntCommSplit3)
                    .HasColumnName("agnt_comm_split_3")
                    .HasMaxLength(100);

                entity.Property(e => e.AgntCommSplit4)
                    .HasColumnName("agnt_comm_split_4")
                    .HasMaxLength(100);

                entity.Property(e => e.AgntNm)
                    .HasColumnName("agnt_nm")
                    .HasMaxLength(100);

                entity.Property(e => e.AgntSigTxt1)
                    .HasColumnName("agnt_sig_txt_1")
                    .HasMaxLength(100);

                entity.Property(e => e.AgntSigTxt2)
                    .HasColumnName("agnt_sig_txt_2")
                    .HasMaxLength(100);

                entity.Property(e => e.AgntSigTxt3)
                    .HasColumnName("agnt_sig_txt_3")
                    .HasMaxLength(100);

                entity.Property(e => e.AgntSigTxt4)
                    .HasColumnName("agnt_sig_txt_4")
                    .HasMaxLength(100);

                entity.Property(e => e.Agntsub1)
                    .HasColumnName("agntsub_1")
                    .HasMaxLength(100);

                entity.Property(e => e.Agntsub2)
                    .HasColumnName("agntsub_2")
                    .HasMaxLength(100);

                entity.Property(e => e.Agntsub3)
                    .HasColumnName("agntsub_3")
                    .HasMaxLength(100);

                entity.Property(e => e.Agntsub4)
                    .HasColumnName("agntsub_4")
                    .HasMaxLength(100);

                entity.Property(e => e.ApplicationDt)
                    .HasColumnName("application_dt")
                    .HasMaxLength(100);

                entity.Property(e => e.Basplan)
                    .HasColumnName("basplan")
                    .HasMaxLength(100);

                entity.Property(e => e.BillingCtgry)
                    .HasColumnName("billing_ctgry")
                    .HasMaxLength(100);

                entity.Property(e => e.ChAdBnft01)
                    .HasColumnName("ch_ad_bnft_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChAdBnft02)
                    .HasColumnName("ch_ad_bnft_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChAdBnft03)
                    .HasColumnName("ch_ad_bnft_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChAdBnft04)
                    .HasColumnName("ch_ad_bnft_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChAdBnft05)
                    .HasColumnName("ch_ad_bnft_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChAdBnft06)
                    .HasColumnName("ch_ad_bnft_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChAdBnft07)
                    .HasColumnName("ch_ad_bnft_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChCovAmnt)
                    .HasColumnName("ch_cov_amnt")
                    .HasMaxLength(100);

                entity.Property(e => e.ChCovAmnt01)
                    .HasColumnName("ch_cov_amnt_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChCovAmnt02)
                    .HasColumnName("ch_cov_amnt_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChCovAmnt03)
                    .HasColumnName("ch_cov_amnt_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChCovAmnt04)
                    .HasColumnName("ch_cov_amnt_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChCovAmnt05)
                    .HasColumnName("ch_cov_amnt_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChCovAmnt06)
                    .HasColumnName("ch_cov_amnt_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChCovTyp)
                    .HasColumnName("ch_cov_typ")
                    .HasMaxLength(100);

                entity.Property(e => e.ChCovTyp01)
                    .HasColumnName("ch_cov_typ_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChCovTyp02)
                    .HasColumnName("ch_cov_typ_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChCovTyp03)
                    .HasColumnName("ch_cov_typ_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChCovTyp04)
                    .HasColumnName("ch_cov_typ_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChCovTyp05)
                    .HasColumnName("ch_cov_typ_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChCovTyp06)
                    .HasColumnName("ch_cov_typ_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChCovTyp07)
                    .HasColumnName("ch_cov_typ_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChDob01)
                    .HasColumnName("ch_dob_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChDob02)
                    .HasColumnName("ch_dob_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChDob03)
                    .HasColumnName("ch_dob_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChDob04)
                    .HasColumnName("ch_dob_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChDob05)
                    .HasColumnName("ch_dob_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChDob06)
                    .HasColumnName("ch_dob_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChDob07)
                    .HasColumnName("ch_dob_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChFaceAmtMonBnft01)
                    .HasColumnName("ch_face_amt_mon_bnft_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChFaceAmtMonBnft02)
                    .HasColumnName("ch_face_amt_mon_bnft_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChFaceAmtMonBnft03)
                    .HasColumnName("ch_face_amt_mon_bnft_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChFaceAmtMonBnft04)
                    .HasColumnName("ch_face_amt_mon_bnft_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChFaceAmtMonBnft05)
                    .HasColumnName("ch_face_amt_mon_bnft_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChFaceAmtMonBnft06)
                    .HasColumnName("ch_face_amt_mon_bnft_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChFaceAmtMonBnft07)
                    .HasColumnName("ch_face_amt_mon_bnft_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChFname01)
                    .HasColumnName("ch_fname_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChFname02)
                    .HasColumnName("ch_fname_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChFname03)
                    .HasColumnName("ch_fname_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChFname04)
                    .HasColumnName("ch_fname_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChFname05)
                    .HasColumnName("ch_fname_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChFname06)
                    .HasColumnName("ch_fname_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChFname07)
                    .HasColumnName("ch_fname_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChGndr01)
                    .HasColumnName("ch_gndr_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChGndr02)
                    .HasColumnName("ch_gndr_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChGndr03)
                    .HasColumnName("ch_gndr_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChGndr04)
                    .HasColumnName("ch_gndr_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChGndr05)
                    .HasColumnName("ch_gndr_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChGndr06)
                    .HasColumnName("ch_gndr_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChGndr07)
                    .HasColumnName("ch_gndr_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChHandcappd05)
                    .HasColumnName("ch_handcappd_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChHandcappd07)
                    .HasColumnName("ch_handcappd_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChHandcppd03)
                    .HasColumnName("ch_handcppd_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChHandcppd04)
                    .HasColumnName("ch_handcppd_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChHandcppd06)
                    .HasColumnName("ch_handcppd_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChHandicppd01)
                    .HasColumnName("ch_handicppd_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChHandicppd02)
                    .HasColumnName("ch_handicppd_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChHght01)
                    .HasColumnName("ch_hght_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChHght02)
                    .HasColumnName("ch_hght_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChHght03)
                    .HasColumnName("ch_hght_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChHght04)
                    .HasColumnName("ch_hght_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChHght05)
                    .HasColumnName("ch_hght_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChHght06)
                    .HasColumnName("ch_hght_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChHght07)
                    .HasColumnName("ch_hght_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChLname01)
                    .HasColumnName("ch_lname_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChLname02)
                    .HasColumnName("ch_lname_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChLname03)
                    .HasColumnName("ch_lname_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChLname04)
                    .HasColumnName("ch_lname_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChLname06)
                    .HasColumnName("ch_lname_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChLname07)
                    .HasColumnName("ch_lname_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChLstNam05)
                    .HasColumnName("ch_lst_nam_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChMidInit01)
                    .HasColumnName("ch_mid_init_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChMidInit02)
                    .HasColumnName("ch_mid_init_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChMidInit03)
                    .HasColumnName("ch_mid_init_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChMidInit04)
                    .HasColumnName("ch_mid_init_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChMidInit05)
                    .HasColumnName("ch_mid_init_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChMidInit06)
                    .HasColumnName("ch_mid_init_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChMidInit07)
                    .HasColumnName("ch_mid_init_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChOccClass01)
                    .HasColumnName("ch_occ_class_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChOccClass02)
                    .HasColumnName("ch_occ_class_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChOccClass03)
                    .HasColumnName("ch_occ_class_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChOccClass04)
                    .HasColumnName("ch_occ_class_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChOccClass05)
                    .HasColumnName("ch_occ_class_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChOccClass06)
                    .HasColumnName("ch_occ_class_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChOccClass07)
                    .HasColumnName("ch_occ_class_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPlanCd)
                    .HasColumnName("ch_plan_cd")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPlanfrmcd01)
                    .HasColumnName("ch_planfrmcd_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPlanfrmcd02)
                    .HasColumnName("ch_planfrmcd_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPlanfrmcd03)
                    .HasColumnName("ch_planfrmcd_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPlanoptn01)
                    .HasColumnName("ch_planoptn_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPlanoptn02)
                    .HasColumnName("ch_planoptn_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPlanoptn03)
                    .HasColumnName("ch_planoptn_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrem01)
                    .HasColumnName("ch_prem_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrem02)
                    .HasColumnName("ch_prem_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrem03)
                    .HasColumnName("ch_prem_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrem04)
                    .HasColumnName("ch_prem_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrem05)
                    .HasColumnName("ch_prem_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrem06)
                    .HasColumnName("ch_prem_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrem07)
                    .HasColumnName("ch_prem_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneAddrCty)
                    .HasColumnName("ch_prim_bene_addr_cty")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneAddrLn1)
                    .HasColumnName("ch_prim_bene_addr_ln1")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneAddrLn2)
                    .HasColumnName("ch_prim_bene_addr_ln2")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneAddrState)
                    .HasColumnName("ch_prim_bene_addr_state")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneAddrZip)
                    .HasColumnName("ch_prim_bene_addr_zip")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneNm01)
                    .HasColumnName("ch_prim_bene_nm_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneNm02)
                    .HasColumnName("ch_prim_bene_nm_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneNm03)
                    .HasColumnName("ch_prim_bene_nm_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneNm04)
                    .HasColumnName("ch_prim_bene_nm_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneNm05)
                    .HasColumnName("ch_prim_bene_nm_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneNm06)
                    .HasColumnName("ch_prim_bene_nm_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneNm07)
                    .HasColumnName("ch_prim_bene_nm_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBenePercent01)
                    .HasColumnName("ch_prim_bene_percent_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneRel01)
                    .HasColumnName("ch_prim_bene_rel_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneRel02)
                    .HasColumnName("ch_prim_bene_rel_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneRel03)
                    .HasColumnName("ch_prim_bene_rel_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneRel04)
                    .HasColumnName("ch_prim_bene_rel_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneRel05)
                    .HasColumnName("ch_prim_bene_rel_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneRel06)
                    .HasColumnName("ch_prim_bene_rel_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneRel07)
                    .HasColumnName("ch_prim_bene_rel_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneSsn01)
                    .HasColumnName("ch_prim_bene_ssn_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneSsn02)
                    .HasColumnName("ch_prim_bene_ssn_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneSsn03)
                    .HasColumnName("ch_prim_bene_ssn_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneSsn04)
                    .HasColumnName("ch_prim_bene_ssn_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneSsn05)
                    .HasColumnName("ch_prim_bene_ssn_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneSsn06)
                    .HasColumnName("ch_prim_bene_ssn_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChPrimBeneSsn07)
                    .HasColumnName("ch_prim_bene_ssn_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1001)
                    .HasColumnName("ch_qstn_10_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1002)
                    .HasColumnName("ch_qstn_10_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1003)
                    .HasColumnName("ch_qstn_10_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1004)
                    .HasColumnName("ch_qstn_10_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1005)
                    .HasColumnName("ch_qstn_10_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1006)
                    .HasColumnName("ch_qstn_10_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn101)
                    .HasColumnName("ch_qstn_1_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn102)
                    .HasColumnName("ch_qstn_1_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn103)
                    .HasColumnName("ch_qstn_1_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn104)
                    .HasColumnName("ch_qstn_1_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn105)
                    .HasColumnName("ch_qstn_1_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn106)
                    .HasColumnName("ch_qstn_1_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn107)
                    .HasColumnName("ch_qstn_1_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1a01)
                    .HasColumnName("ch_qstn_1a_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1a02)
                    .HasColumnName("ch_qstn_1a_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1a03)
                    .HasColumnName("ch_qstn_1a_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1a04)
                    .HasColumnName("ch_qstn_1a_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1a05)
                    .HasColumnName("ch_qstn_1a_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1a06)
                    .HasColumnName("ch_qstn_1a_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1a07)
                    .HasColumnName("ch_qstn_1a_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1b01)
                    .HasColumnName("ch_qstn_1b_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1b02)
                    .HasColumnName("ch_qstn_1b_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1b03)
                    .HasColumnName("ch_qstn_1b_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1b04)
                    .HasColumnName("ch_qstn_1b_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1b05)
                    .HasColumnName("ch_qstn_1b_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1b06)
                    .HasColumnName("ch_qstn_1b_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn1b07)
                    .HasColumnName("ch_qstn_1b_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn201)
                    .HasColumnName("ch_qstn_2_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn202)
                    .HasColumnName("ch_qstn_2_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn203)
                    .HasColumnName("ch_qstn_2_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn204)
                    .HasColumnName("ch_qstn_2_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn205)
                    .HasColumnName("ch_qstn_2_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn206)
                    .HasColumnName("ch_qstn_2_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn207)
                    .HasColumnName("ch_qstn_2_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn301)
                    .HasColumnName("ch_qstn_3_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn302)
                    .HasColumnName("ch_qstn_3_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn303)
                    .HasColumnName("ch_qstn_3_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn304)
                    .HasColumnName("ch_qstn_3_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn305)
                    .HasColumnName("ch_qstn_3_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn306)
                    .HasColumnName("ch_qstn_3_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn307)
                    .HasColumnName("ch_qstn_3_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3a01)
                    .HasColumnName("ch_qstn_3a_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3a02)
                    .HasColumnName("ch_qstn_3a_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3a03)
                    .HasColumnName("ch_qstn_3a_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3a04)
                    .HasColumnName("ch_qstn_3a_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3a05)
                    .HasColumnName("ch_qstn_3a_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3a06)
                    .HasColumnName("ch_qstn_3a_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3a07)
                    .HasColumnName("ch_qstn_3a_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3b01)
                    .HasColumnName("ch_qstn_3b_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3b02)
                    .HasColumnName("ch_qstn_3b_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3b03)
                    .HasColumnName("ch_qstn_3b_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3b04)
                    .HasColumnName("ch_qstn_3b_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3b05)
                    .HasColumnName("ch_qstn_3b_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3b06)
                    .HasColumnName("ch_qstn_3b_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3b07)
                    .HasColumnName("ch_qstn_3b_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3c01)
                    .HasColumnName("ch_qstn_3c_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3c02)
                    .HasColumnName("ch_qstn_3c_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3c03)
                    .HasColumnName("ch_qstn_3c_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3c04)
                    .HasColumnName("ch_qstn_3c_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3c05)
                    .HasColumnName("ch_qstn_3c_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3c06)
                    .HasColumnName("ch_qstn_3c_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3c07)
                    .HasColumnName("ch_qstn_3c_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3d01)
                    .HasColumnName("ch_qstn_3d_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3d02)
                    .HasColumnName("ch_qstn_3d_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3d03)
                    .HasColumnName("ch_qstn_3d_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3d04)
                    .HasColumnName("ch_qstn_3d_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3d05)
                    .HasColumnName("ch_qstn_3d_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3d06)
                    .HasColumnName("ch_qstn_3d_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3d07)
                    .HasColumnName("ch_qstn_3d_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3e01)
                    .HasColumnName("ch_qstn_3e_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3e02)
                    .HasColumnName("ch_qstn_3e_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3e03)
                    .HasColumnName("ch_qstn_3e_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3e04)
                    .HasColumnName("ch_qstn_3e_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3e05)
                    .HasColumnName("ch_qstn_3e_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3e06)
                    .HasColumnName("ch_qstn_3e_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn3e07)
                    .HasColumnName("ch_qstn_3e_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn401)
                    .HasColumnName("ch_qstn_4_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn402)
                    .HasColumnName("ch_qstn_4_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn403)
                    .HasColumnName("ch_qstn_4_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn404)
                    .HasColumnName("ch_qstn_4_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn405)
                    .HasColumnName("ch_qstn_4_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn406)
                    .HasColumnName("ch_qstn_4_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn407)
                    .HasColumnName("ch_qstn_4_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn501)
                    .HasColumnName("ch_qstn_5_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn502)
                    .HasColumnName("ch_qstn_5_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn503)
                    .HasColumnName("ch_qstn_5_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn504)
                    .HasColumnName("ch_qstn_5_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn505)
                    .HasColumnName("ch_qstn_5_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn506)
                    .HasColumnName("ch_qstn_5_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn507)
                    .HasColumnName("ch_qstn_5_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn601)
                    .HasColumnName("ch_qstn_6_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn602)
                    .HasColumnName("ch_qstn_6_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn603)
                    .HasColumnName("ch_qstn_6_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn604)
                    .HasColumnName("ch_qstn_6_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn605)
                    .HasColumnName("ch_qstn_6_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn606)
                    .HasColumnName("ch_qstn_6_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn701)
                    .HasColumnName("ch_qstn_7_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn702)
                    .HasColumnName("ch_qstn_7_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn703)
                    .HasColumnName("ch_qstn_7_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn704)
                    .HasColumnName("ch_qstn_7_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn705)
                    .HasColumnName("ch_qstn_7_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn706)
                    .HasColumnName("ch_qstn_7_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn801)
                    .HasColumnName("ch_qstn_8_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn802)
                    .HasColumnName("ch_qstn_8_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn803)
                    .HasColumnName("ch_qstn_8_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn804)
                    .HasColumnName("ch_qstn_8_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn805)
                    .HasColumnName("ch_qstn_8_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn806)
                    .HasColumnName("ch_qstn_8_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn901)
                    .HasColumnName("ch_qstn_9_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn902)
                    .HasColumnName("ch_qstn_9_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn903)
                    .HasColumnName("ch_qstn_9_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn904)
                    .HasColumnName("ch_qstn_9_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn905)
                    .HasColumnName("ch_qstn_9_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChQstn906)
                    .HasColumnName("ch_qstn_9_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChSsn01)
                    .HasColumnName("ch_ssn_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChSsn02)
                    .HasColumnName("ch_ssn_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChSsn03)
                    .HasColumnName("ch_ssn_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChSsn04)
                    .HasColumnName("ch_ssn_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChSsn05)
                    .HasColumnName("ch_ssn_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChSsn06)
                    .HasColumnName("ch_ssn_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChSsn07)
                    .HasColumnName("ch_ssn_07")
                    .HasMaxLength(100);

                entity.Property(e => e.ChWght01)
                    .HasColumnName("ch_wght_01")
                    .HasMaxLength(100);

                entity.Property(e => e.ChWght02)
                    .HasColumnName("ch_wght_02")
                    .HasMaxLength(100);

                entity.Property(e => e.ChWght03)
                    .HasColumnName("ch_wght_03")
                    .HasMaxLength(100);

                entity.Property(e => e.ChWght04)
                    .HasColumnName("ch_wght_04")
                    .HasMaxLength(100);

                entity.Property(e => e.ChWght05)
                    .HasColumnName("ch_wght_05")
                    .HasMaxLength(100);

                entity.Property(e => e.ChWght06)
                    .HasColumnName("ch_wght_06")
                    .HasMaxLength(100);

                entity.Property(e => e.ChWght07)
                    .HasColumnName("ch_wght_07")
                    .HasMaxLength(100);

                entity.Property(e => e.CrtdBy)
                    .IsRequired()
                    .HasColumnName("crtd_by")
                    .HasMaxLength(10);

                entity.Property(e => e.CrtdDt)
                    .HasColumnName("crtd_dt")
                    .HasColumnType("date");

                entity.Property(e => e.CvrdPrsn)
                    .HasColumnName("cvrd_prsn")
                    .HasMaxLength(100);

                entity.Property(e => e.EffctvDt)
                    .HasColumnName("effctv_dt")
                    .HasMaxLength(100);

                entity.Property(e => e.EmailAddr)
                    .HasColumnName("email_addr")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpAdBnft)
                    .HasColumnName("emp_ad_bnft")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpAddCity)
                    .HasColumnName("emp_add_city")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpAddrLn1)
                    .HasColumnName("emp_addr_ln_1")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpAddrLn2)
                    .HasColumnName("emp_addr_ln_2")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpAddrState)
                    .HasColumnName("emp_addr_state")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpAddrZip)
                    .HasColumnName("emp_addr_zip")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneAddrCty)
                    .HasColumnName("emp_cont_bene_addr_cty")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneAddrLn1)
                    .HasColumnName("emp_cont_bene_addr_ln1")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneAddrLn2)
                    .HasColumnName("emp_cont_bene_addr_ln2")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneAddrState)
                    .HasColumnName("emp_cont_bene_addr_state")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneAddrZp)
                    .HasColumnName("emp_cont_bene_addr_zp")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneDob)
                    .HasColumnName("emp_cont_bene_dob")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneDob01)
                    .HasColumnName("emp_cont_bene_dob_01")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneDob02)
                    .HasColumnName("emp_cont_bene_dob_02")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneDob03)
                    .HasColumnName("emp_cont_bene_dob_03")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneDob04)
                    .HasColumnName("emp_cont_bene_dob_04")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneDob05)
                    .HasColumnName("emp_cont_bene_dob_05")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneDob06)
                    .HasColumnName("emp_cont_bene_dob_06")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneDob07)
                    .HasColumnName("emp_cont_bene_dob_07")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneDob08)
                    .HasColumnName("emp_cont_bene_dob_08")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneDob09)
                    .HasColumnName("emp_cont_bene_dob_09")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneDob10)
                    .HasColumnName("emp_cont_bene_dob_10")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneNm)
                    .HasColumnName("emp_cont_bene_nm")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneNm01)
                    .HasColumnName("emp_cont_bene_nm_01")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneNm02)
                    .HasColumnName("emp_cont_bene_nm_02")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneNm03)
                    .HasColumnName("emp_cont_bene_nm_03")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneNm04)
                    .HasColumnName("emp_cont_bene_nm_04")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneNm05)
                    .HasColumnName("emp_cont_bene_nm_05")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneNm06)
                    .HasColumnName("emp_cont_bene_nm_06")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneNm07)
                    .HasColumnName("emp_cont_bene_nm_07")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneNm08)
                    .HasColumnName("emp_cont_bene_nm_08")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneNm09)
                    .HasColumnName("emp_cont_bene_nm_09")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneNm10)
                    .HasColumnName("emp_cont_bene_nm_10")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBenePercent)
                    .HasColumnName("emp_cont_bene_percent")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBenePercent01)
                    .HasColumnName("emp_cont_bene_percent_01")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBenePercent02)
                    .HasColumnName("emp_cont_bene_percent_02")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBenePercent03)
                    .HasColumnName("emp_cont_bene_percent_03")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBenePercent04)
                    .HasColumnName("emp_cont_bene_percent_04")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBenePercent05)
                    .HasColumnName("emp_cont_bene_percent_05")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBenePercent06)
                    .HasColumnName("emp_cont_bene_percent_06")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBenePercent07)
                    .HasColumnName("emp_cont_bene_percent_07")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBenePercent08)
                    .HasColumnName("emp_cont_bene_percent_08")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBenePercent09)
                    .HasColumnName("emp_cont_bene_percent_09")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBenePercent10)
                    .HasColumnName("emp_cont_bene_percent_10")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneRel)
                    .HasColumnName("emp_cont_bene_rel")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneRel01)
                    .HasColumnName("emp_cont_bene_rel_01")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneRel02)
                    .HasColumnName("emp_cont_bene_rel_02")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneRel03)
                    .HasColumnName("emp_cont_bene_rel_03")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneRel04)
                    .HasColumnName("emp_cont_bene_rel_04")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneRel05)
                    .HasColumnName("emp_cont_bene_rel_05")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneRel06)
                    .HasColumnName("emp_cont_bene_rel_06")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneRel07)
                    .HasColumnName("emp_cont_bene_rel_07")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneRel08)
                    .HasColumnName("emp_cont_bene_rel_08")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneRel09)
                    .HasColumnName("emp_cont_bene_rel_09")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneRel10)
                    .HasColumnName("emp_cont_bene_rel_10")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneSsn)
                    .HasColumnName("emp_cont_bene_ssn")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneSsn01)
                    .HasColumnName("emp_cont_bene_ssn_01")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneSsn02)
                    .HasColumnName("emp_cont_bene_ssn_02")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneSsn03)
                    .HasColumnName("emp_cont_bene_ssn_03")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneSsn04)
                    .HasColumnName("emp_cont_bene_ssn_04")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneSsn05)
                    .HasColumnName("emp_cont_bene_ssn_05")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneSsn06)
                    .HasColumnName("emp_cont_bene_ssn_06")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneSsn07)
                    .HasColumnName("emp_cont_bene_ssn_07")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneSsn08)
                    .HasColumnName("emp_cont_bene_ssn_08")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneSsn09)
                    .HasColumnName("emp_cont_bene_ssn_09")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpContBeneSsn10)
                    .HasColumnName("emp_cont_bene_ssn_10")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpCovAmnt)
                    .HasColumnName("emp_cov_amnt")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpCovTyp)
                    .HasColumnName("emp_cov_typ")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpDob)
                    .HasColumnName("emp_dob")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpFaceAmtMonBnft)
                    .HasColumnName("emp_face_amt_mon_bnft")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpFname)
                    .HasColumnName("emp_fname")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpGndr)
                    .HasColumnName("emp_gndr")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpHandicppd)
                    .HasColumnName("emp_handicppd")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpHeight)
                    .HasColumnName("emp_height")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpHireDt)
                    .HasColumnName("emp_hire_dt")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpId)
                    .HasColumnName("emp_id")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpInitialsTxt)
                    .HasColumnName("emp_initials_txt")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpLname)
                    .HasColumnName("emp_lname")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpMidInit)
                    .HasColumnName("emp_mid_init")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpOccClass)
                    .HasColumnName("emp_occ_class")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPlanCd)
                    .HasColumnName("emp_plan_cd")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPlanFrmCd)
                    .HasColumnName("emp_plan_frm_cd")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPlanOptn)
                    .HasColumnName("emp_plan_optn")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrem)
                    .HasColumnName("emp_prem")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrCity02)
                    .HasColumnName("emp_prim_bene_addr_city_02")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrCity03)
                    .HasColumnName("emp_prim_bene_addr_city_03")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrCity04)
                    .HasColumnName("emp_prim_bene_addr_city_04")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrCty01)
                    .HasColumnName("emp_prim_bene_addr_cty_01")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrLn101)
                    .HasColumnName("emp_prim_bene_addr_ln1_01")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrLn102)
                    .HasColumnName("emp_prim_bene_addr_ln1_02")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrLn103)
                    .HasColumnName("emp_prim_bene_addr_ln1_03")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrLn104)
                    .HasColumnName("emp_prim_bene_addr_ln1_04")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrLn201)
                    .HasColumnName("emp_prim_bene_addr_ln2_01")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrLn202)
                    .HasColumnName("emp_prim_bene_addr_ln2_02")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrLn203)
                    .HasColumnName("emp_prim_bene_addr_ln2_03")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrLn204)
                    .HasColumnName("emp_prim_bene_addr_ln2_04")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrState01)
                    .HasColumnName("emp_prim_bene_addr_state_01")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrState02)
                    .HasColumnName("emp_prim_bene_addr_state_02")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrState03)
                    .HasColumnName("emp_prim_bene_addr_state_03")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrState04)
                    .HasColumnName("emp_prim_bene_addr_state_04")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrZip01)
                    .HasColumnName("emp_prim_bene_addr_zip_01")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrZip02)
                    .HasColumnName("emp_prim_bene_addr_zip_02")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrZip03)
                    .HasColumnName("emp_prim_bene_addr_zip_03")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneAddrZip04)
                    .HasColumnName("emp_prim_bene_addr_zip_04")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneDob)
                    .HasColumnName("emp_prim_bene_dob")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneDob01)
                    .HasColumnName("emp_prim_bene_dob_01")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneDob02)
                    .HasColumnName("emp_prim_bene_dob_02")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneDob03)
                    .HasColumnName("emp_prim_bene_dob_03")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneDob04)
                    .HasColumnName("emp_prim_bene_dob_04")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneDob05)
                    .HasColumnName("emp_prim_bene_dob_05")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneDob06)
                    .HasColumnName("emp_prim_bene_dob_06")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneDob07)
                    .HasColumnName("emp_prim_bene_dob_07")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneDob08)
                    .HasColumnName("emp_prim_bene_dob_08")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneDob09)
                    .HasColumnName("emp_prim_bene_dob_09")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneDob10)
                    .HasColumnName("emp_prim_bene_dob_10")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneNm)
                    .HasColumnName("emp_prim_bene_nm")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneNm01)
                    .HasColumnName("emp_prim_bene_nm_01")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneNm02)
                    .HasColumnName("emp_prim_bene_nm_02")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneNm03)
                    .HasColumnName("emp_prim_bene_nm_03")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneNm04)
                    .HasColumnName("emp_prim_bene_nm_04")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneNm05)
                    .HasColumnName("emp_prim_bene_nm_05")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneNm06)
                    .HasColumnName("emp_prim_bene_nm_06")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneNm07)
                    .HasColumnName("emp_prim_bene_nm_07")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneNm08)
                    .HasColumnName("emp_prim_bene_nm_08")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneNm09)
                    .HasColumnName("emp_prim_bene_nm_09")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneNm10)
                    .HasColumnName("emp_prim_bene_nm_10")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBenePercent01)
                    .HasColumnName("emp_prim_bene_percent_01")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBenePercent02)
                    .HasColumnName("emp_prim_bene_percent_02")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBenePercent03)
                    .HasColumnName("emp_prim_bene_percent_03")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBenePercent04)
                    .HasColumnName("emp_prim_bene_percent_04")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBenePercent05)
                    .HasColumnName("emp_prim_bene_percent_05")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBenePercent06)
                    .HasColumnName("emp_prim_bene_percent_06")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBenePercent07)
                    .HasColumnName("emp_prim_bene_percent_07")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBenePercent08)
                    .HasColumnName("emp_prim_bene_percent_08")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBenePercent09)
                    .HasColumnName("emp_prim_bene_percent_09")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBenePercent10)
                    .HasColumnName("emp_prim_bene_percent_10")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneRel)
                    .HasColumnName("emp_prim_bene_rel")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneRel01)
                    .HasColumnName("emp_prim_bene_rel_01")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneRel02)
                    .HasColumnName("emp_prim_bene_rel_02")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneRel03)
                    .HasColumnName("emp_prim_bene_rel_03")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneRel04)
                    .HasColumnName("emp_prim_bene_rel_04")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneRel05)
                    .HasColumnName("emp_prim_bene_rel_05")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneRel06)
                    .HasColumnName("emp_prim_bene_rel_06")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneRel07)
                    .HasColumnName("emp_prim_bene_rel_07")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneRel08)
                    .HasColumnName("emp_prim_bene_rel_08")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneRel09)
                    .HasColumnName("emp_prim_bene_rel_09")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneRel10)
                    .HasColumnName("emp_prim_bene_rel_10")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneSsn)
                    .HasColumnName("emp_prim_bene_ssn")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneSsn01)
                    .HasColumnName("emp_prim_bene_ssn_01")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneSsn02)
                    .HasColumnName("emp_prim_bene_ssn_02")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneSsn03)
                    .HasColumnName("emp_prim_bene_ssn_03")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneSsn04)
                    .HasColumnName("emp_prim_bene_ssn_04")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneSsn05)
                    .HasColumnName("emp_prim_bene_ssn_05")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneSsn06)
                    .HasColumnName("emp_prim_bene_ssn_06")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneSsn07)
                    .HasColumnName("emp_prim_bene_ssn_07")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneSsn08)
                    .HasColumnName("emp_prim_bene_ssn_08")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneSsn09)
                    .HasColumnName("emp_prim_bene_ssn_09")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpPrimBeneSsn10)
                    .HasColumnName("emp_prim_bene_ssn_10")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpQstn1)
                    .HasColumnName("emp_qstn_1")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpQstn10)
                    .HasColumnName("emp_qstn_10")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpQstn1a)
                    .HasColumnName("emp_qstn_1a")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpQstn1b)
                    .HasColumnName("emp_qstn_1b")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpQstn2)
                    .HasColumnName("emp_qstn_2")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpQstn3)
                    .HasColumnName("emp_qstn_3")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpQstn3a)
                    .HasColumnName("emp_qstn_3a")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpQstn3b)
                    .HasColumnName("emp_qstn_3b")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpQstn3c)
                    .HasColumnName("emp_qstn_3c")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpQstn3d)
                    .HasColumnName("emp_qstn_3d")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpQstn3e)
                    .HasColumnName("emp_qstn_3e")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpQstn4)
                    .HasColumnName("emp_qstn_4")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpQstn5)
                    .HasColumnName("emp_qstn_5")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpQstn6)
                    .HasColumnName("emp_qstn_6")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpQstn7)
                    .HasColumnName("emp_qstn_7")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpQstn8)
                    .HasColumnName("emp_qstn_8")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpQstn9)
                    .HasColumnName("emp_qstn_9")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpQualityOfLife)
                    .HasColumnName("emp_quality_of_life")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpRiderAir)
                    .HasColumnName("emp_rider_air")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpRiderQol3)
                    .HasColumnName("emp_rider_qol3")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpRiderQol4)
                    .HasColumnName("emp_rider_qol4")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpRiderWp)
                    .HasColumnName("emp_rider_wp")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpSigDt)
                    .HasColumnName("emp_sig_dt")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpSigTxt)
                    .HasColumnName("emp_sig_txt")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpSsn)
                    .HasColumnName("emp_ssn")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpWaiverOfPrem)
                    .HasColumnName("emp_waiver_of_prem")
                    .HasMaxLength(100);

                entity.Property(e => e.EmpWeight)
                    .HasColumnName("emp_weight")
                    .HasMaxLength(100);

                entity.Property(e => e.EnrlActn)
                    .HasColumnName("enrl_actn")
                    .HasMaxLength(100);

                entity.Property(e => e.EnrlTyp)
                    .HasColumnName("enrl_typ")
                    .HasMaxLength(100);

                entity.Property(e => e.ExistingIns)
                    .HasColumnName("existing_ins")
                    .HasMaxLength(100);

                entity.Property(e => e.FileNm)
                    .IsRequired()
                    .HasColumnName("file_nm")
                    .HasMaxLength(100);

                entity.Property(e => e.GrpNm)
                    .HasColumnName("grp_nm")
                    .HasMaxLength(100);

                entity.Property(e => e.GrpNmbr)
                    .HasColumnName("grp_nmbr")
                    .HasMaxLength(100);

                entity.Property(e => e.GrpSitusState)
                    .HasColumnName("grp_situs_state")
                    .HasMaxLength(100);

                entity.Property(e => e.HspitalIndmnty)
                    .HasColumnName("hspital_indmnty")
                    .HasMaxLength(100);

                entity.Property(e => e.IssueDt)
                    .HasColumnName("issue_dt")
                    .HasMaxLength(100);

                entity.Property(e => e.Opt)
                    .HasColumnName("opt")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnerHght)
                    .HasColumnName("owner_hght")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnerSal)
                    .HasColumnName("owner_sal")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnerSmkrNoSmkr)
                    .HasColumnName("owner_smkr_no_smkr")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnerWght)
                    .HasColumnName("owner_wght")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnersAddrCity)
                    .HasColumnName("owners_addr_city")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnersAddrLn1)
                    .HasColumnName("owners_addr_ln_1")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnersAddrLn2)
                    .HasColumnName("owners_addr_ln_2")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnersAddrState)
                    .HasColumnName("owners_addr_state")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnersAddrZip)
                    .HasColumnName("owners_addr_zip")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnersDob)
                    .HasColumnName("owners_dob")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnersFname)
                    .HasColumnName("owners_fname")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnersLname)
                    .HasColumnName("owners_lname")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnersMidInit)
                    .HasColumnName("owners_mid_init")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnersPhn)
                    .HasColumnName("owners_phn")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnersSex)
                    .HasColumnName("owners_sex")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnersSsn)
                    .HasColumnName("owners_ssn")
                    .HasMaxLength(100);

                entity.Property(e => e.PaymentMode)
                    .HasColumnName("payment_mode")
                    .HasMaxLength(100);

                entity.Property(e => e.PolcyNbr)
                    .HasColumnName("polcy_nbr")
                    .HasMaxLength(100);

                entity.Property(e => e.PrductCd)
                    .HasColumnName("prduct_cd")
                    .HasMaxLength(100);

                entity.Property(e => e.ProductName)
                    .HasColumnName("product_name")
                    .HasMaxLength(100);

                entity.Property(e => e.RateLvl)
                    .HasColumnName("rate_lvl")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplacementIsTerminating)
                    .HasColumnName("replacement_is_terminating")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplacementReadAloud)
                    .HasColumnName("replacement_read_aloud")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplacementUsingFunds)
                    .HasColumnName("replacement_using_funds")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplacingIns)
                    .HasColumnName("replacing_ins")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy1Insrd)
                    .HasColumnName("replcmnt_polcy1_insrd")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy1Nm)
                    .HasColumnName("replcmnt_polcy1_nm")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy1Nmbr)
                    .HasColumnName("replcmnt_polcy1_nmbr")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy1RplcdOrFncng)
                    .HasColumnName("replcmnt_polcy1_rplcd_or_fncng")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy1Rsn)
                    .HasColumnName("replcmnt_polcy1_rsn")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy2Insrd)
                    .HasColumnName("replcmnt_polcy2_insrd")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy2Nm)
                    .HasColumnName("replcmnt_polcy2_nm")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy2Nmbr)
                    .HasColumnName("replcmnt_polcy2_nmbr")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy2RplcdOrFncng)
                    .HasColumnName("replcmnt_polcy2_rplcd_or_fncng")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy2Rsn)
                    .HasColumnName("replcmnt_polcy2_rsn")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy3Insrd)
                    .HasColumnName("replcmnt_polcy3_insrd")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy3Nm)
                    .HasColumnName("replcmnt_polcy3_nm")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy3Nmbr)
                    .HasColumnName("replcmnt_polcy3_nmbr")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy3RplcdOrFncng)
                    .HasColumnName("replcmnt_polcy3_rplcd_or_fncng")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy3Rsn)
                    .HasColumnName("replcmnt_polcy3_rsn")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy4Insrd)
                    .HasColumnName("replcmnt_polcy4_insrd")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy4Nm)
                    .HasColumnName("replcmnt_polcy4_nm")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy4Nmbr)
                    .HasColumnName("replcmnt_polcy4_nmbr")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy4RplcdOrFncng)
                    .HasColumnName("replcmnt_polcy4_rplcd_or_fncng")
                    .HasMaxLength(100);

                entity.Property(e => e.ReplcmntPolcy4Rsn)
                    .HasColumnName("replcmnt_polcy4_rsn")
                    .HasMaxLength(100);

                entity.Property(e => e.SigndAtCity)
                    .HasColumnName("signd_at_city")
                    .HasMaxLength(100);

                entity.Property(e => e.SigndAtState)
                    .HasColumnName("signd_at_state")
                    .HasMaxLength(100);

                entity.Property(e => e.SpAdBnft)
                    .HasColumnName("sp_ad_bnft")
                    .HasMaxLength(100);

                entity.Property(e => e.SpAddrCity)
                    .HasColumnName("sp_addr_city")
                    .HasMaxLength(100);

                entity.Property(e => e.SpAddrLn1)
                    .HasColumnName("sp_addr_ln_1")
                    .HasMaxLength(100);

                entity.Property(e => e.SpAddrLn2)
                    .HasColumnName("sp_addr_ln_2")
                    .HasMaxLength(100);

                entity.Property(e => e.SpAddrState)
                    .HasColumnName("sp_addr_state")
                    .HasMaxLength(100);

                entity.Property(e => e.SpAddrZip)
                    .HasColumnName("sp_addr_zip")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneDob)
                    .HasColumnName("sp_cont_bene_dob")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneDob01)
                    .HasColumnName("sp_cont_bene_dob_01")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneDob02)
                    .HasColumnName("sp_cont_bene_dob_02")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneDob03)
                    .HasColumnName("sp_cont_bene_dob_03")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneDob04)
                    .HasColumnName("sp_cont_bene_dob_04")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneDob05)
                    .HasColumnName("sp_cont_bene_dob_05")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneDob06)
                    .HasColumnName("sp_cont_bene_dob_06")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneDob07)
                    .HasColumnName("sp_cont_bene_dob_07")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneDob08)
                    .HasColumnName("sp_cont_bene_dob_08")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneDob09)
                    .HasColumnName("sp_cont_bene_dob_09")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneDob10)
                    .HasColumnName("sp_cont_bene_dob_10")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneNm)
                    .HasColumnName("sp_cont_bene_nm")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneNm01)
                    .HasColumnName("sp_cont_bene_nm_01")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneNm02)
                    .HasColumnName("sp_cont_bene_nm_02")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneNm03)
                    .HasColumnName("sp_cont_bene_nm_03")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneNm04)
                    .HasColumnName("sp_cont_bene_nm_04")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneNm05)
                    .HasColumnName("sp_cont_bene_nm_05")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneNm06)
                    .HasColumnName("sp_cont_bene_nm_06")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneNm07)
                    .HasColumnName("sp_cont_bene_nm_07")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneNm08)
                    .HasColumnName("sp_cont_bene_nm_08")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneNm09)
                    .HasColumnName("sp_cont_bene_nm_09")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneNm10)
                    .HasColumnName("sp_cont_bene_nm_10")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBenePercent01)
                    .HasColumnName("sp_cont_bene_percent_01")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBenePercent02)
                    .HasColumnName("sp_cont_bene_percent_02")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBenePercent03)
                    .HasColumnName("sp_cont_bene_percent_03")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBenePercent04)
                    .HasColumnName("sp_cont_bene_percent_04")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBenePercent05)
                    .HasColumnName("sp_cont_bene_percent_05")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBenePercent06)
                    .HasColumnName("sp_cont_bene_percent_06")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBenePercent07)
                    .HasColumnName("sp_cont_bene_percent_07")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBenePercent08)
                    .HasColumnName("sp_cont_bene_percent_08")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBenePercent09)
                    .HasColumnName("sp_cont_bene_percent_09")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBenePercent10)
                    .HasColumnName("sp_cont_bene_percent_10")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneRel)
                    .HasColumnName("sp_cont_bene_rel")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneRel01)
                    .HasColumnName("sp_cont_bene_rel_01")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneRel02)
                    .HasColumnName("sp_cont_bene_rel_02")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneRel03)
                    .HasColumnName("sp_cont_bene_rel_03")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneRel04)
                    .HasColumnName("sp_cont_bene_rel_04")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneRel05)
                    .HasColumnName("sp_cont_bene_rel_05")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneRel06)
                    .HasColumnName("sp_cont_bene_rel_06")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneRel07)
                    .HasColumnName("sp_cont_bene_rel_07")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneRel08)
                    .HasColumnName("sp_cont_bene_rel_08")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneRel09)
                    .HasColumnName("sp_cont_bene_rel_09")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneRel10)
                    .HasColumnName("sp_cont_bene_rel_10")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneSsn)
                    .HasColumnName("sp_cont_bene_ssn")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneSsn01)
                    .HasColumnName("sp_cont_bene_ssn_01")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneSsn02)
                    .HasColumnName("sp_cont_bene_ssn_02")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneSsn03)
                    .HasColumnName("sp_cont_bene_ssn_03")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneSsn04)
                    .HasColumnName("sp_cont_bene_ssn_04")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneSsn05)
                    .HasColumnName("sp_cont_bene_ssn_05")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneSsn06)
                    .HasColumnName("sp_cont_bene_ssn_06")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneSsn07)
                    .HasColumnName("sp_cont_bene_ssn_07")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneSsn08)
                    .HasColumnName("sp_cont_bene_ssn_08")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneSsn09)
                    .HasColumnName("sp_cont_bene_ssn_09")
                    .HasMaxLength(100);

                entity.Property(e => e.SpContBeneSsn10)
                    .HasColumnName("sp_cont_bene_ssn_10")
                    .HasMaxLength(100);

                entity.Property(e => e.SpCovAmnt)
                    .HasColumnName("sp_cov_amnt")
                    .HasMaxLength(100);

                entity.Property(e => e.SpCovTyp)
                    .HasColumnName("sp_cov_typ")
                    .HasMaxLength(100);

                entity.Property(e => e.SpCovTypDesc)
                    .HasColumnName("sp_cov_typ_desc")
                    .HasMaxLength(100);

                entity.Property(e => e.SpDisabled6Months)
                    .HasColumnName("sp_disabled_6_months")
                    .HasMaxLength(100);

                entity.Property(e => e.SpDob)
                    .HasColumnName("sp_dob")
                    .HasMaxLength(100);

                entity.Property(e => e.SpEmail)
                    .HasColumnName("sp_email")
                    .HasMaxLength(100);

                entity.Property(e => e.SpFaceAmtMonBnft)
                    .HasColumnName("sp_face_amt_mon_bnft")
                    .HasMaxLength(100);

                entity.Property(e => e.SpFname)
                    .HasColumnName("sp_fname")
                    .HasMaxLength(100);

                entity.Property(e => e.SpGndr)
                    .HasColumnName("sp_gndr")
                    .HasMaxLength(100);

                entity.Property(e => e.SpHandicppd)
                    .HasColumnName("sp_handicppd")
                    .HasMaxLength(100);

                entity.Property(e => e.SpHght)
                    .HasColumnName("sp_hght")
                    .HasMaxLength(100);

                entity.Property(e => e.SpLname)
                    .HasColumnName("sp_lname")
                    .HasMaxLength(100);

                entity.Property(e => e.SpMidInit)
                    .HasColumnName("sp_mid_init")
                    .HasMaxLength(100);

                entity.Property(e => e.SpOccClass)
                    .HasColumnName("sp_occ_class")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPlanCd)
                    .HasColumnName("sp_plan_cd")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPlanFrmCd)
                    .HasColumnName("sp_plan_frm_cd")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPlanOptn)
                    .HasColumnName("sp_plan_optn")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrem)
                    .HasColumnName("sp_prem")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneAddrCty)
                    .HasColumnName("sp_prim_bene_addr_cty")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneAddrLn1)
                    .HasColumnName("sp_prim_bene_addr_ln1")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneAddrLn2)
                    .HasColumnName("sp_prim_bene_addr_ln2")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneAddrState)
                    .HasColumnName("sp_prim_bene_addr_state")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneAddrZip)
                    .HasColumnName("sp_prim_bene_addr_zip")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneDob)
                    .HasColumnName("sp_prim_bene_dob")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneDob02)
                    .HasColumnName("sp_prim_bene_dob_02")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneDob03)
                    .HasColumnName("sp_prim_bene_dob_03")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneDob04)
                    .HasColumnName("sp_prim_bene_dob_04")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneDob05)
                    .HasColumnName("sp_prim_bene_dob_05")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneDob06)
                    .HasColumnName("sp_prim_bene_dob_06")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneDob07)
                    .HasColumnName("sp_prim_bene_dob_07")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneDob08)
                    .HasColumnName("sp_prim_bene_dob_08")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneDob09)
                    .HasColumnName("sp_prim_bene_dob_09")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneDob10)
                    .HasColumnName("sp_prim_bene_dob_10")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneNm)
                    .HasColumnName("sp_prim_bene_nm")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneNm02)
                    .HasColumnName("sp_prim_bene_nm_02")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneNm03)
                    .HasColumnName("sp_prim_bene_nm_03")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneNm04)
                    .HasColumnName("sp_prim_bene_nm_04")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneNm05)
                    .HasColumnName("sp_prim_bene_nm_05")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneNm06)
                    .HasColumnName("sp_prim_bene_nm_06")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneNm07)
                    .HasColumnName("sp_prim_bene_nm_07")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneNm08)
                    .HasColumnName("sp_prim_bene_nm_08")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneNm09)
                    .HasColumnName("sp_prim_bene_nm_09")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneNm10)
                    .HasColumnName("sp_prim_bene_nm_10")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBenePercent)
                    .HasColumnName("sp_prim_bene_percent")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBenePercent02)
                    .HasColumnName("sp_prim_bene_percent_02")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBenePercent03)
                    .HasColumnName("sp_prim_bene_percent_03")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBenePercent04)
                    .HasColumnName("sp_prim_bene_percent_04")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBenePercent05)
                    .HasColumnName("sp_prim_bene_percent_05")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBenePercent06)
                    .HasColumnName("sp_prim_bene_percent_06")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBenePercent07)
                    .HasColumnName("sp_prim_bene_percent_07")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBenePercent08)
                    .HasColumnName("sp_prim_bene_percent_08")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBenePercent09)
                    .HasColumnName("sp_prim_bene_percent_09")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBenePercent10)
                    .HasColumnName("sp_prim_bene_percent_10")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneRel)
                    .HasColumnName("sp_prim_bene_rel")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneRel02)
                    .HasColumnName("sp_prim_bene_rel_02")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneRel03)
                    .HasColumnName("sp_prim_bene_rel_03")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneRel04)
                    .HasColumnName("sp_prim_bene_rel_04")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneRel05)
                    .HasColumnName("sp_prim_bene_rel_05")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneRel06)
                    .HasColumnName("sp_prim_bene_rel_06")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneRel07)
                    .HasColumnName("sp_prim_bene_rel_07")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneRel08)
                    .HasColumnName("sp_prim_bene_rel_08")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneRel09)
                    .HasColumnName("sp_prim_bene_rel_09")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneRel10)
                    .HasColumnName("sp_prim_bene_rel_10")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneSsn)
                    .HasColumnName("sp_prim_bene_ssn")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneSsn02)
                    .HasColumnName("sp_prim_bene_ssn_02")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneSsn03)
                    .HasColumnName("sp_prim_bene_ssn_03")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneSsn04)
                    .HasColumnName("sp_prim_bene_ssn_04")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneSsn05)
                    .HasColumnName("sp_prim_bene_ssn_05")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneSsn06)
                    .HasColumnName("sp_prim_bene_ssn_06")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneSsn07)
                    .HasColumnName("sp_prim_bene_ssn_07")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneSsn08)
                    .HasColumnName("sp_prim_bene_ssn_08")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneSsn09)
                    .HasColumnName("sp_prim_bene_ssn_09")
                    .HasMaxLength(100);

                entity.Property(e => e.SpPrimBeneSsn10)
                    .HasColumnName("sp_prim_bene_ssn_10")
                    .HasMaxLength(100);

                entity.Property(e => e.SpQstn1)
                    .HasColumnName("sp_qstn_1")
                    .HasMaxLength(100);

                entity.Property(e => e.SpQstn10)
                    .HasColumnName("sp_qstn_10")
                    .HasMaxLength(100);

                entity.Property(e => e.SpQstn1a)
                    .HasColumnName("sp_qstn_1a")
                    .HasMaxLength(100);

                entity.Property(e => e.SpQstn1b)
                    .HasColumnName("sp_qstn_1b")
                    .HasMaxLength(100);

                entity.Property(e => e.SpQstn2)
                    .HasColumnName("sp_qstn_2")
                    .HasMaxLength(100);

                entity.Property(e => e.SpQstn3)
                    .HasColumnName("sp_qstn_3")
                    .HasMaxLength(100);

                entity.Property(e => e.SpQstn3a)
                    .HasColumnName("sp_qstn_3a")
                    .HasMaxLength(100);

                entity.Property(e => e.SpQstn3b)
                    .HasColumnName("sp_qstn_3b")
                    .HasMaxLength(100);

                entity.Property(e => e.SpQstn3c)
                    .HasColumnName("sp_qstn_3c")
                    .HasMaxLength(100);

                entity.Property(e => e.SpQstn3d)
                    .HasColumnName("sp_qstn_3d")
                    .HasMaxLength(100);

                entity.Property(e => e.SpQstn3e)
                    .HasColumnName("sp_qstn_3e")
                    .HasMaxLength(100);

                entity.Property(e => e.SpQstn4)
                    .HasColumnName("sp_qstn_4")
                    .HasMaxLength(100);

                entity.Property(e => e.SpQstn5)
                    .HasColumnName("sp_qstn_5")
                    .HasMaxLength(100);

                entity.Property(e => e.SpQstn6)
                    .HasColumnName("sp_qstn_6")
                    .HasMaxLength(100);

                entity.Property(e => e.SpQstn7)
                    .HasColumnName("sp_qstn_7")
                    .HasMaxLength(100);

                entity.Property(e => e.SpQstn8)
                    .HasColumnName("sp_qstn_8")
                    .HasMaxLength(100);

                entity.Property(e => e.SpQstn9)
                    .HasColumnName("sp_qstn_9")
                    .HasMaxLength(100);

                entity.Property(e => e.SpQualityOfLife)
                    .HasColumnName("sp_quality_of_life")
                    .HasMaxLength(100);

                entity.Property(e => e.SpRiderAir)
                    .HasColumnName("sp_rider_air")
                    .HasMaxLength(100);

                entity.Property(e => e.SpRiderQol3)
                    .HasColumnName("sp_rider_qol3")
                    .HasMaxLength(100);

                entity.Property(e => e.SpRiderQol4)
                    .HasColumnName("sp_rider_qol4")
                    .HasMaxLength(100);

                entity.Property(e => e.SpRiderWp)
                    .HasColumnName("sp_rider_wp")
                    .HasMaxLength(100);

                entity.Property(e => e.SpSmkrNoSmkr)
                    .HasColumnName("sp_smkr_no_smkr")
                    .HasMaxLength(100);

                entity.Property(e => e.SpSsn)
                    .HasColumnName("sp_ssn")
                    .HasMaxLength(100);

                entity.Property(e => e.SpTreated6Months)
                    .HasColumnName("sp_treated_6_months")
                    .HasMaxLength(100);

                entity.Property(e => e.SpWaiverOfPrem)
                    .HasColumnName("sp_waiver_of_prem")
                    .HasMaxLength(100);

                entity.Property(e => e.SpWght)
                    .HasColumnName("sp_wght")
                    .HasMaxLength(100);

                entity.Property(e => e.TimeStamp)
                    .HasColumnName("time_stamp")
                    .HasMaxLength(100);

                entity.Property(e => e.UsrTkn)
                    .HasColumnName("usr_tkn")
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<EppPrdctattrbt>(entity =>
            {
                entity.HasKey(e => e.PrdctAttrbtId)
                    .HasName("PK_FRDCTATTRBT");

                entity.ToTable("EPP_PRDCTATTRBT");

                entity.Property(e => e.PrdctAttrbtId)
                    .HasColumnName("prdct_attrbt_id")
                    .ValueGeneratedNever();

                entity.Property(e => e.AttrId).HasColumnName("attr_id");

                entity.Property(e => e.ClmnOrdr).HasColumnName("clmn_ordr");

                entity.Property(e => e.CrtdBy)
                    .IsRequired()
                    .HasColumnName("crtd_by")
                    .HasMaxLength(10);

                entity.Property(e => e.CrtdDt)
                    .HasColumnName("crtd_dt")
                    .HasColumnType("date");

                entity.Property(e => e.GrpprdctId).HasColumnName("grpprdct_id");

                entity.Property(e => e.LstUpdtBy)
                    .HasColumnName("lst_updt_by")
                    .HasMaxLength(10);

                entity.Property(e => e.LstUpdtDt)
                    .HasColumnName("lst_updt_dt")
                    .HasColumnType("date");

                entity.Property(e => e.RqdFlg).HasColumnName("rqd_flg");

                entity.HasOne(d => d.Attr)
                    .WithMany(p => p.EppPrdctattrbt)
                    .HasForeignKey(d => d.AttrId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("RefEPP_Attribute29");

                entity.HasOne(d => d.Grpprdct)
                    .WithMany(p => p.EppPrdctattrbt)
                    .HasForeignKey(d => d.GrpprdctId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("RefEPP_GRPPRDCT30");
            });

            modelBuilder.Entity<EppProcessedEnrollment>(entity =>
            {
                entity.HasKey(e => e.RcrdId)
                    .HasName("EPP_PROCESSED_ENROLLMENT_PK");

                entity.ToTable("EPP_PROCESSED_ENROLLMENT");

                entity.Property(e => e.RcrdId)
                    .HasColumnName("rcrd_id")
                    .ValueGeneratedNever();

                entity.Property(e => e.BenftCovAmt)
                    .HasColumnName("benft_cov_amt")
                    .HasMaxLength(100);

                entity.Property(e => e.BenftCovTierCd)
                    .HasColumnName("benft_cov_tier_cd")
                    .HasMaxLength(100);

                entity.Property(e => e.BenftIssueDt)
                    .HasColumnName("benft_issue_dt")
                    .HasMaxLength(100);

                entity.Property(e => e.BenftSeqNbr)
                    .HasColumnName("benft_seq_nbr")
                    .HasMaxLength(100);

                entity.Property(e => e.BenftSystmStatusCd)
                    .HasColumnName("benft_systm_status_cd")
                    .HasMaxLength(100);

                entity.Property(e => e.BenftSystmStatusEfftvDt)
                    .HasColumnName("benft_systm_status_efftv_dt")
                    .HasMaxLength(100);

                entity.Property(e => e.CompnyCd)
                    .HasColumnName("compny_cd")
                    .HasMaxLength(100);

                entity.Property(e => e.CrtdBy)
                    .IsRequired()
                    .HasColumnName("crtd_by")
                    .HasMaxLength(50);

                entity.Property(e => e.CrtdDt)
                    .HasColumnName("crtd_dt")
                    .HasColumnType("date");

                entity.Property(e => e.GrpId)
                    .HasColumnName("grp_id")
                    .HasMaxLength(100);

                entity.Property(e => e.InsrdBrthDt)
                    .HasColumnName("insrd_brth_dt")
                    .HasMaxLength(100);

                entity.Property(e => e.InsrdFrstNm)
                    .HasColumnName("insrd_frst_nm")
                    .HasMaxLength(100);

                entity.Property(e => e.InsrdFullNm)
                    .HasColumnName("insrd_full_nm")
                    .HasMaxLength(100);

                entity.Property(e => e.InsrdGndrCd)
                    .HasColumnName("insrd_gndr_cd")
                    .HasMaxLength(100);

                entity.Property(e => e.InsrdLstNm)
                    .HasColumnName("insrd_lst_nm")
                    .HasMaxLength(100);

                entity.Property(e => e.InsrdMidlNm)
                    .HasColumnName("insrd_midl_nm")
                    .HasMaxLength(100);

                entity.Property(e => e.InsrdOccuptnCd)
                    .HasColumnName("insrd_occuptn_cd")
                    .HasMaxLength(100);

                entity.Property(e => e.InsrdSoclScrtyNbr)
                    .HasColumnName("insrd_socl_scrty_nbr")
                    .HasMaxLength(100);

                entity.Property(e => e.LstUpdtBy)
                    .HasColumnName("lst_updt_by")
                    .HasMaxLength(50);

                entity.Property(e => e.LstUpdtDt)
                    .HasColumnName("lst_updt_dt")
                    .HasColumnType("date");

                entity.Property(e => e.OwnrAddrStCd)
                    .HasColumnName("ownr_addr_st_cd")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnrAddrZipCd)
                    .HasColumnName("ownr_addr_zip_cd")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnrAddrsLn1)
                    .HasColumnName("ownr_addrs_ln1")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnrAddrsLn2)
                    .HasColumnName("ownr_addrs_ln2")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnrBrthDt)
                    .HasColumnName("ownr_brth_dt")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnrCtyNm)
                    .HasColumnName("ownr_cty_nm")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnrFrstNm)
                    .HasColumnName("ownr_frst_nm")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnrLstNm)
                    .HasColumnName("ownr_lst_nm")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnrPhnNbr)
                    .HasColumnName("ownr_phn_nbr")
                    .HasMaxLength(100);

                entity.Property(e => e.OwnrSoclScrtyNbr)
                    .HasColumnName("ownr_socl_scrty_nbr")
                    .HasMaxLength(100);

                entity.Property(e => e.PlcyNbr)
                    .HasColumnName("plcy_nbr")
                    .HasMaxLength(100);

                entity.Property(e => e.PrdctPlnCd)
                    .HasColumnName("prdct_pln_cd")
                    .HasMaxLength(100);

                entity.Property(e => e.UndrWrtngClsCd)
                    .HasColumnName("undr_wrtng_cls_cd")
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<EppProduct>(entity =>
            {
                entity.HasKey(e => e.ProductId)
                    .HasName("PK_PRDCT");

                entity.ToTable("EPP_Product");

                entity.Property(e => e.ProductId)
                    .HasColumnName("product_id")
                    .ValueGeneratedNever();

                entity.Property(e => e.CrtdBy)
                    .IsRequired()
                    .HasColumnName("crtd_by")
                    .HasMaxLength(10);

                entity.Property(e => e.CrtdDt)
                    .HasColumnName("crtd_dt")
                    .HasColumnType("date");

                entity.Property(e => e.LstUpdtBy)
                    .HasColumnName("lst_updt_by")
                    .HasMaxLength(10);

                entity.Property(e => e.LstUpdtDt)
                    .HasColumnName("lst_updt_dt")
                    .HasColumnType("date");

                entity.Property(e => e.ProductNm)
                    .HasColumnName("product_nm")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<EppProductCodes>(entity =>
            {
                entity.HasKey(e => e.ProdctCdId)
                    .HasName("PK34");

                entity.ToTable("EPP_ProductCodes");

                entity.Property(e => e.ProdctCdId)
                    .HasColumnName("prodct_cd_id")
                    .ValueGeneratedNever();

                entity.Property(e => e.CrtdBy)
                    .IsRequired()
                    .HasColumnName("crtd_by")
                    .HasMaxLength(50);

                entity.Property(e => e.CrtdDt)
                    .HasColumnName("crtd_dt")
                    .HasColumnType("date");

                entity.Property(e => e.Description)
                    .HasColumnName("description")
                    .HasMaxLength(100);

                entity.Property(e => e.LstUpdtBy)
                    .HasColumnName("lst_updt_by")
                    .HasMaxLength(50);

                entity.Property(e => e.LstUpdtDt)
                    .HasColumnName("lst_updt_dt")
                    .HasColumnType("date");

                entity.Property(e => e.Optn)
                    .HasColumnName("optn")
                    .HasMaxLength(100);

                entity.Property(e => e.ProductCode)
                    .HasColumnName("product_code")
                    .HasMaxLength(100);

                entity.Property(e => e.ProductId).HasColumnName("product_id");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.EppProductCodes)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("RefEPP_Product47");
            });

            modelBuilder.Entity<EppRoles>(entity =>
            {
                entity.HasKey(e => e.RoleCd)
                    .HasName("PK21");

                entity.ToTable("EPP_Roles");

                entity.Property(e => e.RoleCd)
                    .HasColumnName("role_cd")
                    .HasMaxLength(50);

                entity.Property(e => e.CrtdBy)
                    .IsRequired()
                    .HasColumnName("crtd_by")
                    .HasMaxLength(50);

                entity.Property(e => e.CrtdDt)
                    .HasColumnName("crtd_dt")
                    .HasColumnType("date");

                entity.Property(e => e.LstUpdtBy)
                    .HasColumnName("lst_updt_by")
                    .HasMaxLength(50);

                entity.Property(e => e.LstUpdtDt)
                    .HasColumnName("lst_updt_dt")
                    .HasColumnType("date");

                entity.Property(e => e.RoleName)
                    .HasColumnName("role_name")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<EppUserActionTypes>(entity =>
            {
                entity.HasKey(e => e.ActionTypeId)
                    .HasName("PK25");

                entity.ToTable("EPP_User_ActionTypes");

                entity.Property(e => e.ActionTypeId)
                    .HasColumnName("action_type_id")
                    .ValueGeneratedNever();

                entity.Property(e => e.ActionName)
                    .HasColumnName("action_name")
                    .HasMaxLength(50);

                entity.Property(e => e.CrtdBy)
                    .IsRequired()
                    .HasColumnName("crtd_by")
                    .HasMaxLength(50);

                entity.Property(e => e.CrtdDt)
                    .HasColumnName("crtd_dt")
                    .HasColumnType("date");

                entity.Property(e => e.LstUpdtBy)
                    .HasColumnName("lst_updt_by")
                    .HasMaxLength(50);

                entity.Property(e => e.LstUpdtDt)
                    .HasColumnName("lst_updt_dt")
                    .HasColumnType("date");
            });

            modelBuilder.Entity<EppUserRoles>(entity =>
            {
                entity.HasKey(e => e.UserRoleId)
                    .HasName("PK22");

                entity.ToTable("EPP_UserRoles");

                entity.Property(e => e.UserRoleId)
                    .HasColumnName("user_role_id")
                    .ValueGeneratedNever();

                entity.Property(e => e.CrtdBy)
                    .IsRequired()
                    .HasColumnName("crtd_by")
                    .HasMaxLength(50);

                entity.Property(e => e.CrtdDt)
                    .HasColumnName("crtd_dt")
                    .HasColumnType("date");

                entity.Property(e => e.LoginId)
                    .IsRequired()
                    .HasColumnName("login_id")
                    .HasMaxLength(50);

                entity.Property(e => e.LstUpdtBy)
                    .HasColumnName("lst_updt_by")
                    .HasMaxLength(50);

                entity.Property(e => e.LstUpdtDt)
                    .HasColumnName("lst_updt_dt")
                    .HasColumnType("date");

                entity.Property(e => e.RoleCd)
                    .IsRequired()
                    .HasColumnName("role_cd")
                    .HasMaxLength(50);

                entity.HasOne(d => d.RoleCdNavigation)
                    .WithMany(p => p.EppUserRoles)
                    .HasForeignKey(d => d.RoleCd)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("RefEPP_Roles32");
            });

            modelBuilder.Entity<EppUserRolesFunction>(entity =>
            {
                entity.HasKey(e => e.UserrolesFunctionId)
                    .HasName("PK24");

                entity.ToTable("EPP_UserRolesFunction");

                entity.Property(e => e.UserrolesFunctionId)
                    .HasColumnName("userroles_function_id")
                    .ValueGeneratedNever();

                entity.Property(e => e.ActionTypeId).HasColumnName("action_type_id");

                entity.Property(e => e.CrtdBy)
                    .IsRequired()
                    .HasColumnName("crtd_by")
                    .HasMaxLength(50);

                entity.Property(e => e.CrtdDt)
                    .HasColumnName("crtd_dt")
                    .HasColumnType("date");

                entity.Property(e => e.FunctionId).HasColumnName("function_id");

                entity.Property(e => e.LstUpdtBy)
                    .HasColumnName("lst_updt_by")
                    .HasMaxLength(50);

                entity.Property(e => e.LstUpdtDt)
                    .HasColumnName("lst_updt_dt")
                    .HasColumnType("date");

                entity.Property(e => e.UserRoleId).HasColumnName("user_role_id");

                entity.HasOne(d => d.ActionType)
                    .WithMany(p => p.EppUserRolesFunction)
                    .HasForeignKey(d => d.ActionTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("RefEPP_User_ActionTypes35");

                entity.HasOne(d => d.Function)
                    .WithMany(p => p.EppUserRolesFunction)
                    .HasForeignKey(d => d.FunctionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("RefEPP_Functions34");

                entity.HasOne(d => d.UserRole)
                    .WithMany(p => p.EppUserRolesFunction)
                    .HasForeignKey(d => d.UserRoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("RefEPP_UserRoles33");
            });

            modelBuilder.Entity<HoldAttr>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.AttrId).HasColumnName("attr_id");

                entity.Property(e => e.CreateBy).HasColumnName("create_by");

                entity.Property(e => e.CreateDt).HasColumnName("create_dt");

                entity.Property(e => e.HoldattrId).HasColumnName("holdattr_id");

                entity.Property(e => e.LstUpdtBy).HasColumnName("lst_updt_by");

                entity.Property(e => e.LstUpdtDt).HasColumnName("lst_updt_dt");

                entity.Property(e => e.RcrdId).HasColumnName("rcrd_id");
            });

            modelBuilder.Entity<PgStatStatements>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("pg_stat_statements");

                entity.Property(e => e.BlkReadTime).HasColumnName("blk_read_time");

                entity.Property(e => e.BlkWriteTime).HasColumnName("blk_write_time");

                entity.Property(e => e.Calls).HasColumnName("calls");

                entity.Property(e => e.Dbid)
                    .HasColumnName("dbid")
                    .HasColumnType("oid");

                entity.Property(e => e.LocalBlksDirtied).HasColumnName("local_blks_dirtied");

                entity.Property(e => e.LocalBlksHit).HasColumnName("local_blks_hit");

                entity.Property(e => e.LocalBlksRead).HasColumnName("local_blks_read");

                entity.Property(e => e.LocalBlksWritten).HasColumnName("local_blks_written");

                entity.Property(e => e.MaxTime).HasColumnName("max_time");

                entity.Property(e => e.MeanTime).HasColumnName("mean_time");

                entity.Property(e => e.MinTime).HasColumnName("min_time");

                entity.Property(e => e.Query).HasColumnName("query");

                entity.Property(e => e.Queryid).HasColumnName("queryid");

                entity.Property(e => e.Rows).HasColumnName("rows");

                entity.Property(e => e.SharedBlksDirtied).HasColumnName("shared_blks_dirtied");

                entity.Property(e => e.SharedBlksHit).HasColumnName("shared_blks_hit");

                entity.Property(e => e.SharedBlksRead).HasColumnName("shared_blks_read");

                entity.Property(e => e.SharedBlksWritten).HasColumnName("shared_blks_written");

                entity.Property(e => e.StddevTime).HasColumnName("stddev_time");

                entity.Property(e => e.TempBlksRead).HasColumnName("temp_blks_read");

                entity.Property(e => e.TempBlksWritten).HasColumnName("temp_blks_written");

                entity.Property(e => e.TotalTime).HasColumnName("total_time");

                entity.Property(e => e.Userid)
                    .HasColumnName("userid")
                    .HasColumnType("oid");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
