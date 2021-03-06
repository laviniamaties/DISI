﻿using DbLibrary;
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

        public UserStudyClass Update(int studyClassId, int userId, double grade)
        {
            using (var uow = new UnitOfWork())
            {
                var userStudyClassRepo = uow.GetRepository<UserStudyClass>();
                var userRepo = uow.GetRepository<User>();
                var studyClassRepo = uow.GetRepository<StudyClass>();

                var entity = userStudyClassRepo.Entries().Where(uc => uc.UserID == userId && uc.StudyClassID == studyClassId).FirstOrDefault();

                if (entity == null)
                {
                    throw new Exception("Invalid id");
                }
                else
                {
                    var user = userRepo.Find(userId);
                    var studyclass = studyClassRepo.Find(studyClassId);
                    var body = "Your grade for " + studyclass.Title + " is " + grade;
                    var emailService = new EmailService();
                    emailService.SendEmail("Grade added / updated!", body, new List<User> { user });

                    entity.Grade = grade;
                    userStudyClassRepo.Edit(entity);
                    uow.SaveChanges();
                    return entity;
                }
            }
        }
    }
}
