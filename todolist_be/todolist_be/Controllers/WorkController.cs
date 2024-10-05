using Microsoft.AspNetCore.Mvc;
using Serilog;
using todolist_be.Models;
using todolist_be.Services;

namespace todolist_be.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkController : ControllerBase
    {
        private readonly IWorkService _service;

        public WorkController(IWorkService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllWork([FromQuery] WorkSearchParam searchParam)
        {
            return Ok(await _service.GetAllWorkAsync(searchParam));
        }

        [HttpPost]
        public async Task<IActionResult> CreateWork([FromBody] Work work)
        {
            try
            {
                await _service.CreateWorkAsync(work);
                return CreatedAtAction(nameof(GetAllWork), work);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An error occurred while creating the entity");
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateWork([FromBody] Work work)
        {
            try
            {
                await _service.UpdateWorkAsync(work);
                return Ok(work);
            }
            catch (InvalidOperationException ex)
            {
                Log.Error(ex, "An error occurred while updating the entity");
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An error occurred while updating the entity");
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWork(int id)
        {
            try
            {
                await _service.DeleteWorkAsync(id);
                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                Log.Error(ex, "An error occurred while deleting the entity");
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An error occurred while deleting the entity");
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
