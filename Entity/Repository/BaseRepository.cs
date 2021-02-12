using Entity.Context;
using Entity.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Entity.Repository
{
    public class BaseRepository<T> where T : BaseEntity
    {
        private readonly ToDoListItemContext _context;
        public BaseRepository(ToDoListItemContext context)
        {
            _context = context;
        }
        public IEnumerable<T> GetList()
        {
            return _context.Set<T>().ToList();
        }

        public T GetById(int id)
        {
            return _context.Set<T>().FirstOrDefault(i => i.Id == id);
        }

        public bool Create(T entity)
        {
            _context.Set<T>().Add(entity);
            return _context.SaveChanges() > 0;
        }

        public bool Update(T entity)
        {
            _context.Set<T>().Update(entity);
            return _context.SaveChanges() > 0;
        }

        public bool Delete(T entity)
        {
            _context.Set<T>().Remove(entity);
            return _context.SaveChanges() > 0;
        }
    }
}
