using MongoDB.Driver;
using server.Models;
using server.Repositories;
using server.Services;
using server.Settings;

namespace server;

public class Startup(IConfiguration configuration)
{
  public IConfiguration Configuration { get; } = configuration;

  public void ConfigureServices(IServiceCollection services)
  {
    services.AddCors(options =>
    {
      options.AddDefaultPolicy(builder =>
      {
        builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
      });
    });
    services.AddControllers();
    services.AddEndpointsApiExplorer();
    services.AddSwaggerGen();

    services.AddSingleton(sp =>
    {
      var settings = Configuration.GetSection("MongoDbSettings").Get<MongoDbSettings>();
      var clients = new MongoClient(settings!.ConnectionString);
      return clients.GetDatabase(settings.DatabaseName);
    });
    services.AddSingleton<IRepository<Khoa>>(sp =>
    {
      var db = sp.GetRequiredService<IMongoDatabase>();
      return new MongoRepository<Khoa>(db, "Khoa");
    });
    services.AddSingleton<IRepository<ChucVu>>(sp =>
    {
      var db = sp.GetRequiredService<IMongoDatabase>();
      return new MongoRepository<ChucVu>(db, "ChucVu");
    });
    services.AddSingleton<IRepository<BangCap>>(sp =>
    {
      var db = sp.GetRequiredService<IMongoDatabase>();
      return new MongoRepository<BangCap>(db, "BangCap");
    });

    services.AddSingleton<IRepository<GiangVien>>(sp =>
    {
      var db = sp.GetRequiredService<IMongoDatabase>();
      var collection = new MongoRepository<GiangVien>(db, "GiangVien");
      var mailIndex = new CreateIndexModel<GiangVien>(
        Builders<GiangVien>.IndexKeys.Ascending(u => u.Mail),
        new CreateIndexOptions { Unique = true }
      );
      collection.GetMongoCollection().Indexes.CreateOne(mailIndex);

      return collection;
    });

    services.AddHostedService<MongoIndexHostedService>();
  }

  public void Configure(WebApplication app, IWebHostEnvironment env)
  {
    app.UseCors();
    if (env.IsDevelopment())
    {
      app.UseSwagger();
      app.UseSwaggerUI();
    }

    app.UseHttpsRedirection();
    app.UseAuthorization();
    app.MapControllers();
  }
}