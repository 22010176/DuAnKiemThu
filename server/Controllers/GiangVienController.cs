using System.Collections;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models.PostgreSQL;
using server.Repositories;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class GiangVienController(
  IRepository<GiangVien> repo,
  IRepository<BangCap> bangCapRepository,
  IRepository<Khoa_GiangVien> k_gvRepository,
  AppDbContext context) : TemplatePostgreController<GiangVien, GiangVienDto>(repo)
{
  readonly IRepository<BangCap> _bangCapRepository = bangCapRepository;
  readonly IRepository<Khoa_GiangVien> _k_gvRepository = k_gvRepository;
  readonly AppDbContext _ct = context;

  [HttpGet]
  public override async Task<ActionResult<ICollection>> Get()
  {
    var result =
    from g in _ct.GiangVien
    join b in _ct.BangCap on g.BangCapId equals b.Id
    join kgv in _ct.Khoa_GiangVien on g.Id equals kgv.GiangVienId
    join k in _ct.Khoa on kgv.KhoaId equals k.Id
    join c in _ct.ChucVu on kgv.ChucVuId equals c.Id
    orderby g.MaGiangVien.Length, g.MaGiangVien
    select new
    {
      g.Id,
      g.MaGiangVien,
      g.TenGiangVien,
      GioiTinh = g.GioiTinh == 0 ? "Nam" : "Nữ",
      g.SinhNhat,
      g.SoDienThoai,
      g.Mail,
      b.MaBangCap,
      TenBangCap = b.TenVietTat,
      k.MaKhoa,
      TenKhoa = k.TenVietTat,
      c.MaChucVu,
      c.TenChucVu
    };
    return Ok(await result.ToListAsync());
  }

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
  [HttpPost("them-giang-vien")]

  public async Task<IActionResult> AddNewGiangVien([FromBody] CreateGiangVienDto d)
  {
    try
    {
      GiangVienDto _gv = d.GiangVien!;
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
      await _context.CreateAsync([giangVien]);

      Khoa_GiangVien kgv = new()
      {
        ChucVuId = d.ChucVuId,
        GiangVienId = giangVien.Id,
        KhoaId = d.KhoaId
      };
      await _k_gvRepository.CreateAsync([kgv]);

    }
    catch (Exception e)
    {
      Console.WriteLine(e);
      return BadRequest();
    }



    return Ok();
  }
}