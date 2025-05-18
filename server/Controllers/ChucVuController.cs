using Microsoft.AspNetCore.Mvc;

using server.Models.PostgreSQL;
using server.Repositories;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class ChucVuController(IRepository<ChucVu> repo) : TemplatePostgreController<ChucVu, ChucVuDto>(repo)
{
  public override async Task<IActionResult> Create(ChucVuDto dto)
  {
    ChucVu chucVu = new() { TenChucVu = dto.TenChucVu };
    await _context.CreateAsync([chucVu]);
    return CreatedAtAction(nameof(Get), new { id = chucVu.Id }, dto);
  }
}