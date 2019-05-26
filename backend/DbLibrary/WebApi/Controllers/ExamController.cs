using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DbLibrary.Model;
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

        public ExamController(ExamService examService)
        {
            _examService = examService;
        }

        [HttpGet]
        public List<Exam> GetAll()
        {
            return _examService.GetAll();
        }

        [HttpPost]
        public Exam Post([FromBody] Exam exam)
        {
            return _examService.Insert(exam);
        }
    }
}