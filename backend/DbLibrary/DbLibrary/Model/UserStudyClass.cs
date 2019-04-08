namespace DbLibrary.Model
{
    public class UserStudyClass
    {
        public int UserID { get; set; }
        public User User { get; set; }
        public int StudyClassID { get; set; }
        public StudyClass StudyClass { get; set; }
    }
}
