using System.ComponentModel.DataAnnotations;
using server.Repositories;

namespace server.Models;

public class HocKi : HocKiDto, IEntityPostgre
{
  public static HocKi Generate()
  {
    return new HocKi()
    {
      TenKi = Guid.NewGuid().ToString()
      // TenVietTat = Guid.NewGuid().ToString()
    };
  }
  [Key]
  public Guid Id { get; set; } = Guid.NewGuid();
}

public class HocKiDto
{
  public string TenKi { get; set; } = null!;
  public DateTime ThoiGianBatDau { get; set; }
  public DateTime ThoiGianKetThuc { get; set; }
}

