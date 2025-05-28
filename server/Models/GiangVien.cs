using System.ComponentModel.DataAnnotations;
using server.Repositories;

namespace server.Models;

public class GiangVien : GiangVienDto, IEntityPostgre
{
  static DateTime GenerateRandomDate()
  {
    Random rand = new();
    return new DateTime(1950 + rand.Next() % 60, rand.Next() % 12 + 1, rand.Next() % 28 + 1, 0, 0, 0, DateTimeKind.Utc);
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
  public static GiangVien Generate(Guid bangCapId, int count)
  {
    Random random = new();
    return new()
    {
      MaGiangVien = $"GV-{count}",
      TenGiangVien = Guid.NewGuid().ToString(),
      GioiTinh = random.Next() % 2,
      SinhNhat = GenerateRandomDate(),
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