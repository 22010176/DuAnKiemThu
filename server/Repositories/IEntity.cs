using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace server.Repositories;

public interface IEntityMongo
{
  [BsonId]
  [BsonRepresentation(BsonType.ObjectId)]
  string Id { get; set; }
}

public interface IEntityPostgre
{
  int Id { get; set; }
}