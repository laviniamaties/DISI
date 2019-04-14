using DbLibrary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class StudyClassViewModel
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public List<User> Users { get; set; }
    }
}
