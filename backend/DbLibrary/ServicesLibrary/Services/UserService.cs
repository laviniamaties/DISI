﻿using DbLibrary;
using DbLibrary.Data;
using DbLibrary.Model;
using DbLibrary.Repository;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ServicesLibrary
{
    public class UserService
    {
        public User Find(int id)
        {
            using (var uow = new UnitOfWork())
            {
                var userRepository = uow.GetRepository<User>();

                return userRepository.Find(id);
            }
        }

        public List<User> GetAll()
        {
            using (var uow = new UnitOfWork())
            {
                var userRepository = uow.GetRepository<User>();

                return userRepository.Entries().ToList();
            }
        }

        public User Add(User user)
        {
            using (var uow = new UnitOfWork())
            {
                var userRepository = uow.GetRepository<User>();

                var existUser = userRepository.Entries().FirstOrDefault(u => u.Email == user.Email);

                if (existUser != null)
                {
                    throw new Exception("This email is already used!");
                }
                else
                {
                    userRepository.Insert(user);
                    uow.SaveChanges();
                    return user;
                }
            }
        }

        public User Update(int id, User user)
        {
            using (var uow = new UnitOfWork())
            {
                var userRepository = uow.GetRepository<User>();

                var entity = userRepository.Find(id);

                if (entity == null)
                {
                    throw new Exception("Invalid user id");
                }
                else
                {
                    var existUser = userRepository.Entries().FirstOrDefault(u => u.Email == user.Email && u.ID != id);

                    if (existUser != null)
                    {
                        throw new Exception("This email is already used!");
                    }
                    else
                    {
                        entity.Email = user.Email;
                        entity.FirstName = user.FirstName;
                        entity.LastName = user.LastName;
                        entity.Phone = user.Phone;
                        entity.Address = user.Address;

                        if (user.Password != null)
                        {
                            entity.Password = user.Password;
                        }

                        userRepository.Edit(entity);
                        uow.SaveChanges();
                        return user;
                    }
                }
            }
        }

        public User Delete(int id)
        {
            using (var uow = new UnitOfWork())
            {
                var userRepository = uow.GetRepository<User>();

                var entity = userRepository.Find(id);

                if (entity == null)
                {
                    throw new Exception("Invalid user id");
                }
                else
                {
                    userRepository.Delete(entity);
                    uow.SaveChanges();
                    return entity;
                }
            }
        }

        public User Login(User user)
        {
            using (var uow = new UnitOfWork())
            {
                var userRepository = uow.GetRepository<User>();

                var existUser = userRepository.Entries().FirstOrDefault(u => u.Email == user.Email);

                if (existUser != null)
                {
                    if (existUser.Password != user.Password)
                    {
                        throw new Exception("Wrong passowrd");
                    }
                    else
                    {
                        return existUser;
                    }
                }
                else
                {
                    throw new Exception("Wrong email!");
                }
            }
        }

        public List<UserStudyClass> GetGrades(int id)
        {
            using (var context = new UniversityManagementContext())
            {
                var user = context.Users.Find(id);
                context.Entry(user).Collection(u => u.UserStudyClasses).Load();
                var grades = user.UserStudyClasses.ToList();
                return grades;
            }
        }
    }
}
