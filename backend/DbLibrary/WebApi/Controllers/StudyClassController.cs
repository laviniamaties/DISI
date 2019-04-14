﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DbLibrary;
using DbLibrary.Model;
using DbLibrary.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServicesLibrary.Services;
using WebApi.Models;

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
        public IEnumerable<StudyClassViewModel> Get()
        {
            using (var uow = new UnitOfWork())
            {
                var userRepo = uow.GetRepository<User>();
                var list = _studyClassService.GetAll();
                var listViewModels = new List<StudyClassViewModel>();

                foreach (var sc in list)
                {
                    var userList = new List<User>();
                    foreach(var usc in sc.UserStudyClasses)
                    {
                        userList.Add(userRepo.Find(usc.UserID));
                    }

                    listViewModels.Add(new StudyClassViewModel
                    {
                        ID = sc.ID,
                        Title = sc.Title,
                        Users = userList
                    });
                }
                return listViewModels;
            };
        }
    }
}