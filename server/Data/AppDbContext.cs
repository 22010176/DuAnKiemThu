using Microsoft.EntityFrameworkCore;
using server.Models.PostgreSQL;

namespace server.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
  // public DbSet<Product> Products { get; set; }
  public DbSet<BangCap> BangCap { get; set; }
  public DbSet<ChucVu> ChucVu { get; set; }
  public DbSet<GiangVien> GiangVien { get; set; }
  public DbSet<Khoa> Khoa { get; set; }
  public DbSet<Khoa_GiangVien> Khoa_GiangVien { get; set; }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder);

    modelBuilder.Entity<Khoa_GiangVien>()
      .HasKey(e => new { e.ChucVuId, e.GiangVienId, e.KhoaId });

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
  }

}