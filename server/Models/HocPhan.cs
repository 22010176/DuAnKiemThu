using System.ComponentModel.DataAnnotations;
using server.Controllers;
using server.Repositories;

namespace server.Models;

public class HocPhan : HocPhanDto, IEntityPostgre
{
  public static HocPhan GenerateSample(string tenHP, float heSoHP, Khoa khoa)
  {
      return new()
      {
          MaHP = $"{khoa.MaKhoa}_{DateTime.Now.Ticks}",
          TenHP = tenHP,
          HeSoHP = heSoHP,
          Khoa = khoa
      };
  }

  public static HocPhan FormatInput(AppDbContext context, HocPhanDto input)
  {
    if (string.IsNullOrWhiteSpace(input.TenHP))
      throw new Exception("Tên học phần không được để trống");
    if (input.HeSoHP <= 0)
      throw new Exception("Hệ số học phần phải lớn hơn 0");

    var khoa = context.Khoa.FirstOrDefault(k => k.Id == input.KhoaId);
    if (khoa == null) throw new Exception("Không tìm thấy Khoa");
    var maKhoa = khoa!.MaKhoa.Length > 4 ? khoa.MaKhoa[4..] : khoa.MaKhoa;

    var count = context.HocPhan.Count(hp => hp.Khoa!.Id == input.KhoaId);
    var stt = count + 1;

    return new()
    {
      MaHP = $"{maKhoa}_{stt}",
      TenHP = input.TenHP,
      HeSoHP = input.HeSoHP,
      Khoa = khoa
    };
  }
  public static HocPhan FormatInput(AppDbContext context, HocPhanInput input)
  {
    if (string.IsNullOrWhiteSpace(input.TenHP))
      throw new Exception("Tên học phần không được để trống");
    if (input.HeSoHP <= 0)
      throw new Exception("Hệ số học phần phải lớn hơn 0");

    var khoa = context.Khoa.FirstOrDefault(k => k.Id == input.KhoaId);
    //if (khoa == null) throw new Exception("Không tìm thấy Khoa");
    var maKhoa = khoa!.MaKhoa.Length > 4 ? khoa.MaKhoa[4..] : khoa.MaKhoa;

    var count = context.HocPhan.Count(hp => hp.Khoa!.Id == input.KhoaId);
    var stt = count + 1;

    return new()
    {
      MaHP = $"{maKhoa}_{stt}",
      TenHP = input.TenHP,
      HeSoHP = input.HeSoHP,
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
  public string MaHP { get; set; } = null!;
  public string TenHP { get; set; } = null!;
  public float HeSoHP { get; set; } = 0!;
  public Guid KhoaId { get; set; }
}