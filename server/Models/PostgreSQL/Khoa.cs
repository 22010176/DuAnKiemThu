using server.Repositories;

namespace server.Models.PostgreSQL;

public class Khoa : KhoaDto, IEntityPostgre
{
  public int Id { get; set; }
  public ICollection<Khoa_GiangVien>? Khoa_GiangViens { get; set; }
}

public class KhoaDto
{
  public string TenKhoa { get; set; } = null!;
  public string ViTri { get; set; } = null!;
  public string MoTa { get; set; } = null!;
}