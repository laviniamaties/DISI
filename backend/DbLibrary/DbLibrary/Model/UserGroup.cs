namespace DbLibrary.Model
{
    public class UserGroup
    {
        public int UserID { get; set; }
        public User User { get; set; }
        public int GroupID { get; set; }
        public Group Group { get; set; }
    }
}
