using Entity.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.Context
{
    public class ToDoListItemContext : DbContext
    {
        public ToDoListItemContext(DbContextOptions<ToDoListItemContext> options) : base(options)
        {
        }

        public DbSet<ToDoListItem> ToDoListItems { get; set; }

    }
}
