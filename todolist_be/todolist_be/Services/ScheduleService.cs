using Serilog;
using todolist_be.Models;

namespace todolist_be.Services
{
    public interface IScheduleService
    {
        public Task DailyHandler(DateTime now);
    }
    public class ScheduleService : IScheduleService
    {
        private readonly IWorkService _workService;

        public ScheduleService(IWorkService workService)
        {
            _workService = workService;
        }

        public async Task DailyHandler(DateTime now)
        {
            await CreateWorkWhenDateReachAsync(now);
        }
        public async Task CreateWorkWhenDateReachAsync(DateTime now)
        {
            try
            {
                WorkSearchParam taskParam = new() { StartDate = now, EndDate = now };
                var reachWorks = (await _workService.GetAllWorkAsync(taskParam)).Where(_ => _.Period != Period.None);

                if (reachWorks == null || !reachWorks.Any())
                {
                    Log.Information("No reach works to create.");
                    return;
                }

                foreach (var work in reachWorks)
                {
                    try
                    {
                        var nextWork = _workService.CreateNextWork(work);
                        await _workService.CreateWorkAsync(nextWork);
                    }
                    catch (Exception ex)
                    {
                        Log.Error(ex, $"An error occurred while create next work with Id: {work.Id}");
                    }
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An error occurred in CreateWorkWhenDateReachAsync");
            }
        }
    }
}
