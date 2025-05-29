using System.Collections;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using server.Models;
using server.Repositories;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class BangCapController(IRepository<BangCap> repo, AppDbContext context) : TemplatePostgreController<BangCap, BangCapDto>(repo)
{
  readonly AppDbContext _ct = context;

  [HttpGet]
  public override async Task<ActionResult<ICollection>> Get()
  {
    var result =
      from c in _ct.BangCap
      orderby c.MaBangCap.Length, c.MaBangCap
      select c;

    return Ok(await result.ToListAsync());
  }

  [HttpPost]
  public override async Task<IActionResult> Create(BangCapDto item)
  {
    // if (item.GetType() == typeof(BangCapD))
    BangCap bc = BangCap.FormatInput(_ct, item);
    List<string> strings = [
      item.MaBangCap,
      item.TenBangCap,
      item.TenVietTat,
    ];
    if (strings.Any(string.IsNullOrEmpty)) return BadRequest("Nhập thiếu thông tin");
    try
    {
      await _context.CreateAsync([bc]);

    }
    catch (System.Exception)
    {
      return BadRequest("Thông tin không hợp lệ!");
    }
    return CreatedAtAction(nameof(Get), new { id = bc.Id }, item);
  }
}