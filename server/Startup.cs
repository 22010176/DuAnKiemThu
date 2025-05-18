using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;

using server.Data;
using server.Models.MongoDB;
using server.Repositories;
using server.Services;
using server.Settings;

namespace server;

public class Startup(IConfiguration configuration)
{
  public IConfiguration Configuration { get; } = configuration;

  void InitMongoDb(IServiceCollection services)
  {
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

    services.AddSingleton<IRepository<GiangVienKhoa>>(sp =>
    {
      var db = sp.GetRequiredService<IMongoDatabase>();
      return new MongoRepository<GiangVienKhoa>(db, "GiangVienKhoa");
    });
    services.AddHostedService<MongoIndexHostedService>();
  }

  void InitPostgre(IServiceCollection services)
  {
    services.AddDbContext<AppDbContext>(options =>
          options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));
    services.AddScoped(typeof(IRepository<>), typeof(PostgreRepository<>));
  }

  public void ConfigureServices(IServiceCollection services)
  {
    services.AddCors(options =>
      options.AddDefaultPolicy(builder =>
        builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin()));

    services.AddControllers();
    services.AddEndpointsApiExplorer();
    services.AddSwaggerGen();

    InitPostgre(services);
    // InitMongoDb(services);
  }

  public void Configure(WebApplication app, IWebHostEnvironment env)
  {
    if (env.IsDevelopment()) app.UseSwagger().UseSwaggerUI();

    app.UseCors();
    app.UseHttpsRedirection();
    app.UseAuthorization();
    app.MapControllers();
  }
}