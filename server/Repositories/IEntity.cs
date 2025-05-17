using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace server.Repositories;

public interface IEntity
{
  [BsonId]
  [BsonRepresentation(BsonType.ObjectId)]
  string Id { get; set; }
}
