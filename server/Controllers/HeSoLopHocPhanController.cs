using Microsoft.AspNetCore.Mvc;
using server.Models;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class HeSoLopHocPhanController(AppDbContext context) : ControllerBase
{
  readonly AppDbContext context = context;

  [HttpGet]
  public ActionResult Get()
  {
    var result =
      from h in context.HeSoLop
      orderby h.SoHocSinhToiThieu ascending
      select h;
    return Ok(result.ToList());
  }

  [HttpPost]
  public async Task<ActionResult> Post(HeSoLopInput input)
  {
    HeSoLop h = new()
    {
      HeSo = input.HeSo,
      SoHocSinhToiThieu = input.SoHocSinhToiThieu
    };

    context.HeSoLop.Add(h);
    await context.SaveChangesAsync();

    return Ok();
  }

  [HttpPut("{id}")]
  public async Task<ActionResult> Put(Guid id, HeSoLopInput input)
  {
    HeSoLop heSoLop = context.HeSoLop.Find(id)!;
    if (heSoLop is null) return NotFound();

    heSoLop.HeSo = input.HeSo;
    heSoLop.SoHocSinhToiThieu = input.SoHocSinhToiThieu;

    await context.SaveChangesAsync();
    return Ok();
  }

  [HttpDelete("{id}")]
  public ActionResult Delete(Guid id)
  {
    try
    {
      context.HeSoLop.Remove(context.HeSoLop.FirstOrDefault(i => i.Id == id)!);
      context.SaveChanges();
    }
    catch (Exception)
    {
      return NotFound();
    }
    return NoContent();
  }
}

public class HeSoLopInput()
{
  public uint SoHocSinhToiThieu { get; set; }
  public double HeSo { get; set; }
}