namespace DbLibrary.Model
{
    public class UserStudyClass
    {
        public int UserID { get; set; }
        public virtual User User { get; set; }
        public int StudyClassID { get; set; }
        public virtual StudyClass StudyClass { get; set; }
    }
}
