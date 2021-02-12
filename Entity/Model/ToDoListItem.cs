using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.Model
{
    public class ToDoListItem : BaseEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime ExecuteDate { get; set; }
        public ToDoPriority Priority { get; set; }
        public bool IsDeleted { get; set; }
    }

    public enum ToDoPriority
    {
        Low,
        Medium,
        High
    }
}
