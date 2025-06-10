using System.Collections;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using server.Models;

using server.Repositories;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class HocPhanController(AppDbContext context) : ControllerBase
{
  readonly AppDbContext context = context;

  [HttpGet]
  public ActionResult<ICollection> Get()
  {
    var result =
      from c in context.HocPhan
      join k in context.Khoa on c.KhoaId equals k.Id
      orderby c.MaHocPhan.Length, c.MaHocPhan
      select new
      {
        c.Id,
        c.MaHocPhan,
        c.TenHocPhan,
        c.HeSoHocPhan,
        c.SoTiet,
        c.SoTinChi,
        KhoaId = k.Id,
        k.TenKhoa,
        k.MaKhoa
      };
    return Ok(result.ToList());
  }

  [HttpPut("sua-hoc-phan/{id}")]
  public IActionResult Update(Guid id, HocPhanInput input)
  {
    HocPhan hocPhan = context.HocPhan.FirstOrDefault(i => i.Id == id)!;
    if (hocPhan is null) return BadRequest("Không tìm thấy học phần!");

    hocPhan.TenHocPhan = input.TenHocPhan;
    hocPhan.HeSoHocPhan = input.HeSoHocPhan;
    hocPhan.SoTiet = input.SoTiet;
    hocPhan.SoTinChi = input.SoTinChi;

    context.SaveChanges();

    return Ok();
  }

  [HttpDelete]
  public async Task<IActionResult> Delete(string id)
  {
    try
    {
      context.HocPhan.Remove(context.HocPhan.FirstOrDefault(i => i.Id.ToString() == id)!);
      context.SaveChanges();
    }
    catch (Exception)
    {
      throw new Exception("Không tìm thấy học phần!");
    }
    return Ok();
  }

  [HttpPost]
  public async Task<IActionResult> Create(HocPhanDto item)
  {
    HocPhan hocPhan = HocPhan.FormatInput(context, item);
    List<string> strings = [
      hocPhan.MaHocPhan,
      hocPhan.TenHocPhan,
      hocPhan.HeSoHocPhan.ToString(),
      hocPhan.KhoaId.ToString()
    ];
    if (strings.Any(string.IsNullOrEmpty)) return BadRequest("Nhập thiếu thông tin");

    if ((from c in context.HocPhan where c.TenHocPhan == item.TenHocPhan select c).Any())
      return BadRequest("Tên học phần đã tồn tại");

    try
    {
      context.HocPhan.Add(hocPhan);
      context.SaveChanges();
    }
    catch (Exception)
    {
      throw new Exception("Thông tin không hợp lệ!");
    }

    return CreatedAtAction(nameof(Get), new { id = hocPhan.Id }, item);
  }
}

public class HocPhanInput
{
  public string TenHocPhan { get; set; } = null!;
  public int HeSoHocPhan { get; set; }
  public uint SoTinChi { get; set; } = 0!;
  public uint SoTiet { get; set; } = 0!;
  public Guid KhoaId { get; set; }
}