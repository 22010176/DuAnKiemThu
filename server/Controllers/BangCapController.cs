using Microsoft.AspNetCore.Mvc;
using server.Models.PostgreSQL;
using server.Repositories;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class BangCapController(IRepository<BangCap> repo) : TemplatePostgreController<BangCap, BangCapDto>(repo)
{
  [HttpPost]
  public override async Task<IActionResult> Create(BangCapDto item)
  {
    // if (item.GetType() == typeof(BangCapD))
    BangCap bc = new()
    {
      MaBangCap = item.MaBangCap,
      TenBangCap = item.TenBangCap,
      TenVietTat = item.TenVietTat
    };
    await _context.CreateAsync([bc]);
    return CreatedAtAction(nameof(Get), new { id = bc.Id }, item);
  }
}