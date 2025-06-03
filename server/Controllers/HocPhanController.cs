using System.Collections;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using server.Models;

using server.Repositories;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class HocPhanController(IRepository<HocPhan> repo, AppDbContext context) : TemplatePostgreController<HocPhan, HocPhanDto>(repo)
{
  readonly AppDbContext _ct = context;

  [HttpGet]
  public override async Task<ActionResult<ICollection>> Get()
  {
    var result =
      from c in _ct.HocPhan
      join k in _ct.Khoa on c.KhoaId equals k.Id
      orderby c.MaHP.Length, c.MaHP
      select new
      {
        c.Id,
        c.MaHP,
        c.TenHP,
        c.HeSoHP,
        k.TenKhoa,
        k.MaKhoa
      };
    return Ok(await result.ToListAsync());
  }

  [HttpPut("sua-hoc-phan/{id}")]
  public async Task<IActionResult> Update(string id, HocPhanInput input)
  {
    HocPhan? hocPhan = _ct.HocPhan.FirstOrDefault(i => i.Id.ToString() == id);
    if (hocPhan is null) return NotFound();

    hocPhan.TenHP = input.TenHP;
    hocPhan.HeSoHP = input.HeSoHP;
    await _context.UpdateAsync([hocPhan]);
    return Ok();
  }

  // [HttpPost("them-hoc-phan")]
  // public async Task<IActionResult> Create(HocPhanInput _k)
  // {
  //   HocPhan HocPhan = HocPhan.FormatInput(_ct, _k);
  //   List<string> strings = [
  //     HocPhan.MaHP,
  //     HocPhan.TenHP,
  //     HocPhan.HeSoHP.ToString(),
  //     HocPhan.KhoaId.ToString()
  //   ];
  //   if (strings.Any(string.IsNullOrEmpty)) return BadRequest("Nhập thiếu thông tin");

  //   if ((from c in _ct.HocPhan where c.TenHP == _k.TenHP select c).Any())
  //     return BadRequest("Tên học phần đã tồn tại");

  //   try
  //   {
  //     await _context.CreateAsync([HocPhan]);

  //   }
  //   catch (Exception)
  //   {
  //     return BadRequest("");
  //     throw;
  //   }

  //   return CreatedAtAction(nameof(Get), new { id = HocPhan.Id }, _k);
  // }
  [HttpPost]
  public override async Task<IActionResult> Create(HocPhanDto item)
  {
    HocPhan hocPhan = HocPhan.FormatInput(_ct, item);
    List<string> strings = [
      hocPhan.MaHP,
      hocPhan.TenHP,
      hocPhan.HeSoHP.ToString(),
      hocPhan.KhoaId.ToString()
    ];
    if (strings.Any(string.IsNullOrEmpty)) return BadRequest("Nhập thiếu thông tin");

    if ((from c in _ct.HocPhan where c.TenHP == item.TenHP select c).Any())
      return BadRequest("Tên học phần đã tồn tại");

    try
    {
      await _context.CreateAsync([hocPhan]);
    }
    catch (Exception)
    {
      return BadRequest("");
      throw;
    }

    return CreatedAtAction(nameof(Get), new { id = hocPhan.Id }, item);
  }
}

public class HocPhanInput
{

  public string TenHP { get; set; } = null!;
  public int HeSoHP { get; set; }
  public Guid KhoaId { get; set; }

}