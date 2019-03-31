using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DbLibrary;
using Microsoft.AspNetCore.Mvc;
using ServicesLibrary;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private UserService _userService;

        public UsersController(UserService userService)
        {
            _userService = userService;
        }

        // GET api/users
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return _userService.GetAll();
        }

        // GET api/user/5
        [HttpGet("{id}")]
        public User Get(int id)
        {
            return _userService.Find(id);
        }

        // POST api/users
        [HttpPost]
        public IActionResult Post([FromBody]User user)
        {
            try
            {
                return Ok(_userService.Add(user));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // PUT api/users/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]User user)
        {
            try
            {
                return Ok(_userService.Update(id, user));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // DELETE api/users/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                return Ok(_userService.Delete(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
