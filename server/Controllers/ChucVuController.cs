using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Repositories;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class ChucVuController(IRepository<ChucVu> repo) : TemplateController<ChucVu, ChucVuDto>(repo)
{
  public override async Task<ActionResult> Create(ChucVuDto dto)
  {
    ChucVu chucVu = new()
    {
      Id = Guid.NewGuid().ToString(),
      TenChucVu = dto.TenChucVu
    };
    await _repo.CreateAsync(chucVu);
    return CreatedAtAction(nameof(Get), new { id = chucVu.Id }, dto);
  }
}