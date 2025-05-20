using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models.PostgreSQL;


namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class TestController(AppDbContext context) : ControllerBase
{
  readonly AppDbContext _ct = context;
  [HttpDelete]
  public async Task<ActionResult> Delete()
  {
    _ct.Khoa_GiangVien.RemoveRange(await _ct.Khoa_GiangVien.ToListAsync());
    _ct.GiangVien.RemoveRange(await _ct.GiangVien.ToListAsync());
    _ct.BangCap.RemoveRange(await _ct.BangCap.ToListAsync());
    _ct.ChucVu.RemoveRange(await _ct.ChucVu.ToListAsync());
    _ct.Khoa.RemoveRange(await _ct.Khoa.ToListAsync());
    await _ct.SaveChangesAsync();

    return Ok();
  }

  [HttpGet("add1")]
  public async Task<ActionResult> DD()
  {
    _ct.BangCap.RemoveRange(await _ct.BangCap.ToListAsync());
    _ct.ChucVu.RemoveRange(await _ct.ChucVu.ToListAsync());
    _ct.Khoa.RemoveRange(await _ct.Khoa.ToListAsync());
    await _ct.SaveChangesAsync();

    List<Khoa> _khoa = [
        new () { MaKhoa = "K-1", TenKhoa = "Khoa Công nghệ thông tin", TenVietTat = "CNTT", ViTri="" },
        new () { MaKhoa = "K-2", TenKhoa = "Khoa Kỹ thuật phần mềm", TenVietTat = "KTPM", ViTri="" },
        new () { MaKhoa = "K-3", TenKhoa = "Khoa Hệ thống thông tin", TenVietTat = "HTTT", ViTri="" },
        new () { MaKhoa = "K-4", TenKhoa = "Khoa An toàn thông tin", TenVietTat = "ATTT", ViTri="" },
        new () { MaKhoa = "K-5", TenKhoa = "Khoa Khoa học máy tính", TenVietTat = "KHMT", ViTri="" },
        new () { MaKhoa = "K-6", TenKhoa = "Khoa Kỹ thuật điện - điện tử", TenVietTat = "Đ-ĐT", ViTri="" },
        new () { MaKhoa = "K-7", TenKhoa = "Khoa Cơ khí", TenVietTat = "CK", ViTri="" },
        new () { MaKhoa = "K-8", TenKhoa = "Khoa Xây dựng", TenVietTat = "XD", ViTri="" },
        new () { MaKhoa = "K-9", TenKhoa = "Khoa Kiến trúc", TenVietTat = "KT", ViTri="" },
        new () { MaKhoa = "K-10", TenKhoa = "Khoa Toán - Tin học", TenVietTat = "TTH", ViTri="" },
        new () { MaKhoa = "K-11", TenKhoa = "Khoa Vật lý kỹ thuật", TenVietTat = "VLKT", ViTri="" },
        new () { MaKhoa = "K-12", TenKhoa = "Khoa Hóa học", TenVietTat = "HH", ViTri="" },
        new () { MaKhoa = "K-13", TenKhoa = "Khoa Sinh học", TenVietTat = "SH", ViTri="" },
        new () { MaKhoa = "K-14", TenKhoa = "Khoa Môi trường", TenVietTat = "MT", ViTri="" },
        new () { MaKhoa = "K-15", TenKhoa = "Khoa Kinh tế", TenVietTat = "KT", ViTri="" },
        new () { MaKhoa = "K-16", TenKhoa = "Khoa Tài chính - Ngân hàng", TenVietTat = "TCNH", ViTri="" },
        new () { MaKhoa = "K-17", TenKhoa = "Khoa Quản trị kinh doanh", TenVietTat = "QTKD", ViTri="" },
        new () { MaKhoa = "K-18", TenKhoa = "Khoa Marketing", TenVietTat = "MKT", ViTri="" },
        new () { MaKhoa = "K-19", TenKhoa = "Khoa Kế toán - Kiểm toán", TenVietTat = "KTKT", ViTri="" },
        new () { MaKhoa = "K-20", TenKhoa = "Khoa Luật", TenVietTat = "LUẬT", ViTri="" },
        new () { MaKhoa = "K-21", TenKhoa = "Khoa Ngôn ngữ Anh", TenVietTat = "NNA", ViTri="" },
        new () { MaKhoa = "K-22", TenKhoa = "Khoa Ngôn ngữ Trung", TenVietTat = "NNT", ViTri="" },
        new () { MaKhoa = "K-23", TenKhoa = "Khoa Quốc tế học", TenVietTat = "QTH", ViTri="" },
        new () { MaKhoa = "K-24", TenKhoa = "Khoa Sư phạm", TenVietTat = "SP", ViTri="" },
        new () { MaKhoa = "K-25", TenKhoa = "Khoa Báo chí - Truyền thông", TenVietTat = "BC-TT", ViTri="" },
        new () { MaKhoa = "K-26", TenKhoa = "Khoa Xã hội học", TenVietTat = "XHH", ViTri="" },
        new () { MaKhoa = "K-27", TenKhoa = "Khoa Tâm lý học", TenVietTat = "TLH", ViTri="" },
        new () { MaKhoa = "K-28", TenKhoa = "Khoa Du lịch", TenVietTat = "DL", ViTri="" },
        new () { MaKhoa = "K-29", TenKhoa = "Khoa Giáo dục thể chất", TenVietTat = "TDTT", ViTri="" },
        new () { MaKhoa = "K-30", TenKhoa = "Khoa Y", TenVietTat = "Y", ViTri="" },
        new () { MaKhoa = "K-31", TenKhoa = "Khoa Dược", TenVietTat = "DƯỢC", ViTri="" },
        new () { MaKhoa = "K-32", TenKhoa = "Khoa Điều dưỡng", TenVietTat = "DD", ViTri="" },
        new () { MaKhoa = "K-33", TenKhoa = "Khoa Công nghệ thực phẩm", TenVietTat = "CNTP", ViTri="" }
    ];

    List<BangCap> _bangCap = [
        new (){ MaBangCap = "BC-1", TenBangCap = "Giáo sư", TenVietTat = "GS" },
        new (){ MaBangCap = "BC-2", TenBangCap = "Phó Giáo sư", TenVietTat = "PGS" },
        new (){ MaBangCap = "BC-3", TenBangCap = "Tiến sĩ", TenVietTat = "TS" },
        new (){ MaBangCap = "BC-4", TenBangCap = "Tiến sĩ khoa học", TenVietTat = "TSKH" },
        new (){ MaBangCap = "BC-5", TenBangCap = "Thạc sĩ", TenVietTat = "ThS" },
        new (){ MaBangCap = "BC-6", TenBangCap = "Cử nhân", TenVietTat = "CN" },
        new (){ MaBangCap = "BC-7", TenBangCap = "Kỹ sư", TenVietTat = "KS" },
        new (){ MaBangCap = "BC-8", TenBangCap = "Bác sĩ", TenVietTat = "BS" },
        new (){ MaBangCap = "BC-9", TenBangCap = "Dược sĩ", TenVietTat = "DS" },
        new (){ MaBangCap = "BC-10", TenBangCap = "Giáo viên", TenVietTat = "GV" }
    ];

    List<ChucVu> _chucVu = [
      new () { MaChucVu = "CV-1", TenChucVu = "Hiệu trưởng", TenVietTat = "HT" },
        new () { MaChucVu = "CV-2", TenChucVu = "Phó Hiệu trưởng", TenVietTat = "PHT" },
        new () { MaChucVu = "CV-3", TenChucVu = "Trưởng khoa", TenVietTat = "TK" },
        new () { MaChucVu = "CV-4", TenChucVu = "Phó Trưởng khoa", TenVietTat = "PTK" },
        new () { MaChucVu = "CV-5", TenChucVu = "Trưởng bộ môn", TenVietTat = "TBM" },
        new () { MaChucVu = "CV-6", TenChucVu = "Phó Trưởng bộ môn", TenVietTat = "PTBM" },
        new () { MaChucVu = "CV-7", TenChucVu = "Chủ nhiệm chương trình", TenVietTat = "CNCTr" },
        new () { MaChucVu = "CV-8", TenChucVu = "Thư ký khoa", TenVietTat = "TKhK" },
        new () { MaChucVu = "CV-9", TenChucVu = "Giảng viên chính", TenVietTat = "GVC" },
        new () { MaChucVu = "CV-10", TenChucVu = "Giảng viên", TenVietTat = "GV" },
        new () { MaChucVu = "CV-11", TenChucVu = "Trợ giảng", TenVietTat = "TG" },
        new () { MaChucVu = "CV-12", TenChucVu = "Nghiên cứu viên", TenVietTat = "NCV" },
        new () { MaChucVu = "CV-13", TenChucVu = "Thư ký khoa học", TenVietTat = "TKKH" },
        new () { MaChucVu = "CV-14", TenChucVu = "Trưởng phòng đào tạo", TenVietTat = "TPĐT" },
        new () { MaChucVu = "CV-15", TenChucVu = "Cán bộ quản lý đào tạo", TenVietTat = "CBQLĐT" }
    ];

    try
    {
      await _ct.Khoa.AddRangeAsync(_khoa);
      await _ct.BangCap.AddRangeAsync(_bangCap);
      await _ct.ChucVu.AddRangeAsync(_chucVu);
      await _ct.SaveChangesAsync();
    }
    catch (Exception)
    {

    }
    return Ok();
  }

  [HttpGet("add2")]
  public async Task<ActionResult> AddGV()
  {
    List<BangCap> _bangCap = await _ct.BangCap.ToListAsync();
    List<ChucVu> _ChucVu = await _ct.ChucVu.ToListAsync();
    List<Khoa> _Khoa = await _ct.Khoa.ToListAsync();
    var random = new Random();
    for (int i = 0; i < 10000; ++i)
    {
      try
      {
        GiangVien giangVien = GiangVien.Generate(_bangCap[random.Next(_bangCap.Count)].Id);
        Khoa_GiangVien kgv = new()
        {
          ChucVuId = _ChucVu[random.Next(_ChucVu.Count)].Id,
          GiangVienId = giangVien.Id,
          KhoaId = _Khoa[random.Next(_Khoa.Count)].Id
        };

        await _ct.GiangVien.AddAsync(giangVien);
        await _ct.Khoa_GiangVien.AddAsync(kgv);
        await _ct.SaveChangesAsync();
      }
      catch (Exception e)
      {
        Console.WriteLine(e);
        return BadRequest();
      }

    }

    return Ok();
  }
}