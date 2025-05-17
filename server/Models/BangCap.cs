using MongoDB.Bson.Serialization.Attributes;
using server.Repositories;

namespace server.Models;

public class BangCap : BangCapDto, IEntity
{
  public string Id { get; set; } = null!;
}

public class BangCapDto
{
  [BsonElement("tenBangCap")]
  public string TenBangCap { get; set; } = null!;

  [BsonElement("moTa")]
  public string MoTa { get; set; } = null!;
}