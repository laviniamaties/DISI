using System;
using DbLibrary;
using Microsoft.AspNetCore.Mvc;
using ServicesLibrary;

namespace WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Login")]
    public class LoginController : Controller
    {
        private UserService _userService;

        public LoginController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public IActionResult Post([FromBody]User user)
        {
            try
            {
                return Ok(_userService.Login(user));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}