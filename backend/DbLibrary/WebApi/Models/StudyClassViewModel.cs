using System.Collections.Generic;

namespace WebApi.Models
{
    public class StudyClassViewModel
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public List<UserViewModel> Users { get; set; }
    }
}
