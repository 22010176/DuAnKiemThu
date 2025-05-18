namespace server.Models.PostgreSQL;

public class Product
{
  public int Id { get; set; }
  public string Name { get; set; } = null!;
  public decimal Price { get; set; }
}