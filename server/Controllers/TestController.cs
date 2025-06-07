using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using server.Models;
using ZstdSharp.Unsafe;

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
    _ct.HocPhan.RemoveRange(await _ct.HocPhan.ToListAsync());
    _ct.LopHocPhan.RemoveRange(await _ct.LopHocPhan.ToListAsync());
    _ct.HocKi.RemoveRange(await _ct.HocKi.ToListAsync());
    _ct.Khoa.RemoveRange(await _ct.Khoa.ToListAsync());
    _ct.HocKi.RemoveRange(await _ct.HocKi.ToListAsync());

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
        new () { MaKhoa = "K-1", TenKhoa = "Khoa Công nghệ thông tin", TenVietTat = "CNTT", ViTri=Guid.NewGuid().ToString() ,MoTa=Guid.NewGuid().ToString()},
        new () { MaKhoa = "K-2", TenKhoa = "Khoa Kỹ thuật phần mềm", TenVietTat = "KTPM", ViTri=Guid.NewGuid().ToString() ,MoTa=Guid.NewGuid().ToString()},
        new () { MaKhoa = "K-3", TenKhoa = "Khoa Hệ thống thông tin", TenVietTat = "HTTT", ViTri=Guid.NewGuid().ToString() ,MoTa=Guid.NewGuid().ToString()},
        new () { MaKhoa = "K-4", TenKhoa = "Khoa An toàn thông tin", TenVietTat = "ATTT", ViTri=Guid.NewGuid().ToString() ,MoTa=Guid.NewGuid().ToString()},
        new () { MaKhoa = "K-5", TenKhoa = "Khoa Khoa học máy tính", TenVietTat = "KHMT", ViTri=Guid.NewGuid().ToString() ,MoTa=Guid.NewGuid().ToString()},
        new () { MaKhoa = "K-6", TenKhoa = "Khoa Kỹ thuật điện - điện tử", TenVietTat = "Đ-ĐT", ViTri=Guid.NewGuid().ToString() ,MoTa=Guid.NewGuid().ToString()},
        new () { MaKhoa = "K-7", TenKhoa = "Khoa Cơ khí", TenVietTat = "CK", ViTri=Guid.NewGuid().ToString() ,MoTa=Guid.NewGuid().ToString()},
        new () { MaKhoa = "K-8", TenKhoa = "Khoa Xây dựng", TenVietTat = "XD", ViTri=Guid.NewGuid().ToString() ,MoTa=Guid.NewGuid().ToString()},
        new () { MaKhoa = "K-9", TenKhoa = "Khoa Kiến trúc", TenVietTat = "KTr", ViTri=Guid.NewGuid().ToString() ,MoTa=Guid.NewGuid().ToString()},
        new () { MaKhoa = "K-10", TenKhoa = "Khoa Toán - Tin học", TenVietTat = "TTH", ViTri=Guid.NewGuid().ToString() ,MoTa=Guid.NewGuid().ToString()},
        new () { MaKhoa = "K-11", TenKhoa = "Khoa Vật lý kỹ thuật", TenVietTat = "VLKT", ViTri=Guid.NewGuid().ToString() ,MoTa=Guid.NewGuid().ToString()},
        new () { MaKhoa = "K-12", TenKhoa = "Khoa Hóa học", TenVietTat = "HH", ViTri=Guid.NewGuid().ToString() ,MoTa=Guid.NewGuid().ToString()},
        new () { MaKhoa = "K-13", TenKhoa = "Khoa Sinh học", TenVietTat = "SH", ViTri=Guid.NewGuid().ToString() ,MoTa=Guid.NewGuid().ToString()},
        new () { MaKhoa = "K-14", TenKhoa = "Khoa Môi trường", TenVietTat = "MT", ViTri=Guid.NewGuid().ToString() ,MoTa=Guid.NewGuid().ToString()},
        new () { MaKhoa = "K-15", TenKhoa = "Khoa Kinh tế", TenVietTat = "KT", ViTri=Guid.NewGuid().ToString() ,MoTa=Guid.NewGuid().ToString()},
        new () { MaKhoa = "K-16", TenKhoa = "Khoa Tài chính - Ngân hàng", TenVietTat = "TCNH", ViTri=Guid.NewGuid().ToString() ,MoTa=Guid.NewGuid().ToString()},
        new () { MaKhoa = "K-17", TenKhoa = "Khoa Quản trị kinh doanh", TenVietTat = "QTKD", ViTri=Guid.NewGuid().ToString() ,MoTa=Guid.NewGuid().ToString()},
        new () { MaKhoa = "K-18", TenKhoa = "Khoa Marketing", TenVietTat = "MKT", ViTri=Guid.NewGuid().ToString() ,MoTa=Guid.NewGuid().ToString()},
        new () { MaKhoa = "K-19", TenKhoa = "Khoa Kế toán - Kiểm toán", TenVietTat = "KTKT", ViTri=Guid.NewGuid().ToString() ,MoTa=Guid.NewGuid().ToString()},
        new () { MaKhoa = "K-20", TenKhoa = "Khoa Luật", TenVietTat = "LUẬT", ViTri=Guid.NewGuid().ToString() ,MoTa=Guid.NewGuid().ToString()},
        new () { MaKhoa = "K-21", TenKhoa = "Khoa Ngôn ngữ Anh", TenVietTat = "NNA", ViTri=Guid.NewGuid().ToString() ,MoTa=Guid.NewGuid().ToString()},
        new () { MaKhoa = "K-22", TenKhoa = "Khoa Ngôn ngữ Trung", TenVietTat = "NNT", ViTri=Guid.NewGuid().ToString() ,MoTa=Guid.NewGuid().ToString()},
        new () { MaKhoa = "K-23", TenKhoa = "Khoa Quốc tế học", TenVietTat = "QTH", ViTri=Guid.NewGuid().ToString() ,MoTa=Guid.NewGuid().ToString()},
        new () { MaKhoa = "K-24", TenKhoa = "Khoa Sư phạm", TenVietTat = "SP", ViTri=Guid.NewGuid().ToString() ,MoTa=Guid.NewGuid().ToString()},
        new () { MaKhoa = "K-25", TenKhoa = "Khoa Báo chí - Truyền thông", TenVietTat = "BC-TT", ViTri=Guid.NewGuid().ToString() ,MoTa=Guid.NewGuid().ToString()},
        new () { MaKhoa = "K-26", TenKhoa = "Khoa Xã hội học", TenVietTat = "XHH", ViTri=Guid.NewGuid().ToString() ,MoTa=Guid.NewGuid().ToString()},
        new () { MaKhoa = "K-27", TenKhoa = "Khoa Tâm lý học", TenVietTat = "TLH", ViTri=Guid.NewGuid().ToString() ,MoTa=Guid.NewGuid().ToString()},
        new () { MaKhoa = "K-28", TenKhoa = "Khoa Du lịch", TenVietTat = "DL", ViTri=Guid.NewGuid().ToString() ,MoTa=Guid.NewGuid().ToString()},
        new () { MaKhoa = "K-29", TenKhoa = "Khoa Giáo dục thể chất", TenVietTat = "TDTT", ViTri=Guid.NewGuid().ToString() ,MoTa=Guid.NewGuid().ToString()},
        new () { MaKhoa = "K-30", TenKhoa = "Khoa Y", TenVietTat = "Y", ViTri=Guid.NewGuid().ToString() ,MoTa=Guid.NewGuid().ToString()},
        new () { MaKhoa = "K-31", TenKhoa = "Khoa Dược", TenVietTat = "DƯỢC", ViTri=Guid.NewGuid().ToString() ,MoTa=Guid.NewGuid().ToString()},
        new () { MaKhoa = "K-32", TenKhoa = "Khoa Điều dưỡng", TenVietTat = "DD", ViTri=Guid.NewGuid().ToString() ,MoTa=Guid.NewGuid().ToString()},
        new () { MaKhoa = "K-33", TenKhoa = "Khoa Công nghệ thực phẩm", TenVietTat = "CNTP", ViTri=Guid.NewGuid().ToString(),MoTa=Guid.NewGuid().ToString() }
    ];
    var formatedKhoa = _khoa.Select((item, i) =>
      Khoa.FormatInput(_ct, new()
      {
        TenKhoa = item.TenKhoa,
        TenVietTat = item.TenVietTat,
        ViTri = item.ViTri,
        MoTa = item.MoTa
      }));
    Console.WriteLine(string.Join('\n', formatedKhoa.Select(i => i.MaKhoa)));

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
    var formatedBangCap = _bangCap.Select((item, i) =>
      BangCap.FormatInput(i + 1, new() { TenBangCap = item.TenBangCap, TenVietTat = item.TenVietTat }));

    List<ChucVu> _chucVu = [
      new () { MaChucVu = "DEG-1", TenChucVu = "Hiệu trưởng", TenVietTat = "HT" },
      new () { MaChucVu = "DEG-2", TenChucVu = "Phó Hiệu trưởng", TenVietTat = "PHT" },
      new () { MaChucVu = "DEG-3", TenChucVu = "Trưởng khoa", TenVietTat = "TK" },
      new () { MaChucVu = "DEG-4", TenChucVu = "Phó Trưởng khoa", TenVietTat = "PTK" },
      new () { MaChucVu = "DEG-5", TenChucVu = "Trưởng bộ môn", TenVietTat = "TBM" },
      new () { MaChucVu = "DEG-6", TenChucVu = "Phó Trưởng bộ môn", TenVietTat = "PTBM" },
      new () { MaChucVu = "DEG-7", TenChucVu = "Chủ nhiệm chương trình", TenVietTat = "CNCTr" },
      new () { MaChucVu = "DEG-8", TenChucVu = "Thư ký khoa", TenVietTat = "TKhK" },
      new () { MaChucVu = "DEG-9", TenChucVu = "Giảng viên chính", TenVietTat = "GVC" },
      new () { MaChucVu = "DEG-10", TenChucVu = "Giảng viên", TenVietTat = "GV" },
      new () { MaChucVu = "DEG-11", TenChucVu = "Trợ giảng", TenVietTat = "TG" },
      new () { MaChucVu = "DEG-12", TenChucVu = "Nghiên cứu viên", TenVietTat = "NCV" },
      new () { MaChucVu = "DEG-13", TenChucVu = "Thư ký khoa học", TenVietTat = "TKKH" },
      new () { MaChucVu = "DEG-14", TenChucVu = "Trưởng phòng đào tạo", TenVietTat = "TPĐT" },
      new () { MaChucVu = "DEG-15", TenChucVu = "Cán bộ quản lý đào tạo", TenVietTat = "CBQLĐT" }
    ];

    try
    {
      await _ct.Khoa.AddRangeAsync(formatedKhoa);
      await _ct.BangCap.AddRangeAsync(formatedBangCap);
      await _ct.ChucVu.AddRangeAsync(_chucVu);
      await _ct.SaveChangesAsync();
    }
    catch (Exception) { throw; }
    return Ok();
  }

  [HttpGet("add-giang-vien")]
  public async Task<ActionResult> AddGV()
  {
    List<BangCap> _bangCap = await _ct.BangCap.ToListAsync();
    List<ChucVu> _ChucVu = await _ct.ChucVu.ToListAsync();
    List<Khoa> _Khoa = await _ct.Khoa.ToListAsync();
    var random = new Random();
    int gv_ = await _ct.GiangVien.CountAsync();
    for (int i = 0; i < 1000; ++i)
    {
      try
      {
        Khoa k = _Khoa[random.Next(_Khoa.Count)];
        GiangVien giangVien = GiangVien.Generate(_bangCap[random.Next(_bangCap.Count)].Id, i + 1 + gv_, k.TenVietTat);
        Khoa_GiangVien kgv = new()
        {
          ChucVuId = _ChucVu[random.Next(_ChucVu.Count)].Id,
          GiangVienId = giangVien.Id,
          KhoaId = k.Id
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

  [HttpPost("add-hoc-phan")]
  public async Task<ActionResult> AddHocPhan()
  {
    List<Khoa> _Khoa = await _ct.Khoa.ToListAsync();
    if (_Khoa.Count == 0) return BadRequest("Chưa có Khoa nào, hãy thêm Khoa trước");

    var random = new Random();
    int hp_ = await _ct.HocPhan.CountAsync();
    for (int i = 0; i < 1000; ++i)
    {
      try
      {
        Khoa k = _Khoa[random.Next(_Khoa.Count)];
        HocPhan hocPhan = HocPhan.Generate(k);
        await _ct.HocPhan.AddAsync(hocPhan);
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

  [HttpPost("add-hoc-ki")]
  public async Task<ActionResult> AddHocKi()
  {
    List<HocKi> hocKis = [];
    for (int i = 0; i < 1000; ++i) hocKis.Add(HocKi.Generate());

    await _ct.HocKi.AddRangeAsync(hocKis);
    await _ct.SaveChangesAsync();
    return Ok();
  }

  [HttpPost("add-lop-hoc-phan")]
  public async Task<ActionResult> AddLopHocPhan()
  {
    List<HocPhan> hocPhans = await _ct.HocPhan.ToListAsync();
    List<HocKi> hocKis = await _ct.HocKi.ToListAsync();
    List<GiangVien> giangViens = await _ct.GiangVien.ToListAsync();

    if (hocPhans.Count == 0 || hocKis.Count == 0 || giangViens.Count == 0)
      return BadRequest("Chưa có Học phần, Học kỳ hoặc Giảng viên nào, hãy thêm chúng trước");

    var random = new Random();
    int lhp_ = await _ct.LopHocPhan.CountAsync();
    List<LopHocPhan> lopHocPhans = [];
    for (int i = 0; i < 1000; ++i)
    {
      try
      {
        HocPhan hp = hocPhans[random.Next(hocPhans.Count)];
        HocKi hk = hocKis[random.Next(hocKis.Count)];
        GiangVien? gv = random.NextDouble() > 0.5 ? giangViens[random.Next(giangViens.Count)] : null;

        LopHocPhan lopHocPhan = LopHocPhan.Generate(gv, hp, hk, lhp_ + i + 1);
        lopHocPhans.Add(lopHocPhan);
      }
      catch (Exception e)
      {
        Console.WriteLine(e);
        return BadRequest();
      }
    }
    await _ct.LopHocPhan.AddRangeAsync(lopHocPhans);
    await _ct.SaveChangesAsync();

    return Ok();
  }
}