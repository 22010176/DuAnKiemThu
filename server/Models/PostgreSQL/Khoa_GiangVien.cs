using server.Repositories;

namespace server.Models.PostgreSQL;

public class Khoa_GiangVien : IEntityPostgre
{
  public int Id { get; set; }
  public int GiangVienId { get; set; }
  public required GiangVien GiangVien { get; set; }

  public int KhoaId { get; set; }
  public required Khoa Khoa { get; set; }

  public int ChucVuId { get; set; }
  public required ChucVu ChucVu { get; set; }
}