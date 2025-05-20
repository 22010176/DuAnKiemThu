using Microsoft.AspNetCore.Mvc;

using server.Models.PostgreSQL;
using server.Repositories;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class ChucVuController(IRepository<ChucVu> repo) : TemplatePostgreController<ChucVu, ChucVuDto>(repo)
{
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