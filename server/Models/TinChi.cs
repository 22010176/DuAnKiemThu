using System.ComponentModel.DataAnnotations;
using server.Repositories;

namespace server.Models;

public class TinChi : TinChiDto, IEntityPostgre
{
  public static TinChi Generate()
  {
    return new TinChi()
    {
      LoaiTinChi = Guid.NewGuid().ToString(),
    //   TenVietTat = Guid.NewGuid().ToString()
    };
  }
  [Key]
  public Guid Id { get; set; } = Guid.NewGuid();

  public ICollection<HocPhan_TinChi>? HocPhan_TinChis { get; set; }
}

public class TinChiDto
{
  public string LoaiTinChi { get; set; } = null!;
  public float HeSoTinChi { get; set; } = 0!;
  public int SoTiet { get; set; } = 0!;
}