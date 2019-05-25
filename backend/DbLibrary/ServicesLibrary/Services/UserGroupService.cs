using DbLibrary;
using DbLibrary.Model;
using DbLibrary.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ServicesLibrary.Services
{
    public class UserGroupService
    {

        public List<User> GetAllStudentsByGroup(int groupId)
        {
            using (var uow = new UnitOfWork())
            {
                var userGroupRepo = uow.GetRepository<UserGroup>();
                var list = userGroupRepo.Entries().Include(sc => sc.User)
                    .Where(uc => uc.GroupID == groupId)
                    .Select(u => u.User)
                    .ToList();
                return list;
            }
        }

        public UserGroup AddStudentToGroup(int groupId, int userId)
        {
            using (var uow = new UnitOfWork())
            {
                var userGroupRepo = uow.GetRepository<UserGroup>();
                var ug = new UserGroup
                {
                    UserID = userId,
                    GroupID = groupId
                };
                userGroupRepo.Insert(ug);
                uow.SaveChanges();
                return ug;
            }
        }
    }
}
