using System.ComponentModel.DataAnnotations;
using server.Repositories;

namespace server.Models;

public class HocPhan : HocPhanDto, IEntityPostgre
{
  public static HocPhan Generate()
  {
    return new()
    {
      maHP = Guid.NewGuid().ToString(),
      tenHP = Guid.NewGuid().ToString(),
      //   heSoHP = Guid.NewGuid().ToString()
    };
  }
  public static HocPhan FormatInput(AppDbContext context, HocPhanDto input)
  {
    // Console.WriteLine($"FAC_{input.TenVietTat}");
    return new()
    {
      maHP = $"{Khoa.Generate().MaKhoa}",
      tenHP = input.tenHP,
      heSoHP = input.heSoHP
    };
  }

  [Key]
  public Guid Id { get; set; } = Guid.NewGuid();

  public ICollection<HocPhan_TinChi>? HocPhan_TinChis { get; set; }
  public ICollection<LopHocPhan>? LopHocPhans { get; set; }
}

public class HocPhanDto
{
  public string maHP { get; set; } = null!;
  public string tenHP { get; set; } = null!;
  public float heSoHP { get; set; } = 0!;
}