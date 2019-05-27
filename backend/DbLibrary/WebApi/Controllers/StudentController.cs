using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DbLibrary.Model;
using DbLibrary.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServicesLibrary;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Student")]
    public class StudentController : Controller
    {
        private readonly UserService _userService;

        public StudentController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{id}")]
        public IActionResult GetGrades(int id)
        {
            using (var uow = new UnitOfWork())
            {
                var grades = _userService.GetGrades(id);
                var gradesViewModel = new List<GradeViewModel>();
                var studyClassRepo = uow.GetRepository<StudyClass>();
                foreach (var g in grades)
                {
                    gradesViewModel.Add(new GradeViewModel
                    {
                        Grade = g.Grade,
                        StudyClass = studyClassRepo.Find(g.StudyClassID).Title
                    });
                }
                return Ok(gradesViewModel);
            }
        }
    }
}