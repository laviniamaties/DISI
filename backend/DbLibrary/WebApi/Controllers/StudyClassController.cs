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
    [Route("api/StudyClass")]
    public class StudyClassController : Controller
    {
        private StudyClassService _studyClassService;

        public StudyClassController(StudyClassService studyClassService)
        {
            _studyClassService = studyClassService;
        }

        // GET api/studyclass
        [HttpGet]
        public IEnumerable<StudyClass> Get()
        {
            var list = _studyClassService.GetAll();

            return _studyClassService.GetAll();
        }
    }
}