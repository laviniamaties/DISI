using DbLibrary.Data;
using System;

namespace DbLibrary.Repository
{
    public class UnitOfWork : IDisposable
    {
        private UniversityManagementContext context;

        public UnitOfWork()
        {
            context = new UniversityManagementContext();
        }

        public IGenericRepository<T> GetRepository<T>() where T : class
        {
            return new GenericRepository<T>(context);
        }

        public void Dispose()
        {
            context.Dispose();
        }

        public void SaveChanges()
        {
            context.SaveChanges();
        }
    }
}
