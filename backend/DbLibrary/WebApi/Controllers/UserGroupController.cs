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
using WebApi.Models;

namespace WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/UserGroup")]
    public class UserGroupController : Controller
    {
        private UserGroupService _userGroupService;

        public UserGroupController(UserGroupService userGroupService)
        {
            _userGroupService = userGroupService;
        }

        // GET api/studyclass
        [HttpGet("{groupId}")]
        public IEnumerable<User> GetAllByGroupId(int groupId)
        {
            using (var uow = new UnitOfWork())
            {
                var usersList = _userGroupService.GetAllStudentsByGroup(groupId);
                return usersList;
            };
        }

       // POST api/usergroup
       [HttpPost]
        public IActionResult Post([FromBody]UserGroup userGroup)
        {
            _userGroupService.AddStudentToGroup(userGroup.GroupID, userGroup.UserID);
            return Ok();
        }

    }
}