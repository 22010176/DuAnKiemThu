using System.ComponentModel.DataAnnotations;
using server.Repositories;

namespace server.Models.PostgreSQL;

public class GiangVien : GiangVienDto, IEntityPostgre
{
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