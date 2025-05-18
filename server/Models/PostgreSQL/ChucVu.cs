using System.ComponentModel.DataAnnotations;
using server.Repositories;

namespace server.Models.PostgreSQL;

public class ChucVu : ChucVuDto, IEntityPostgre
{
  [Key]
  public Guid Id { get; set; } = Guid.NewGuid();

  public ICollection<Khoa_GiangVien>? Khoa_GiangViens { get; set; }
}

public class ChucVuDto
{
  public string MaChucVu { get; set; } = null!;
  public string TenChucVu { get; set; } = null!;
}