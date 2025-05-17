using MongoDB.Driver;
using server.Models;
using server.Models.MongoDB;
using server.Repositories;

namespace server.Services;

public class MongoIndexHostedService(IServiceProvider serviceProvider) : IHostedService, IDisposable
{
  private readonly IServiceProvider _serviceProvider = serviceProvider;
  private readonly IServiceScope _scope = serviceProvider.CreateScope();

  async Task InitBangCapIndexes()
  {
    var bangCapCollection = ((MongoRepository<BangCap>)_scope.ServiceProvider.GetRequiredService<IRepository<BangCap>>()).GetMongoCollection();
    await bangCapCollection.Indexes.CreateManyAsync([
      new(
        Builders<BangCap>.IndexKeys.Ascending(bangCap=>bangCap.MaBangCap),
        new CreateIndexOptions{Unique = true})
    ]);
  }

  async Task InitChucvuIndexes()
  {
    var chucVuCollection = ((MongoRepository<ChucVu>)_scope.ServiceProvider.GetRequiredService<IRepository<ChucVu>>()).GetMongoCollection();
    await chucVuCollection.Indexes.CreateManyAsync([
      new(
        Builders<ChucVu>.IndexKeys.Ascending(c => c.MaChucVu),
        new CreateIndexOptions{Unique=true})
    ]);
  }

  async Task InitGiangVienIndexes()
  {
    var giangVienCollection = ((MongoRepository<GiangVien>)_scope.ServiceProvider.GetRequiredService<IRepository<GiangVien>>()).GetMongoCollection();
    var indexKeys = Builders<GiangVien>.IndexKeys;
    await giangVienCollection.Indexes.CreateManyAsync([
      new(
        indexKeys.Ascending(u => u.SoDienThoai),
        new CreateIndexOptions { Unique = true }),
      new(
        indexKeys.Ascending(u => u.Mail),
        new CreateIndexOptions { Unique = true }),
      new(
        indexKeys.Ascending(u => u.MaGiangVien),
        new CreateIndexOptions { Unique = true }),
    ]);
  }

  async Task InitGiangVienKhoaIndexes()
  {
    var giangVienKhoaCollection = ((MongoRepository<GiangVienKhoa>)_scope.ServiceProvider.GetRequiredService<IRepository<GiangVienKhoa>>()).GetMongoCollection();
    await giangVienKhoaCollection.Indexes.CreateManyAsync([
      new(
        Builders<GiangVienKhoa>.IndexKeys
          .Ascending(u=>u.MaKhoa)
          .Ascending(u=>u.MaGiangVien)
          .Ascending(u=>u.MaChucVu),
        new CreateIndexOptions{Unique = true})
    ]);
  }

  async Task InitKhoaIndexes()
  {
    var collection = ((MongoRepository<Khoa>)_scope.ServiceProvider.GetRequiredService<IRepository<Khoa>>()).GetMongoCollection();
    await collection.Indexes.CreateManyAsync([
      new (
        Builders<Khoa>.IndexKeys.Ascending(u => u.MaKhoa),
        new CreateIndexOptions{ Unique = true })
    ]);
  }

  public async Task StartAsync(CancellationToken cancellationToken)
  {
    List<Task> tasks = [];

    tasks.Add(InitGiangVienKhoaIndexes());
    tasks.Add(InitBangCapIndexes());
    tasks.Add(InitChucvuIndexes());
    tasks.Add(InitGiangVienIndexes());
    tasks.Add(InitKhoaIndexes());

    await Task.WhenAll(tasks);
  }

  public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;



  public void Dispose()
  {
    _scope.Dispose();
  }
};