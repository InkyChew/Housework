using Microsoft.EntityFrameworkCore;

namespace todolist_be.Models
{
    public class TodoDbContext : DbContext
    {
        public TodoDbContext(DbContextOptions<TodoDbContext> options) : base(options) { }

        public DbSet<Work> Works { get; set; } = null!;

    }
}
