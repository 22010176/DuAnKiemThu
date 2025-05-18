using Microsoft.AspNetCore.Mvc;
using server.Models.PostgreSQL;
using server.Repositories;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class GiangVienController(
  IRepository<GiangVien> repo,
  IRepository<BangCap> bangCapRepository) : TemplatePostgreController<GiangVien, GiangVienDto>(repo)
{
  readonly IRepository<BangCap> _bangCapRepository = bangCapRepository;
  // [HttpGet]
  // public override async Task<ActionResult<ICollection>> Get()
  // {
  //   return Ok();
  // }
  [HttpPost]
  public override async Task<IActionResult> Create(GiangVienDto _gv)
  {
    var bangCap = await _bangCapRepository.FindAsync(i => i.Id == _gv.BangCapId);
    if (bangCap.Count == 0) return BadRequest(new { Message = "BangCap is invalid!" });

    GiangVien giangVien = new()
    {
      MaGiangVien = _gv.MaGiangVien,
      BangCapId = _gv.BangCapId,
      GioiTinh = _gv.GioiTinh,
      Mail = _gv.Mail,
      SinhNhat = _gv.SinhNhat,
      SoDienThoai = _gv.SoDienThoai,
      TenGiangVien = _gv.TenGiangVien
    };
    try { await _context.CreateAsync([giangVien]); }
    catch (Exception) { return BadRequest(new { Message = "Invalid Input!" }); }

    return CreatedAtAction(nameof(Get), new { id = giangVien.Id }, _gv);
  }
}