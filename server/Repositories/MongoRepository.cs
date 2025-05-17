using MongoDB.Driver;
using server.Models;

namespace server.Repositories;

public class MongoRepository<T>(IMongoDatabase database, string collectionName) : IRepository<T> where T : IEntity
{
    readonly IMongoCollection<T> Collection = database.GetCollection<T>(collectionName);

    public async Task<List<T>> GetAllAsync() =>
        await Collection.Find(_ => true).ToListAsync();

    public async Task<T?> GetByIdAsync(string id) =>
        await Collection.Find(e => e.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(List<T> entity) =>
        await Collection.InsertManyAsync(entity);

    public async Task UpdateAsync(string id, T entity) =>
        await Collection.ReplaceOneAsync(e => e.Id == id, entity);

    public async Task DeleteAsync(string id) =>
        await Collection.DeleteOneAsync(e => e.Id == id);

    public IMongoCollection<T> GetMongoCollection() => Collection;
}