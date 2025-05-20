using System.ComponentModel.DataAnnotations;
using server.Data;
using server.Repositories;

namespace server.Models.PostgreSQL;

public class GiangVien : GiangVienDto, IEntityPostgre
{
  static DateTime GenerateRandomDate(DateTime from, DateTime to)
  {
    var random = new Random();
    var range = (to - from).Days;
    return new DateTime();
  }
  public static string GenerateRandomVietnamPhoneNumber()
  {
    var prefixes = new[] { "09", "03", "07", "08", "05" };
    var random = new Random();

    string prefix = prefixes[random.Next(prefixes.Length)];
    string number = random.Next(10000000, 99999999).ToString(); // 8 chữ số sau

    return prefix + number;
  }
  public static string GenerateRandomEmail()
  {
    var random = new Random();
    var domains = new[] { "gmail.com", "yahoo.com", "outlook.com", "example.com" };
    var namePrefix = "user";
    int number = random.Next(0, int.MaxValue);
    string domain = domains[random.Next(domains.Length)];

    return $"{namePrefix}{number}{Guid.NewGuid()}@{domain}";
  }
  public static GiangVien Generate(Guid bangCapId)
  {
    Random random = new();
    return new()
    {
      MaGiangVien = Guid.NewGuid().ToString(),
      TenGiangVien = Guid.NewGuid().ToString(),
      GioiTinh = random.Next() % 2,
      SinhNhat = GenerateRandomDate(new DateTime(1950, 1, 1), new DateTime(2000, 1, 1)),
      SoDienThoai = GenerateRandomVietnamPhoneNumber(),
      Mail = GenerateRandomEmail(),
      BangCapId = bangCapId
    };
  }
  [Key]
  public Guid Id { get; set; } = Guid.NewGuid();
  public BangCap? BangCap { get; set; }
  public ICollection<Khoa_GiangVien>? Khoa_GiangViens { get; set; }
}

public class GiangVienDto
{
  public string MaGiangVien { get; set; } = null!;
  public string TenGiangVien { get; set; } = null!;
  public int GioiTinh { get; set; }
  public DateTime SinhNhat { get; set; }
  public string SoDienThoai { get; set; } = null!;
  public string Mail { get; set; } = null!;
  public Guid BangCapId { get; set; }
}