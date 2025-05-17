using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Models.MongoDB;
using server.Repositories;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class BangCapController(IRepository<BangCap> repo) : TemplateController<BangCap, BangCapDto>(repo)
{
  public override async Task<ActionResult> Create(BangCapDto dto)
  {
    BangCap bangCap = new()
    {
      Id = Guid.NewGuid().ToString(),
      MaBangCap = dto.MaBangCap,
      TenBangCap = dto.TenBangCap,
      MoTa = dto.MoTa
    };
    await _repo.CreateAsync([bangCap]);
    return CreatedAtAction(nameof(Get), new { id = bangCap.Id }, bangCap);
  }
}