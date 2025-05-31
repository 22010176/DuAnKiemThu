using System.Collections;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;
using server.Repositories;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class TinChiController(IRepository<TinChi> repo, AppDbContext context) : TemplatePostgreController<TinChi, TinChiDto>(repo)
{
  readonly AppDbContext _ct = context;
  [HttpGet]
  public override async Task<ActionResult<ICollection>> Get()
  {
    var result =
      from c in _ct.TinChi
      select c;

    return Ok(await result.ToListAsync());
  }
  [HttpPost]
  public override async Task<IActionResult> Create(TinChiDto _cv)
  {
    TinChi TinChi = new()
    {
        LoaiTinChi = _cv.LoaiTinChi,
        HeSoTinChi = _cv.HeSoTinChi,
        SoTiet = _cv.SoTiet
    };
    List<string> strings = [
      _cv.LoaiTinChi,
      _cv.HeSoTinChi.ToString(),
      _cv.SoTiet.ToString()
    ];
    if (strings.Any(string.IsNullOrEmpty)) return BadRequest("Nhập thiếu thông tin");
    await _context.CreateAsync([TinChi]);
    return CreatedAtAction(nameof(Get), new { id = TinChi.Id }, _cv);
  }
}