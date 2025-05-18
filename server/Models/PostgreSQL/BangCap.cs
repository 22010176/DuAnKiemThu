using System.ComponentModel.DataAnnotations;
using server.Repositories;

namespace server.Models.PostgreSQL;

public class BangCap : BangCapDto, IEntityPostgre
{
  [Key]
  public Guid Id { get; set; } = Guid.NewGuid();
  public ICollection<GiangVien>? GiangViens { get; set; }
}

public class BangCapDto
{
  public string MaBangCap { get; set; } = null!;
  public string TenBangCap { get; set; } = null!;
}

