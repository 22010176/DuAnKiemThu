using System.ComponentModel.DataAnnotations;
using server.Repositories;

namespace server.Models.PostgreSQL;

public class Khoa : KhoaDto, IEntityPostgre
{
  [Key]
  public Guid Id { get; set; } = Guid.NewGuid();

  public ICollection<Khoa_GiangVien>? Khoa_GiangViens { get; set; }
}

public class KhoaDto
{
  public string MaKhoa { get; set; } = null!;
  public string TenKhoa { get; set; } = null!;
  public string ViTri { get; set; } = null!;
  public string MoTa { get; set; } = null!;
}