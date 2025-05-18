using System.Collections;
using Microsoft.AspNetCore.Mvc;
using server.Repositories;

namespace server.Controllers;

public abstract class TemplateMongoController<T, Dto>(IRepository<T> repo) : ControllerBase where T : Dto, IEntityMongo
{
  protected readonly IRepository<T> _repo = repo;

  [HttpGet]
  public virtual async Task<ActionResult<ICollection>> Get() =>
    Ok(await _repo.GetAllAsync());

  [HttpGet("{id}")]
  public async Task<ActionResult<object>> Get(string id) =>
   Ok(await _repo.FindAsync(i => i.Id == id));

  [HttpPost]
  public abstract Task<IActionResult> Create(Dto dto);

  [HttpPut]
  public virtual async Task<IActionResult> Update(T instance)
  {
    await _repo.UpdateAsync([instance]);
    return NoContent();
  }

  [HttpDelete("{id}")]
  public virtual async Task<IActionResult> Delete(string id)
  {
    ICollection<T> khoa = await _repo.FindAsync(i => i.Id == id);
    if (khoa is null) return NotFound();

    await _repo.DeleteAsync(khoa);
    return NoContent();
  }
}

public abstract class TemplatePostgreController<T, Dto>(IRepository<T> context) : ControllerBase where T : Dto, IEntityPostgre
{
  protected readonly IRepository<T> _context = context;

  [HttpGet]
  public virtual async Task<ActionResult<ICollection>> Get() =>
    Ok(await _context.GetAllAsync());

  [HttpGet("{id}")]
  public async Task<ActionResult<T>> Get(int id) =>
    Ok(await _context.FindAsync(i => i.Id == id));

  [HttpPost]
  public abstract Task<IActionResult> Create(Dto item);

  [HttpPut]
  public virtual async Task<IActionResult> Update(T instances)
  {
    await _context.UpdateAsync([instances]);
    return NoContent();
  }

  [HttpDelete("{id}")]
  public virtual async Task<IActionResult> Delete(int id)
  {
    ICollection<T> khoa = await _context.FindAsync(i => i.Id == id);
    if (khoa is null) return NotFound();

    await _context.DeleteAsync(khoa);
    return NoContent();
  }
}