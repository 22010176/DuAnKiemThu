using System.ComponentModel.DataAnnotations;
using server.Repositories;

namespace server.Models;

public class HocPhan_TinChi : HocPhan_TinChiDto, IEntityPostgre
{
  [Key]
  public Guid Id { get; set; } = Guid.NewGuid();
  public int SoTiet { get; set; } = 0!;

  public TinChi? LoaiTinChi { get; set; }
  public HocPhan? HocPhan { get; set; }
}

public class UpdateTinChiDto
{
  public TinChi? TinChi { get; set; }
  public Guid HocPhanId { get; set; }
  public Guid TinChiId { get; set; }
}

public class CreateTinChiDto
{
  public TinChiDto? TinChi { get; set; }
  public Guid HocPhanId { get; set; }
  public Guid TinChiId { get; set; }
}

public class HocPhan_TinChiDto
{
  public Guid TinChiId { get; set; }
  public Guid HocPhanId { get; set; }
}