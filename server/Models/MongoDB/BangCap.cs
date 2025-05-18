using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using server.Repositories;

namespace server.Models.MongoDB;

public class BangCap : BangCapDto, IEntityMongo
{
  public string Id { get; set; } = null!;
}

public class BangCapDto
{
  [BsonElement("maBangCap")]
  public string MaBangCap { get; set; } = null!;

  [BsonElement("tenBangCap")]
  public string TenBangCap { get; set; } = null!;

  [BsonElement("moTa")]
  public string MoTa { get; set; } = null!;
}