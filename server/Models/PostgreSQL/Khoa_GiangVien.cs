using System.ComponentModel.DataAnnotations;
using server.Repositories;

namespace server.Models.PostgreSQL;

public class Khoa_GiangVien : Khoa_GiangVienDto, IEntityPostgre
{
  [Key]
  public Guid Id { get; set; } = Guid.NewGuid();

  public required GiangVien GiangVien { get; set; }
  public required Khoa Khoa { get; set; }
  public required ChucVu ChucVu { get; set; }
}

public class Khoa_GiangVienDto
{
  public Guid GiangVienId { get; set; }
  public Guid KhoaId { get; set; }
  public Guid ChucVuId { get; set; }
}