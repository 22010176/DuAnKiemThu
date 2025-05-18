using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using server.Repositories;

namespace server.Models.MongoDB;

public class GiangVien : GiangVienDto, IEntityMongo
{
  public string Id { get; set; } = null!;
}

public class GiangVienBangCap : GiangVien
{
  public List<BangCap>? BangCap { get; set; }
}

public class GiangVienDto
{
  [BsonElement("maGiangVien")]
  public string MaGiangVien { get; set; } = null!;

  [BsonElement("tenGiangVien")]
  public string TenGiangVien { get; set; } = null!;

  [BsonElement("gioiTinh")]
  public string GioiTinh { get; set; } = null!;

  [BsonElement("sinhNhat")]
  public DateTime SinhNhat { get; set; }

  [BsonElement("soDienThoai")]
  public string SoDienThoai { get; set; } = null!;

  [BsonElement("mail")]
  public string Mail { get; set; } = null!;

  [BsonElement("bangCap")]
  public string BangCapId { get; set; } = null!;
}