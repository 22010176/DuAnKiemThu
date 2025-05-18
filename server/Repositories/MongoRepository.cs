using System.Linq.Expressions;
using MongoDB.Driver;
using server.Models;

namespace server.Repositories;

public class MongoRepository<T>(IMongoDatabase database, string collectionName) : IRepository<T> where T : IEntityMongo
{
    public readonly IMongoCollection<T> Collection = database.GetCollection<T>(collectionName);

    public async Task<ICollection<T>> GetAllAsync() =>
        await Collection.Find(_ => true).ToListAsync();

    public async Task<ICollection<T>> FindAsync(Expression<Func<T, bool>> predicate) =>
        await Collection.Find(predicate).ToListAsync();

    public async Task CreateAsync(ICollection<T> entities) =>
        await Collection.InsertManyAsync(entities);

    public async Task UpdateAsync(ICollection<T> entities) =>
        await Task.WhenAll(entities.Select(async entity => await Collection.ReplaceOneAsync(e => e.Id == entity.Id, entity)));

    public async Task DeleteAsync(ICollection<T> entities) =>
        await Collection.DeleteManyAsync(entity => entities.FirstOrDefault(i => i.Id == entity.Id) != null);

    public IMongoCollection<T> GetMongoCollection() => Collection;
}