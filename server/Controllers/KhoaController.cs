using System.Collections;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using server.Models;

using server.Repositories;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class KhoaController(IRepository<Khoa> repo, AppDbContext context) : TemplatePostgreController<Khoa, KhoaDto>(repo)
{
  readonly AppDbContext _ct = context;

  [HttpGet]
  public override async Task<ActionResult<ICollection>> Get()
  {
    var result = from c in _ct.Khoa
                 orderby c.MaKhoa.Length, c.MaKhoa
                 select c;

    return Ok(await result.ToListAsync());
  }

  [HttpPost]
  public override async Task<IActionResult> Create(KhoaDto _k)
  {
    Khoa khoa = new()
    {
      MaKhoa = _k.MaKhoa,
      TenKhoa = _k.TenKhoa,
      TenVietTat = _k.TenVietTat,
      ViTri = _k.ViTri
    };
    await _context.CreateAsync([khoa]);

    return CreatedAtAction(nameof(Get), new { id = khoa.Id }, _k);
  }
}