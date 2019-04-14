using DbLibrary.Model;
using DbLibrary.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ServicesLibrary.Services
{
    public class StudyClassService
    {

        public List<StudyClass> GetAll()
        {
            using (var uow = new UnitOfWork())
            {
                var studyClassRepo = uow.GetRepository<StudyClass>();
                var list = studyClassRepo.Entries().Include(sc => sc.UserStudyClasses).ToList();
                return list;
            }
        }
    }
}
