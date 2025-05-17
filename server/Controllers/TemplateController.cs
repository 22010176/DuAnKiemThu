using System.Collections;
using Microsoft.AspNetCore.Mvc;
using server.Repositories;

namespace server.Controllers;


public abstract class TemplateController<T, Dto>(IRepository<T> repo) : ControllerBase where T : Dto, IEntity
{
  protected readonly IRepository<T> _repo = repo;

  [HttpGet]
  public virtual async Task<ActionResult<IList>> Get() =>
    Ok(await _repo.GetAllAsync());

  [HttpGet("{id}")]
  public async Task<ActionResult<object>> Get(string id) =>
   Ok(await _repo.GetByIdAsync(id));

  [HttpPost]
  public abstract Task<ActionResult> Create(Dto dto);

  [HttpPut]
  public virtual async Task<IActionResult> Update(T instance)
  {
    await _repo.UpdateAsync(instance.Id, instance);
    return NoContent();
  }

  [HttpDelete("{id}")]
  public virtual async Task<ActionResult> Delete(string id)
  {
    T? khoa = await _repo.GetByIdAsync(id);
    if (khoa is null) return NotFound();

    await _repo.DeleteAsync(id);
    return NoContent();
  }
}