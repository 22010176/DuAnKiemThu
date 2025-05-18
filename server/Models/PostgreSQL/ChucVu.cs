using server.Repositories;

namespace server.Models.PostgreSQL;

public class ChucVu : ChucVuDto, IEntityPostgre
{
  public int Id { get; set; }

  public ICollection<Khoa_GiangVien>? Khoa_GiangViens { get; set; }
}

public class ChucVuDto
{
  public string TenChucVu { get; set; } = null!;
}