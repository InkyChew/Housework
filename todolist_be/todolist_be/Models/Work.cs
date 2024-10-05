using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace todolist_be.Models
{
    public class Work
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName = "nvarchar(20)")]
        public string Name { get; set; } = null!;
        [Column(TypeName = "nvarchar(200)")]
        public string? Description { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string? Tasker { get; set; }
        [Column(TypeName = "date")]
        public DateTime Date { get; set; } = DateTime.Now;
        public byte Priority { get; set; } = 0;
        public Period Period { get; set; } = Period.None;
        public State State { get; set; } = State.Incomplete;
    }
}
