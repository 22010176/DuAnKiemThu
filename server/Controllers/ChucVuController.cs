using System.Collections;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Repositories;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class ChucVuController(IRepository<ChucVu> repo, AppDbContext context) : TemplatePostgreController<ChucVu, ChucVuDto>(repo)
{
  readonly AppDbContext _ct = context;
  [HttpGet]
  public override async Task<ActionResult<ICollection>> Get()
  {
    var result = from c in _ct.ChucVu
                 orderby c.MaChucVu.Length, c.MaChucVu
                 select c;

    return Ok(await result.ToListAsync());
  }
  [HttpPost]
  public override async Task<IActionResult> Create(ChucVuDto _cv)
  {
    ChucVu chucVu = new()
    {
      MaChucVu = _cv.MaChucVu,
      TenChucVu = _cv.TenChucVu,
      TenVietTat = _cv.TenVietTat
    };
    await _context.CreateAsync([chucVu]);
    return CreatedAtAction(nameof(Get), new { id = chucVu.Id }, _cv);
  }
}