﻿using AutoMapper;
using EpicQuestApp.ViewModels;
using EpicQuestData;
using EpicQuestEntities;
using EpicQuestServices;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EpicQuestApp.Controllers.Api
{
    [Route("api/quests")]
    public class QuestController : Controller
    {
        private IQuestRepository _repository;
        private MessageService _messageService;

        /// <summary>
        /// API for Operations relating to Quests and child records
        /// </summary>
        /// <param name="repository">Quest repository for database access - must be of type IQuestRepository</param>
        /// <param name="messageService">Message service to handle all messages globally</param>
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
                    return NotFound(message);
                }

                return Ok(Mapper.Map<IEnumerable<QuestViewModel>>(quests));
            }
            catch(Exception ex)
            {
                MessageObject message = _messageService.BuildMessage("Error", "findFailed", "Process Error", "An error occurred while trying to find quests",ex);
                return BadRequest(message);
            }
        }

        /// <summary>
        /// Adds a new Quest to the database
        /// </summary>
        /// <param name="Quest">The Quest to add</param>
        /// <returns>If successful returns a link to get the newly added quest</returns>
        [HttpPost]
        public async Task<IActionResult> Create([FromBody]QuestViewModel quest)
        {
            ValidationResult validationResults = null;
            Quest newQuest;

            //Start by validating the data to ensure we have everything we need to add a new quest
            try
            {
                if (!ModelState.IsValid)//View Model Validation Failed
                {
                    // TO DO
                    throw new ValidationException("ViewModel Validation Failed");
                }
                else // View Model validation was fine so check the actual model
                {
                    newQuest = Mapper.Map<Quest>(quest);
                    
                    QuestValidator validator = new QuestValidator();
                    validationResults = validator.Validate(newQuest);

                    if (!validationResults.IsValid) // Model validation failed
                    {
                      throw new ValidationException("Model validation failed");
                    }
                }
            }
            catch(ValidationException ex) //The quest the user is trying to add is invalid
            {
                MessageObject message = _messageService.BuildMessage("Error", "validationFailed", "Validation Failed", "Validation Failed. Please check the specified values and try again.",ex,validationResults);
                return BadRequest(message);
            }
            catch (Exception ex) // something unexepected went wrong so output a generic error message
            {
                MessageObject message = _messageService.BuildMessage("Error", "addError", "Process Error", "An unexpected error occurred while adding the quest", ex);
                return BadRequest(message);
            }

            //The validation was fine so add the quest to the database
            try
            {
                if (!newQuest.Active)
                {
                    newQuest.Active = true; // default to active when created - the user can mark them as not active later if they like
                }
                _repository.CreateQuest(newQuest);
                await _repository.SaveChangesAsync();
                ModelState.Clear();

                //Quest was added successfully
                return CreatedAtAction("Get", new { id = newQuest.Id }, Mapper.Map<QuestViewModel>(newQuest));
            }
            catch(Exception ex)// Something went wrong while adding the record
            {
                MessageObject message = _messageService.BuildMessage("Error", "addError", "Process Error", "An error occurred while trying to add the record.", ex);
                return BadRequest(message);
            }

        }

        /// <summary>
        /// Returns a unit record matching the Id passed in if it exists
        /// </summary>
        /// <param name="id">The Id of the unit record to return</param>
        /// <returns>THe unit record matching the Id</returns>
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            MessageObject message = _messageService.BuildMessage("Info", "NotImplemented", "Title", "Not Implemented Yet!");
            return NotFound(message);
        }

        /// <summary>
        /// Deletes a quest from the database
        /// </summary>
        /// <param name="id">The Id of the quest to delete</param>
        /// <returns>Nothing</returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                //First check the unit were are try to delete exists
                Quest deleteQuest = _repository.GetQuestById(id);
                if (deleteQuest == null)
                {
                    MessageObject message = _messageService.BuildMessage("Error", "missingRecord", "Record Deosn't Exist", "Cannot find a unit with id " + id + ". Delete Failed");
                    return NotFound(message);
                }

                //Delete the item from the db
                _repository.DeleteQuest(deleteQuest);
                await _repository.SaveChangesAsync();

                //If we've made it here then the delete has successfully completed
                return NoContent();
            }
            catch (Exception ex)
            {
                //Something went wrong during the delete
                MessageObject message = _messageService.BuildMessage("Error", "deleteFailed", "Delete Failed", "An Error occured whilst trying to delete the unit. Please try again", ex);
                return BadRequest(message);
            }
        }
    }
}
