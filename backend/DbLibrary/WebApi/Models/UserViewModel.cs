using DbLibrary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class UserViewModel
    {
        public int ID { get; set; }
        public string Email { get; set; }
        public Role Role { get; set; }
        public double Grade { get; set; }
    }
}
