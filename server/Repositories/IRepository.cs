using MongoDB.Driver;

namespace server.Repositories;

public interface IRepository<T>
{
  Task<List<T>> GetAllAsync();
  Task<T?> GetByIdAsync(string id);
  Task CreateAsync(List<T> entity);
  Task UpdateAsync(string id, T entity);
  Task DeleteAsync(string id);
}