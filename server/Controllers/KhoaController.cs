using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Models.PostgreSQL;
using server.Repositories;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class KhoaController(IRepository<Khoa> repo) : TemplatePostgreController<Khoa, KhoaDto>(repo)
{
  [HttpPost]
  public override async Task<IActionResult> Create(KhoaDto _k)
  {
    Khoa khoa = new()
    {
      MaKhoa = _k.MaKhoa,
      TenKhoa = _k.TenKhoa,
      MoTa = _k.MoTa,
      ViTri = _k.ViTri
    };
    await _context.CreateAsync([khoa]);

    return CreatedAtAction(nameof(Get), new { id = khoa.Id }, _k);
  }
}