using System.ComponentModel.DataAnnotations;
using server.Repositories;

namespace server.Models;

public class Khoa : KhoaDto, IEntityPostgre
{
  public static Khoa Generate()
  {
    return new()
    {
      MaKhoa = Guid.NewGuid().ToString(),
      TenKhoa = Guid.NewGuid().ToString(),
      TenVietTat = Guid.NewGuid().ToString(),
      ViTri = Guid.NewGuid().ToString()
    };
  }
  [Key]
  public Guid Id { get; set; } = Guid.NewGuid();

  public ICollection<Khoa_GiangVien>? Khoa_GiangViens { get; set; }
}

public class KhoaDto
{
  public string MaKhoa { get; set; } = null!;
  public string TenKhoa { get; set; } = null!;
  public string TenVietTat { get; set; } = null!;
  public string ViTri { get; set; } = null!;
}