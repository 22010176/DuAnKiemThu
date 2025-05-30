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
    if (string.IsNullOrWhiteSpace(input.tenHP))
      throw new Exception("Tên học phần không được để trống");
    if (input.heSoHP <= 0)
      throw new Exception("Hệ số học phần phải lớn hơn 0");

    var khoa = context.Khoa.FirstOrDefault(k => k.Id == input.KhoaId);
    //if (khoa == null) throw new Exception("Không tìm thấy Khoa");
    var maKhoa = khoa.MaKhoa.Length > 4 ? khoa.MaKhoa.Substring(4) : khoa.MaKhoa;

    var count = context.HocPhan.Count(hp => hp.Khoa.Id == input.KhoaId);
    var stt = count + 1;

    return new()
    {
      maHP = $"{maKhoa}_{stt}",
      tenHP = input.tenHP,
      heSoHP = input.heSoHP,
      Khoa = khoa
    };
  }

  [Key]
  public Guid Id { get; set; } = Guid.NewGuid();
  public Khoa? Khoa { get; set; }
  public ICollection<HocPhan_TinChi>? HocPhan_TinChis { get; set; }
  public ICollection<LopHocPhan>? LopHocPhans { get; set; }
}

public class HocPhanDto
{
  public string maHP { get; set; } = null!;
  public string tenHP { get; set; } = null!;
  public float heSoHP { get; set; } = 0!;
  public Guid KhoaId { get; set; }
}