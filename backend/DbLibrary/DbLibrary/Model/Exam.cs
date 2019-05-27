using System;
using System.Collections.Generic;
using System.Text;

namespace DbLibrary.Model
{
    public class Exam
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        public virtual User User { get; set; }
        public int StudyClassID { get; set; }
        public virtual StudyClass StudyClass { get; set; }
        public int GroupID { get; set; }
        public virtual Group Group { get; set; }
        public DateTime Date { get; set; }
    }
}
