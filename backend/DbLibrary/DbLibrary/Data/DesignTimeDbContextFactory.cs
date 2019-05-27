using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace DbLibrary.Data
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<UniversityManagementContext>
    {
        public UniversityManagementContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<UniversityManagementContext>();
            builder.UseSqlServer(Configuration.ConnectionString);
            return new UniversityManagementContext(builder.Options);
        }
    }
}
