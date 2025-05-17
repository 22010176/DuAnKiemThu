using MongoDB.Bson.Serialization.Attributes;
using server.Repositories;

namespace server.Models;

public class Khoa : KhoaDto, IEntity
{
  public string Id { get; set; } = null!;
}

public class KhoaDto
{
  [BsonElement("tenKhoa")]
  public string TenKhoa { get; set; } = null!;

  [BsonElement("viTri")]
  public string ViTri { get; set; } = null!;

  [BsonElement("moTa")]
  public string MoTa { get; set; } = null!;
}