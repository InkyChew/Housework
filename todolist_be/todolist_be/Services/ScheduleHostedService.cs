using Serilog;

namespace todolist_be.Services
{
    public class ScheduleHostedService
    {
        private readonly IServiceProvider _services;
        private Timer? _dailyTimer = null;

        public ScheduleHostedService(IServiceProvider services)
        {
            _services = services;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            Log.Information("ScheduleHostedService start.");
            DateTime now = DateTime.Now;
            ScheduleDaily(now);
            return Task.CompletedTask;
        }

        public void ScheduleDaily(DateTime now)
        {
            DateTime nextRunTime = new(now.Year, now.Month, now.Day);

            if (now > nextRunTime) nextRunTime = nextRunTime.AddDays(1);

            TimeSpan timeToGo = nextRunTime - now;

            _dailyTimer = new Timer(RunDailyTask, null, timeToGo, TimeSpan.FromDays(1));
        }
        public void RunDailyTask(object? state)
        {
            var now = DateTime.Now;
            Log.Information($"Run daily task at {now}");

            IServiceScope _scope = _services.CreateScope();
            var service = _scope.ServiceProvider.GetRequiredService<IScheduleService>();
            service.DailyHandler(now);
        }
        public Task StopAsync(CancellationToken cancellationToken)
        {
            _dailyTimer?.Change(Timeout.Infinite, 0);
            Log.Information("ScheduleHostedService stop.");
            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _dailyTimer?.Dispose();
            GC.SuppressFinalize(this);
            Log.Information("ScheduleHostedService dispose.");
        }
    }
}
