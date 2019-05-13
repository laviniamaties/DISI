using DbLibrary.Model;
using System;
using System.Collections.Generic;

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
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public Role Role { get; set; }
        public ICollection<UserStudyClass> UserStudyClasses { get; set; }
        public ICollection<UserGroup> UserGroups { get; set; }
    }
}
