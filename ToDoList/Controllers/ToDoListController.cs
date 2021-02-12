﻿using Entity.Model;
using Entity.Repository;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace ToDoList.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class ToDoListController : ControllerBase
    {
        private readonly BaseRepository<ToDoListItem> _todoListItemRepo;

        public ToDoListController(BaseRepository<ToDoListItem> todoListItemRepo)
        {
            _todoListItemRepo = todoListItemRepo;
        }

        [HttpGet]
        public IEnumerable<ToDoListItem> GetList()
        {
            return _todoListItemRepo.GetList();
        }

        [HttpGet]
        public ToDoListItem GetById(int id)
        {
            return _todoListItemRepo.GetById(id);
        }

        [HttpPost]
        public bool Create(ToDoListItem toDoListItem)
        {
            if (toDoListItem == null)
                throw new ApplicationException("Item cannot be null");

            return _todoListItemRepo.Create(toDoListItem);
        }

        [HttpPut]
        public bool Update(ToDoListItem toDoListItem)
        {
            if (toDoListItem == null)
                throw new ApplicationException("Item cannot be null");

            return _todoListItemRepo.Update(toDoListItem);
        }


        [HttpDelete]
        public bool Delete(int id)
        {
            var item = _todoListItemRepo.GetById(id);
            if (item == null)
                throw new ApplicationException("Item cannot be null");

            return _todoListItemRepo.Delete(item);
        }
    }
}
