using System.ComponentModel.DataAnnotations;
using System.Net.Mail;
using Microsoft.EntityFrameworkCore;
using server.Repositories;

namespace server.Models;

public class LopHocPhan : LopHocPhanDto, IEntityPostgre
{
    static string GenerateRandomName(int length)
    {
        Random _random = new();
        const string chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ";
        return new string([..
      Enumerable
        .Repeat(chars, length)
        .Select(s => s[_random.Next(s.Length)])
        ]);
    }
    public static LopHocPhan Generate(string hocKi, string hocPhan, string namBd, Guid hocPhanId, Guid hocKiId, Guid giangVienId)
    {
        Random random = new();
        string name = GenerateRandomName(random.Next(5, 20));
        return new LopHocPhan()
        {
            maLop = $"{hocPhan}_{hocKi}_{namBd}", // HP_KI_Năm bd
            tenLop = name,
            soLuongSinhVien = random.NextInt64(20, 200),
            HocPhanId = hocPhanId,
            HocKiId = hocKiId,
            GiangVienId = giangVienId
        };
    }

    public static string IsValid(AppDbContext context, CreateLopHocPhanDto input)
    {
        if (string.IsNullOrWhiteSpace(input.maLop))
            return "Mã lớp không được để trống";
        if (string.IsNullOrWhiteSpace(input.tenLop))
            return "Tên lớp không được để trống";
        if (input.soLuongSinhVien <= 0)
            return "Số lượng sinh viên phải lớn hơn 0";

        return string.Empty;
    }
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    public HocPhan? HocPhan { get; set; }
    public HocKi? HocKi { get; set; }
    public GiangVien? GiangVien { get; set; }
}

public class LopHocPhanDto
{
    public string maLop { get; set; } = null!;
    public string tenLop { get; set; } = null!;
    public long soLuongSinhVien { get; set; } = 0!;
    public Guid HocPhanId { get; set; }
    public Guid HocKiId { get; set; }
    public Guid GiangVienId { get; set; }
    public enum TrangThaiLop
    {
        DangMo,
        DaDong,
        KetThuc
    }
    public TrangThaiLop TrangThai { get; set; }
    public static LopHocPhanDto.TrangThaiLop XacDinhTrangThai(LopHocPhan lop)
    {
        var now = DateTime.Now;
        if (lop.HocKi == null)
            return LopHocPhanDto.TrangThaiLop.DangMo;

        if (now > lop.HocKi.ThoiGianKetThuc)
            return LopHocPhanDto.TrangThaiLop.KetThuc;
        if (lop.GiangVienId != Guid.Empty)
            return LopHocPhanDto.TrangThaiLop.DaDong;
        if (now >= lop.HocKi.ThoiGianBatDau && now <= lop.HocKi.ThoiGianKetThuc)
            return LopHocPhanDto.TrangThaiLop.DangMo;

        return LopHocPhanDto.TrangThaiLop.DangMo;
    }
}


public class CreateLopHocPhanDto : LopHocPhanDto
{
    public LopHocPhanDto? LopHocPhan { get; set; }
}

public class UpdateLopHocPhanDto
{
    public LopHocPhanDto? LopHocPhan { get; set; }
    public Guid LopHocPhanId { get; set; }
}

public class PhanCongGiangVienDto
{
    public Guid LopHocPhanId { get; set; }
    public Guid GiangVienId { get; set; }
}