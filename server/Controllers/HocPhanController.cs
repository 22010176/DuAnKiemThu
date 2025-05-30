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
        orderby c.maHP.Length, c.maHP
        select c;
    return Ok(await result.ToListAsync());
  }

  [HttpPost]
  public override async Task<IActionResult> Create(HocPhanDto _k)
  {
    HocPhan HocPhan = HocPhan.FormatInput(_ct, _k);
    List<string> strings = [
      HocPhan.maHP,
      HocPhan.tenHP,
      HocPhan.heSoHP.ToString(),
      HocPhan.KhoaId.ToString()
    ];
    if (strings.Any(string.IsNullOrEmpty)) return BadRequest("Nhập thiếu thông tin");

    if ((from c in _ct.HocPhan where c.tenHP == _k.tenHP select c).Any())
      return BadRequest("Tên học phần đã tồn tại");

    try
    {
      await _context.CreateAsync([HocPhan]);

    }
    catch (Exception)
    {
      return BadRequest("");
      throw;
    }

    return CreatedAtAction(nameof(Get), new { id = HocPhan.Id }, _k);
  }
}