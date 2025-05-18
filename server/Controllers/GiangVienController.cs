using System.Collections;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using server.Models;
using server.Models.PostgreSQL;
using server.Repositories;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class GiangVienController(IRepository<GiangVien> repo, IRepository<BangCap> bangCapRepository) : TemplatePostgreController<GiangVien, GiangVienDto>(repo)
{
  IRepository<BangCap> _bangCapRepository = bangCapRepository;
  // [HttpGet]
  // public override async Task<ActionResult<ICollection>> Get()
  // {
  //   return Ok();
  // }

  public override async Task<IActionResult> Create(GiangVienDto dto)
  {
    var bangCap = await _bangCapRepository.FindAsync(i => i.Id == dto.BangCapId);
    if (bangCap is null) return BadRequest(new { Message = "BangCap is invalid!" });

    GiangVien giangVien = new()
    {
      BangCapId = dto.BangCapId,
      GioiTinh = dto.GioiTinh,
      Mail = dto.Mail,
      SinhNhat = dto.SinhNhat,
      SoDienThoai = dto.SoDienThoai,
      TenGiangVien = dto.TenGiangVien
    };
    try { await _context.CreateAsync([giangVien]); }
    catch (Exception) { return BadRequest(new { Message = "Invalid Input!" }); }

    return CreatedAtAction(nameof(Get), new { id = giangVien.Id }, dto);
  }
}