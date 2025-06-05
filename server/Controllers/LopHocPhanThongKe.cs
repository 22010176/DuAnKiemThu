using System.Collections;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class LopHocPhanThongKeController(AppDbContext context, IConfiguration configuration) : ControllerBase
{
  readonly AppDbContext context = context;
  readonly string conntectionString = configuration.GetConnectionString("DefaultConnection")!;

  [HttpGet("nam-hoc-ki")]
  public async Task<ActionResult> Get()
  {
    using var conn = new NpgsqlConnection(conntectionString);
    await conn.OpenAsync();

    string query = """
SELECT DATE_PART('year', h."ThoiGianBatDau") namHoc, COUNT(h."Id") soLuong
FROM "HocKi" h
GROUP BY DATE_PART('year', h."ThoiGianBatDau")
ORDER BY namHoc DESC
""";

    List<object> nam = [];
    using var cmd = new NpgsqlCommand(query, conn);
    using var reader = cmd.ExecuteReader();
    while (reader.Read())
    {
      nam.Add(new
      {
        Nam = reader.GetDouble(0),
        SoLuong = reader.GetDouble(1)
      });
    }
    await conn.CloseAsync();

    return Ok(nam);
  }
}