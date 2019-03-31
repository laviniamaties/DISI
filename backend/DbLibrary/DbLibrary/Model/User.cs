using System;

namespace DbLibrary
{
    public enum Role
    {
        Student = 0, 
        Teacher = 1, 
        Secretary = 2
    }

    public class User
    {
        public int ID { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public Role Role { get; set; }
    }
}
