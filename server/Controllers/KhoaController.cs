using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Models.PostgreSQL;
using server.Repositories;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class KhoaController(IRepository<Khoa> repo) : TemplatePostgreController<Khoa, KhoaDto>(repo)
{
  public override async Task<IActionResult> Create(KhoaDto dto)
  {
    Khoa _khoa = new()
    {
      TenKhoa = dto.TenKhoa,
      MoTa = dto.MoTa,
      ViTri = dto.ViTri
    };
    await _context.CreateAsync([_khoa]);

    return CreatedAtAction(nameof(Get), new { id = _khoa.Id }, _khoa);
  }
}