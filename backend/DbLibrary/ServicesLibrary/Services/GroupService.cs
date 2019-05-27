using DbLibrary;
using DbLibrary.Data;
using DbLibrary.Model;
using DbLibrary.Repository;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ServicesLibrary
{
    public class GroupService
    {

        public List<Group> GetAll()
        {
            using (var uow = new UnitOfWork())
            {
                var groupRepository = uow.GetRepository<Group>();

                return groupRepository.Entries().ToList();
            }
        }

        public Group Add(Group group)
        {
            using (var uow = new UnitOfWork())
            {
                var groupRepository = uow.GetRepository<Group>();

                var existGroup = groupRepository.Entries().FirstOrDefault(u => u.Title == group.Title);

                if (existGroup != null)
                {
                    throw new Exception("This group already exists!");
                }
                else
                {
                    groupRepository.Insert(group);
                    uow.SaveChanges();
                    return group;
                }
            }
        }
    }
}
