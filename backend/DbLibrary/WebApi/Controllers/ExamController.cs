using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DbLibrary;
using DbLibrary.Model;
using DbLibrary.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServicesLibrary.Services;

namespace WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Exam")]
    public class ExamController : Controller
    {
        private readonly ExamService _examService;
        private readonly EmailService _emailService;

        public ExamController(ExamService examService, EmailService emailService)
        {
            _examService = examService;
            _emailService = emailService;
        }

        [HttpGet]
        public List<Exam> GetAll()
        {
            return _examService.GetAll();
        }

        [HttpPost]
        public Exam Post([FromBody] Exam exam)
        {
            using (var uow = new UnitOfWork())
            {
                var group = uow.GetRepository<Group>().Find(exam.GroupID);
                var teacher = uow.GetRepository<User>().Find(exam.UserID);
                var studyclass = uow.GetRepository<StudyClass>().Find(exam.StudyClassID);
                _emailService.SendEmail("New exam added", "New exam added for " + studyclass.Title + " group: " +
                    group.Title, new List<User>
                    {
                        teacher
                    });
                return _examService.Insert(exam);
            }

        }
    }
}