using MongoDB.Bson.Serialization.Attributes;
using server.Repositories;

namespace server.Models;

public class ChucVu : ChucVuDto, IEntity
{
  public string Id { get; set; } = null!;
}

public class ChucVuDto
{
  [BsonElement("tenChucVu")]
  public string TenChucVu { get; set; } = null!;
}