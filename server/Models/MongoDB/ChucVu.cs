using MongoDB.Bson.Serialization.Attributes;
using server.Repositories;

namespace server.Models.MongoDB;

public class ChucVu : ChucVuDto, IEntity
{
  public string Id { get; set; } = null!;
}

public class ChucVuDto
{
  [BsonElement("maChucVu")]
  public string MaChucVu { get; set; } = null!;

  [BsonElement("tenChucVu")]
  public string TenChucVu { get; set; } = null!;
}