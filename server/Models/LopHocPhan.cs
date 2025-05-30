using System.ComponentModel.DataAnnotations;
using System.Net.Mail;
using Microsoft.EntityFrameworkCore;
using server.Repositories;

namespace server.Models;

public class LopHocPhan : LopHocPhanDto, IEntityPostgre
{
    static string GenerateRandomName(int length)
    {
        Random _random = new();
        const string chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ";
        return new string([..
      Enumerable
        .Repeat(chars, length)
        .Select(s => s[_random.Next(s.Length)])
        ]);
    }
    public static LopHocPhan Generate(string hocKi, string hocPhan, string namBd)
    {
        Random random = new();
        string name = GenerateRandomName(random.Next() % 20);
        return new()
        {
            maLop = $"{hocPhan}_{hocKi}_{namBd}", //HP_KI_Năm bd
            tenLop = name,
            soLuongSinhVien = random.NextInt64(20, 200)
        };
    }
    public static string IsValid(AppDbContext context, CreateLopHocPhanDto input)
    {
        if (string.IsNullOrWhiteSpace(input.LopHocPhan?.maLop))
            return "Mã lớp không được để trống";
        if (string.IsNullOrWhiteSpace(input.LopHocPhan?.tenLop))
            return "Tên lớp không được để trống";
        if (input.LopHocPhan?.soLuongSinhVien <= 0)
            return "Số lượng sinh viên phải lớn hơn 0";

        return string.Empty;
    }
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
}

public class LopHocPhanDto
{
    public string maLop { get; set; } = null!;
    public string tenLop { get; set; } = null!;
    public long soLuongSinhVien { get; set; } = 0!;
    public HocPhan? HocPhan { get; set; }
    public HocKi? HocKi { get; set; }
}

public class CreateLopHocPhanDto
{
  public LopHocPhanDto? LopHocPhan { get; set; }
  public Guid HocPhanId { get; set; }
  public Guid HocKiId { get; set; }
}
