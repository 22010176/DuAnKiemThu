using Microsoft.AspNetCore.Mvc;
using server.Models.PostgreSQL;
using server.Repositories;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class BangCapController(IRepository<BangCap> repo) : TemplatePostgreController<BangCap, BangCapDto>(repo)
{
  public override async Task<IActionResult> Create(BangCapDto item)
  {
    BangCap bc = new() { TenBangCap = item.TenBangCap };
    await _context.CreateAsync([bc]);
    return CreatedAtAction(nameof(Get), new { id = bc.Id }, item);
  }
}