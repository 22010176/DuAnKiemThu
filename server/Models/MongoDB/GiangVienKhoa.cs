using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using server.Repositories;

namespace server.Models.MongoDB;

public class GiangVienKhoa : GiangVienKhoaDto, IEntityMongo
{
  public string Id { get; set; } = null!;
}

public class GiangVienKhoaDto
{
  [BsonElement("maKhoa")]
  public string MaKhoa { get; set; } = null!;

  [BsonElement("maGiangVien")]
  public string MaGiangVien { get; set; } = null!;

  [BsonElement("maChucVu")]
  public string MaChucVu { get; set; } = null!;
}