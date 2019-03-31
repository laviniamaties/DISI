using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace DbLibrary.Repository
{
    class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        public DbContext context;
        public DbSet<T> dbset;

        public GenericRepository(DbContext context)
        {
            this.context = context;
            dbset = context.Set<T>();
        }

        public IQueryable<T> Entries()
        {
            return dbset;
        }

        public T Find(params object[] keyValues)
        {
            return dbset.Find(keyValues);
        }

        public void Edit(T entity)
        {
            context.Entry(entity).State = EntityState.Modified;
        }

        public void Insert(T entity)
        {
            dbset.Add(entity);
        }

        public void Delete(T entity)
        {
            context.Entry(entity).State = EntityState.Deleted;
        }
    }
}
