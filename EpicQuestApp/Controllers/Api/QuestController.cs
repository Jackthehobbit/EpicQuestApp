using AutoMapper;
using EpicQuestApp.Views.ViewModels;
using EpicQuestData;
using EpicQuestEntities;
using EpicQuestServices;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace EpicQuestApp.Controllers.Api
{
    [Route("api/units")]
    public class QuestController : Controller
    {
        private IQuestRepository _repository;
        private MessageService _messageService;

        public QuestController(IQuestRepository repository,MessageService messageService)
        {
            _repository = repository;
            _messageService = messageService;
        }

        /// <summary>
        /// Returns all Quests in the system
        /// </summary>
        /// <param name="includeInactive">Include Inactive Records?(T/F(default))</param>
        /// <returns></returns>
        [HttpGet]
        public IActionResult GetAll(bool includeInactive = false)
        {
            try
            {
                //Check the database for any Quests
                IList<Quest> quests = _repository.GetAllQuests(includeInactive);
                
                //No Quests currently in the database
                if(quests.Count <= 0)
                {
                    MessageObject message = _messageService.BuildMessage("Warning", "noMatches", "No Records Exist", "No Quests exist");
                }

                return Ok(Mapper.Map<IEnumerable<QuestViewModel>>(quests));
            }
            catch(Exception ex)
            {
                MessageObject message = _messageService.BuildMessage("Error", "findFailed", "Process Error", "An error occurred while trying to find quests",ex);
                return BadRequest(message);
            }
        }
    }
}
