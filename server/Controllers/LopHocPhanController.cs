using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using server.Models;
using server.Repositories;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class LopHocPhanController(IRepository<LopHocPhan> repo, AppDbContext context) : TemplatePostgreController<LopHocPhan, LopHocPhanDto>(repo)
{
    readonly AppDbContext _ct = context;

    // Thống kê lớp học phần đang mở
    [HttpGet("thong-ke-lop-hoc-phan-dang-mo")]
    public async Task<ActionResult> ThongKeLopDangMo()
    {
        var dangMoList = await _ct.LopHocPhans
            .Where(l => l.TrangThai == "DangMo")
            .Include(l => l.HocPhan)
            .Include(l => l.HocKi)
            .ToListAsync();

        return Ok(dangMoList);
    }

    // Lấy tất cả lớp học phần
    [HttpGet]
    public override async Task<ActionResult<ICollection>> Get()
    {
        var result =
        from l in _ct.LopHocPhan
        join hp in _ct.HocPhan on l.HocPhanId equals hp.Id
        join hk in _ct.HocKi on l.HocKiId equals hk.Id
        join gv in _ct.GiangVien on l.GiangVienId equals gv.Id
        orderby l.maLop.Length, l.maLop
        select new
        {
            l.maLop,
            l.tenLop,
            l.soLuongSinhVienDuKien,
            l.HocPhanId,
            l.HocKiId,
            l.GiangVienId,
            hp.TenHocPhan,
            hk.TenHocKi,
            gv.TenGiangVien,
            l.TrangThai
        };
        return Ok(await result.ToListAsync());
    }

    // Sửa thông tin lớp học phần
    [HttpPut("sua-thong-tin")]
    public async Task<IActionResult> SuaThongTin([FromBody] UpdateLopHocPhanDto dto)
    {
        var lop = await _ct.LopHocPhans.FindAsync(dto.Id);
        if (lop == null)
            return NotFound();

        lop.TenLop = dto.TenLop;
        lop.SoLuongSinhVienDuKien = dto.SoLuongSinhVienDuKien;
        lop.TrangThai = dto.TrangThai;

        await _ct.SaveChangesAsync();

        return Ok(lop);
    }

    // Thêm lớp học phần mới
    [HttpPost("them-hoc-phan")]
    public override async Task<IActionResult> Create(LopHocPhanDto dto)
    {
        var lop = new LopHocPhan
        {
            MaLop = dto.MaLop,
            TenLop = dto.TenLop,
            SoLuongSinhVienDuKien = dto.SoLuongSinhVienDuKien,
            HocKiId = dto.HocKiId,
            HocPhanId = dto.HocPhanId,
            TrangThai = dto.TrangThai ?? "DangMo",
            GiangVienId = dto.GiangVienId
        };

        _ct.LopHocPhans.Add(lop);
        await _ct.SaveChangesAsync();

        return Ok(lop);
    }


    // Xoá lớp học phần
    [HttpDelete("xoa/{id}")]
    public async Task<IActionResult> XoaLopHocPhan(int id)
    {
        var lop = await _ct.LopHocPhans.FindAsync(id);
        if (lop == null)
            return NotFound();

        _ct.LopHocPhans.Remove(lop);
        await _ct.SaveChangesAsync();

        return Ok();
    }

    // Phân công giảng viên giảng dạy
    [HttpPost("phan-cong-giang-vien")]
    public async Task<IActionResult> PhanCongGiangVien([FromBody] PhanCongGiangVienDto dto)
    {
        var lop = await _ct.LopHocPhans.FindAsync(dto.LopHocPhanId);
        if (lop == null)
            return NotFound();

        lop.GiangVienId = dto.GiangVienId;
        await _ct.SaveChangesAsync();

        return Ok(lop);
    }
}
