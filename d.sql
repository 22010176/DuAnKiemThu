SELECT DATE_PART('year', h."ThoiGianBatDau") namHoc, COUNT(h."Id") soLuong
FROM "HocKi" h
GROUP BY DATE_PART('year', h."ThoiGianBatDau")
ORDER BY namHoc DESC

SELECT * FROM "HocPhan";
SELECT * FROM "LopHocPhan";

SELECT 
	hp."MaHocPhan",
	hp."TenHocPhan",
	k."MaKhoa",
	k."TenKhoa",
	COUNT(lhp."Id") soLopHocPhan, 
	AVG(lhp."SoLuongSinhVien") trungBinhSinhVien, 
	SUM(lhp."SoLuongSinhVien") tongSoSinhVien
FROM "HocPhan" hp
INNER JOIN "LopHocPhan" lhp ON lhp."HocPhanId" = hp."Id"
INNER JOIN "Khoa" k ON k."Id" = hp."KhoaId"
GROUP BY hp."Id", k."MaKhoa", k."TenKhoa";
