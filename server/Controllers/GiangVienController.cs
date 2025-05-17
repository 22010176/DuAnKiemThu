using System.Collections;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using server.Models;
using server.Repositories;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class GiangVienController(IRepository<GiangVien> repo, IRepository<BangCap> bangCapRepository) : TemplateController<GiangVien, GiangVienDto>(repo)
{
  readonly MongoRepository<BangCap> _bangCapRepository = (MongoRepository<BangCap>)bangCapRepository;
  readonly MongoRepository<GiangVien> _giangVienRepository = (MongoRepository<GiangVien>)repo;

  [HttpGet]
  public override async Task<ActionResult<IList>> Get()
  {
    var _bangCapCollection = _bangCapRepository.GetMongoCollection();
    var _giangVienCollection = _giangVienRepository.GetMongoCollection();

    var result = await _giangVienCollection.Aggregate()
    .Lookup<GiangVien, BangCap, GiangVienBangCap>(
      _bangCapCollection,
      giangVien => giangVien.BangCapId,
      bangCap => bangCap.Id,
      gvbc => gvbc.BangCap
    ).ToListAsync();
    return Ok(result);
  }

  public override async Task<ActionResult> Create(GiangVienDto dto)
  {
    var bangCap = await _bangCapRepository.GetByIdAsync(dto.BangCapId);
    if (bangCap is null) return BadRequest(new { Message = "BangCap is invalid!" });

    GiangVien giangVien = new()
    {
      Id = Guid.NewGuid().ToString(),
      BangCapId = dto.BangCapId,
      GioiTinh = dto.GioiTinh,
      Mail = dto.Mail,
      SinhNhat = dto.SinhNhat,
      SoDienThoai = dto.SoDienThoai,
      TenGiangVien = dto.TenGiangVien
    };
    try { await _giangVienRepository.CreateAsync(giangVien); }
    catch (Exception) { return BadRequest(new { Message = "Invalid Input!" }); }

    return CreatedAtAction(nameof(Get), new { id = giangVien.Id }, dto);
  }
}