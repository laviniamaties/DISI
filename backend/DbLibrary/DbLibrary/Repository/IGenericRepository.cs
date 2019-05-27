using System.Linq;

namespace DbLibrary.Repository
{
    public interface IGenericRepository<T> where T : class
    {
        IQueryable<T> Entries();
        T Find(params object[] keyValues);
        void Edit(T entity);
        void Insert(T entity);
        void Delete(T entity);
    }
}
