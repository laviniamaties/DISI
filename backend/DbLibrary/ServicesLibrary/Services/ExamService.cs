using DbLibrary;
using DbLibrary.Data;
using DbLibrary.Model;
using DbLibrary.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ServicesLibrary.Services
{
    public class ExamService
    {
        public List<Exam> GetAll()
        {
            using (var uow = new UnitOfWork())
            {
                var repo = uow.GetRepository<Exam>();
                var context = new UniversityManagementContext();
                var list = repo.Entries();
                var result = new List<Exam>();
                foreach(var e in list)
                {
                    e.Group = context.Set<Group>().Find(e.GroupID);
                    e.User = context.Set<User>().Find(e.UserID);
                    e.StudyClass = context.Set<StudyClass>().Find(e.StudyClassID);
                }
                return list.ToList();
            }
        }

        public Exam Insert(Exam exam)
        {
            using (var uow = new UnitOfWork())
            {
                var context = new UniversityManagementContext();
                var repo = uow.GetRepository<Exam>();
                repo.Insert(exam);
                uow.SaveChanges();
                exam.Group = context.Set<Group>().Find(exam.GroupID);
                exam.User = context.Set<User>().Find(exam.UserID);
                exam.StudyClass = context.Set<StudyClass>().Find(exam.StudyClassID);
                return exam;
            }
        }
    }
}
