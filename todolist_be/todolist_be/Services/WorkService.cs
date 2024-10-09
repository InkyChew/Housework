using Microsoft.EntityFrameworkCore;
using todolist_be.Models;
using todolist_be.Repos;

namespace todolist_be.Services
{
    public interface IWorkService
    {
        public Task<IEnumerable<Work>> GetAllWorkAsync(WorkSearchParam searchParam);
        public Task CreateWorkAsync(Work work);
        public Work CreateNextWork(Work work);
        public Task<Work> UpdateWorkAsync(Work work);
        public Task UpdateWorkPriorityAsync(List<Work> works);
        public Task DeleteWorkAsync(int id);

    }
    public class WorkService : IWorkService
    {
        private readonly IWorkRepo _repo;
        public WorkService(IWorkRepo repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<Work>> GetAllWorkAsync(WorkSearchParam searchParam)
        {
            return await _repo.GetAllWorkAsync(searchParam);
        }

        public async Task CreateWorkAsync(Work work)
        {
            await _repo.InsertWorkAsync(work);
        }

        public Work CreateNextWork(Work work)
        {
            return new Work()
            {
                Name = work.Name,
                Description = work.Description,
                Tasker = work.Tasker,
                Date = GetNextDate(work.Date, work.Period),
                Priority = work.Priority,
                Period = work.Period,
                State = State.Incomplete
            };
        }

        public DateTime GetNextDate(DateTime date, Period period)
        {
            return period switch
            {
                Period.Day => date.AddDays(1),
                Period.Month => date.AddMonths(1),
                Period.Year => date.AddMonths(1),
                _ => date
            };
        }

        public async Task<Work> UpdateWorkAsync(Work work)
        {
            var dbWork = await _repo.FindWorkAsync(work.Id) ?? throw new InvalidOperationException($"No entity found with id {work.Id}.");
            dbWork.Name = work.Name;
            dbWork.Description = work.Description;
            dbWork.Tasker = work.Tasker;
            dbWork.Date = work.Date;
            dbWork.Priority = work.Priority;
            dbWork.Period = work.Period;
            dbWork.State = work.State;
            await _repo.SaveChangesAsync();
            return dbWork;
        }

        public async Task UpdateWorkPriorityAsync(List<Work> works)
        {
            foreach (var work in works)
            {
                var dbWork = await _repo.FindWorkAsync(work.Id) ?? throw new InvalidOperationException($"No entity found with id {work.Id}.");
                dbWork.Priority = work.Priority;
            }
            await _repo.SaveChangesAsync();
        }

        public async Task DeleteWorkAsync(int id)
        {
            var work = await _repo.FindWorkAsync(id) ?? throw new InvalidOperationException($"No entity found with id {id}.");
            await _repo.DeleteWorkAsync(work);
        }        
    }
}
