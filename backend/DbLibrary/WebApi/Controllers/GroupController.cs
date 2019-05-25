using System;
using System.Collections.Generic;
using DbLibrary;
using DbLibrary.Model;
using Microsoft.AspNetCore.Mvc;
using ServicesLibrary;

namespace WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class GroupController : Controller
    {
        private GroupService _groupService;

        public GroupController(GroupService groupService)
        {
            _groupService = groupService;
        }
        
        [HttpGet]
        public IEnumerable<Group> Get()
        {
            return _groupService.GetAll();
        }

        [HttpPost]
        public IActionResult Post([FromBody]Group group)
        {
            try
            {
                return Ok(_groupService.Add(group));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}