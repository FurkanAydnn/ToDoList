using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entity.Model
{
    public class ToDoListItem : BaseEntity
    {
        public string Title { get; set; }
        public bool IsChecked { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime ExecuteDate { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsAlertDisplayed { get; set; }
    }
}
