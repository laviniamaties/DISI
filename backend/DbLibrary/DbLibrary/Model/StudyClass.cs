﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DbLibrary.Model
{
    public class StudyClass
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public ICollection<UserStudyClass> UserStudyClasses { get; set; }
    }
}
