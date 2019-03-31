namespace DbLibrary.Data
{
    public static class DbInitializer
    {
        public static void Initialize(UniversityManagementContext context)
        {
            context.Database.EnsureCreated();
        }
    }
}
