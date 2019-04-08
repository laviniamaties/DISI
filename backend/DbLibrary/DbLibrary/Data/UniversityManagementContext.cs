using DbLibrary.Model;
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
            modelBuilder.Entity<StudyClass>().ToTable("StudyClass");
            modelBuilder.Entity<UserStudyClass>().ToTable("UserStudyClass");

            modelBuilder.Entity<User>()
               .Property(u => u.Email)
               .IsRequired();
            modelBuilder.Entity<User>()
                .Property(u => u.Password)
                .IsRequired();
            modelBuilder.Entity<User>()
                .Property(u => u.Role)
                .IsRequired();

            modelBuilder.Entity<UserStudyClass>()
                .HasKey(uc => new { uc.UserID, uc.StudyClassID });
            modelBuilder.Entity<UserStudyClass>()
                .HasOne(uc => uc.StudyClass)
                .WithMany(sc => sc.UserStudyClasses);
            modelBuilder.Entity<UserStudyClass>()
                .HasOne(uc => uc.User)
                .WithMany(sc => sc.UserStudyClasses);

            modelBuilder.Entity<UserGroup>()
                .HasKey(ug => new { ug.UserID, ug.GroupID });
            modelBuilder.Entity<UserGroup>()
                .HasOne(uc => uc.Group)
                .WithMany(sc => sc.UserGroups);
            modelBuilder.Entity<UserGroup>()
                .HasOne(uc => uc.User)
                .WithMany(sc => sc.UserGroups);

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(Configuration.ConnectionString);
        }
    }
}
