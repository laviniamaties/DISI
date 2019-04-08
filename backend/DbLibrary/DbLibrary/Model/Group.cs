using System;
using System.Collections.Generic;
using System.Text;

namespace DbLibrary.Model
{
    public class Group
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public ICollection<UserGroup> UserGroups { get; set; }
    }
}
