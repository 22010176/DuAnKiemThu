using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using System.Collections;
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
        var dangMoList = await _ct.LopHocPhan
            .Where(l => l.TrangThai.ToString() == "DangMo")
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
            l.soLuongSinhVien,
            l.HocPhanId,
            l.HocKiId,
            l.GiangVienId,
            hp.TenHocPhan,
            hk.TenKi,
            gv.TenGiangVien,
            l.TrangThai
        };
        return Ok(await result.ToListAsync());
    }

    // Sửa thông tin lớp học phần
    [HttpPut("sua-thong-tin")]
    public async Task<IActionResult> SuaThongTin([FromBody] UpdateLopHocPhanDto dto)
    {
        var lop = await _ct.LopHocPhan.FindAsync(dto.LopHocPhanId);
        if (lop == null)
            return NotFound();

        lop.tenLop = dto.LopHocPhan!.tenLop;
        lop.soLuongSinhVien = dto.LopHocPhan.soLuongSinhVien;
        lop.TrangThai = dto.LopHocPhan.TrangThai;

        await _ct.SaveChangesAsync();

        return Ok(lop);
    }

    [HttpPost("cap-nhat-trang-thai/{id}")]
    public async Task<IActionResult> CapNhatTrangThai(Guid id)
    {
        var lop = await _ct.LopHocPhan.Include(l => l.HocKi).FirstOrDefaultAsync(l => l.Id == id);
        if (lop == null)
            return NotFound();

        lop.TrangThai = LopHocPhanDto.XacDinhTrangThai(lop);
        await _ct.SaveChangesAsync();

        return Ok(lop);
    }

    // Thêm lớp học phần mới
    [HttpPost("them-hoc-phan")]
    public override async Task<IActionResult> Create(LopHocPhanDto dto)
    {
        var hocKi = await _ct.HocKi.FindAsync(dto.HocKiId);
        if (hocKi == null)
            return BadRequest("Học kỳ không tồn tại");

        var hocPhan = await _ct.HocPhan.FindAsync(dto.HocPhanId);
        if (hocPhan == null)
            return BadRequest("Học phần không tồn tại");

        var exists = await _ct.LopHocPhan.AnyAsync(l => l.maLop == dto.maLop);
        if (exists)
            return BadRequest("Mã lớp đã tồn tại");

        var lop = new LopHocPhan
        {
            maLop = dto.maLop,
            tenLop = dto.tenLop,
            soLuongSinhVien = dto.soLuongSinhVien,
            HocKiId = dto.HocKiId,
            HocPhanId = dto.HocPhanId,
            GiangVienId = dto.GiangVienId
        };
        lop.TrangThai = LopHocPhanDto.XacDinhTrangThai(lop);

        _ct.LopHocPhan.Add(lop);
        await _ct.SaveChangesAsync();

        return Ok(lop);
    }

    // Xoá lớp học phần
    [HttpDelete("xoa/{id}")]
    public async Task<IActionResult> XoaLopHocPhan(Guid id)
    {
        var lop = await _ct.LopHocPhan.FindAsync(id);
        if (lop == null)
            return NotFound();

        _ct.LopHocPhan.Remove(lop);
        await _ct.SaveChangesAsync();

        return Ok();
    }

    // Phân công giảng viên giảng dạy
    [HttpPost("phan-cong-giang-vien")]
    public async Task<IActionResult> PhanCongGiangVien([FromBody] PhanCongGiangVienDto dto)
    {
        var lop = await _ct.LopHocPhan.FindAsync(dto.LopHocPhanId);
        if (lop == null)
            return NotFound();

        lop.GiangVienId = dto.GiangVienId;
        await _ct.SaveChangesAsync();
        lop.TrangThai = LopHocPhanDto.XacDinhTrangThai(lop);

        return Ok(lop);
    }
}
