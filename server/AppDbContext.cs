using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
  // public DbSet<Product> Products { get; set; }
  public DbSet<BangCap> BangCap { get; set; }
  public DbSet<ChucVu> ChucVu { get; set; }
  public DbSet<GiangVien> GiangVien { get; set; }
  public DbSet<Khoa> Khoa { get; set; }
  public DbSet<Khoa_GiangVien> Khoa_GiangVien { get; set; }
  public DbSet<HocKi> HocKi { get; set; }
  public DbSet<HocPhan> HocPhan { get; set; }
  public DbSet<TinChi> TinChi { get; set; }
  public DbSet<LopHocPhan> LopHocPhan { get; set; }
  public DbSet<HocPhan_TinChi> HocPhan_TinChi { get; set; }
  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.Entity<BangCap>().HasIndex(b => b.MaBangCap).IsUnique();
    modelBuilder.Entity<BangCap>().HasIndex(b => b.TenBangCap).IsUnique();
    modelBuilder.Entity<BangCap>().HasIndex(b => b.TenVietTat).IsUnique();

    modelBuilder.Entity<ChucVu>().HasIndex(b => b.MaChucVu).IsUnique();
    modelBuilder.Entity<ChucVu>().HasIndex(b => b.TenChucVu).IsUnique();
    modelBuilder.Entity<ChucVu>().HasIndex(b => b.TenVietTat).IsUnique();

    modelBuilder.Entity<GiangVien>().HasIndex(b => b.MaGiangVien).IsUnique();
    modelBuilder.Entity<GiangVien>().HasIndex(b => b.SoDienThoai).IsUnique();

    modelBuilder.Entity<Khoa>().HasIndex(b => b.MaKhoa).IsUnique();
    modelBuilder.Entity<Khoa>().HasIndex(b => b.TenKhoa).IsUnique();
    modelBuilder.Entity<Khoa>().HasIndex(b => b.TenVietTat).IsUnique();

    modelBuilder.Entity<HocKi>().HasIndex(b => b.TenKi).IsUnique();

    modelBuilder.Entity<Khoa_GiangVien>().HasIndex(k => new { k.KhoaId, k.GiangVienId }).IsUnique();
    modelBuilder.Entity<Khoa_GiangVien>()
      .HasOne(e => e.GiangVien)
      .WithMany(s => s.Khoa_GiangViens)
      .HasForeignKey(e => e.GiangVienId);

    modelBuilder.Entity<Khoa_GiangVien>()
      .HasOne(e => e.ChucVu)
      .WithMany(c => c.Khoa_GiangViens)
      .HasForeignKey(e => e.ChucVuId);

    modelBuilder.Entity<Khoa_GiangVien>()
      .HasOne(e => e.Khoa)
      .WithMany(k => k.Khoa_GiangViens)
      .HasForeignKey(e => e.KhoaId);

    modelBuilder.Entity<GiangVien>()
      .HasOne(e => e.BangCap)
      .WithMany(e => e.GiangViens)
      .HasForeignKey(e => e.BangCapId);

    base.OnModelCreating(modelBuilder);
  }

}