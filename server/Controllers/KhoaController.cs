using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Models.MongoDB;
using server.Repositories;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class KhoaController(IRepository<Khoa> repo) : TemplateController<Khoa, KhoaDto>(repo)
{
  public override async Task<ActionResult> Create(KhoaDto dto)
  {
    Khoa _khoa = new()
    {
      Id = Guid.NewGuid().ToString(),
      MaKhoa = dto.MaKhoa,
      TenKhoa = dto.TenKhoa,
      MoTa = dto.MoTa,
      ViTri = dto.ViTri
    };
    await _repo.CreateAsync([_khoa]);

    return CreatedAtAction(nameof(Get), new { id = _khoa.Id }, _khoa);
  }
}