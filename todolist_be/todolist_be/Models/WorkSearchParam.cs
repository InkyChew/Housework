namespace todolist_be.Models
{
    public class WorkSearchParam
    {
        public string? Tasker { get; set; } = null;
        public DateTime? StartDate { get; set; } = null;
        public DateTime? EndDate { get; set; } = null;
        public State? State { get; set; } = null;
    }
}
