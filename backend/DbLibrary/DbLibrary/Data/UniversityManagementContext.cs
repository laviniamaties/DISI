using Microsoft.EntityFrameworkCore;

namespace DbLibrary.Data
{
    public class UniversityManagementContext : DbContext
    {
        public UniversityManagementContext(DbContextOptions<UniversityManagementContext> options) : base(options)
        {
        }

        public UniversityManagementContext()
        {
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("User");

            modelBuilder.Entity<User>()
               .Property(u => u.Email)
               .IsRequired();
            modelBuilder.Entity<User>()
                .Property(u => u.Password)
                .IsRequired();
            modelBuilder.Entity<User>()
                .Property(u => u.Role)
                .IsRequired();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(Configuration.ConnectionString);
        }
    }
}
