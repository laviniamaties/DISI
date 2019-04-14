using DbLibrary;
using DbLibrary.Model;
using DbLibrary.Repository;
using System;

namespace ConsoleApp1
{
    class Program
    {
        static void Main(string[] args)
        {
            using (var uow = new UnitOfWork())
            {
                var userRepo = uow.GetRepository<User>();
                var classesRepo = uow.GetRepository<StudyClass>();
                var userClassesRepo = uow.GetRepository<UserStudyClass>();

                foreach(var c in classesRepo.Entries())
                {
                    classesRepo.Delete(c);
                }

                uow.SaveChanges();

                classesRepo.Insert(new StudyClass
                {
                    Title = "Sisteme Distribuite"
                });
                classesRepo.Insert(new StudyClass
                {
                    Title = "Calcul numeric"
                });
                classesRepo.Insert(new StudyClass
                {
                    Title = "Programare logica"
                });
                classesRepo.Insert(new StudyClass
                {
                    Title = "Circuite analogice numerice"
                });
                classesRepo.Insert(new StudyClass
                {
                    Title = "Programare software"
                });
                classesRepo.Insert(new StudyClass
                {
                    Title = "Algebra"
                });

                uow.SaveChanges();

                foreach (var uc in userClassesRepo.Entries())
                {
                    userClassesRepo.Delete(uc);
                }

                uow.SaveChanges();

                var users = userRepo.Entries();
                var classes = classesRepo.Entries();
                foreach(var u in users)
                {
                    foreach(var c in classes)
                    {
                        userClassesRepo.Insert(new UserStudyClass
                        {
                            StudyClassID = c.ID,
                            UserID = u.ID
                        });
                    }
                }
                uow.SaveChanges();
            };
        }
    }
}
