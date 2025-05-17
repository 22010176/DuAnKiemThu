using MongoDB.Driver;
using server.Models;
using server.Repositories;

namespace server.Services;

public class MongoIndexHostedService(IServiceProvider serviceProvider) : IHostedService
{
  private readonly IServiceProvider _serviceProvider = serviceProvider;

  public async Task StartAsync(CancellationToken cancellationToken)
  {
    using var scope = _serviceProvider.CreateScope();
    var giangVienCollection = ((MongoRepository<GiangVien>)scope.ServiceProvider.GetRequiredService<IRepository<GiangVien>>()).GetMongoCollection();

    var indexModels = new List<CreateIndexModel<GiangVien>>
    {
      new(
        Builders<GiangVien>.IndexKeys.Ascending(u => u.SoDienThoai),
        new CreateIndexOptions { Unique = true }),
      new(
        Builders<GiangVien>.IndexKeys.Ascending(u => u.Mail),
        new CreateIndexOptions { Unique = true })
    };

    await giangVienCollection.Indexes.CreateManyAsync(indexModels, cancellationToken: cancellationToken);
  }

  public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
}