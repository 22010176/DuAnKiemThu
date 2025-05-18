using server.Repositories;

namespace server.Models.PostgreSQL;

public class GiangVien : GiangVienDto, IEntityPostgre
{
  public int Id { get; set; }
  public BangCap? BangCap { get; set; }
  public ICollection<Khoa_GiangVien>? Khoa_GiangViens { get; set; }
}

public class GiangVienDto
{
  public string TenGiangVien { get; set; } = null!;
  public int GioiTinh { get; set; }
  public DateTime SinhNhat { get; set; }
  public string SoDienThoai { get; set; } = null!;
  public string Mail { get; set; } = null!;
  public int BangCapId { get; set; }
}