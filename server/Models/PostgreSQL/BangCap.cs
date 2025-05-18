using server.Repositories;

namespace server.Models.PostgreSQL;

public class BangCap : BangCapDto, IEntityPostgre
{
  public int Id { get; set; }
  public ICollection<GiangVien>? GiangViens { get; set; }
}

public class BangCapDto
{
  public string TenBangCap { get; set; } = null!;
}

