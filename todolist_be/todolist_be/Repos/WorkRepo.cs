using Microsoft.EntityFrameworkCore;
using todolist_be.Models;

namespace todolist_be.Repos
{
    public interface IWorkRepo
    {
        public Task<IEnumerable<Work>> GetAllWorkAsync(WorkSearchParam searchParam);
        public Task<Work?> FindWorkAsync(int id);
        public Task InsertWorkAsync(Work work);
        public Task DeleteWorkAsync(Work work);
        public Task SaveChangesAsync();
    }
    public class WorkRepo : IWorkRepo
    {
        private readonly TodoDbContext _context;

        public WorkRepo(TodoDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Work>> GetAllWorkAsync(WorkSearchParam searchParam)
        {
            IQueryable<Work> query = _context.Works;

            if (!string.IsNullOrEmpty(searchParam.Tasker))
            {
                query = query.Where(t => t.Tasker == searchParam.Tasker);
            }

            if (searchParam.State != null)
            {
                query = query.Where(t => t.State == searchParam.State);
            }

            if (searchParam.StartDate != null)
            {
                query = query.Where(t => t.Date >= searchParam.StartDate);
            }

            if (searchParam.EndDate != null)
            {
                query = query.Where(t => t.Date <= searchParam.EndDate);
            }

            return await query.OrderBy(t => t.Date).ThenBy(t => t.Priority).ToListAsync();
        }

        public async Task<Work?> FindWorkAsync(int id)
        {
            return await _context.Works.FindAsync(id);
        }

        public async Task InsertWorkAsync(Work work)
        {
            await _context.AddAsync(work);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteWorkAsync(Work work)
        {
            _context.Remove(work);
            await SaveChangesAsync();
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
