using FluentValidation.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EpicQuestServices
{
    /// <summary>
    /// This Service returns Message Objects from the passed in values
    /// </summary>
    public class MessageService
    {
        //Builds a basic message
        public MessageObject BuildMessage(string Type,string Id,string Title,string Message)
        {
            return new MessageObject()
            {
                Type = Type,
                Id = Id,
                Title = Title,
                Message = Message
            };
        }

        // Builds a basic message including extra information from fluent validation
        public MessageObject BuildMessage(string Type, string Id, string Title, string Message, ValidationResult fluentvalidationResult)
        {
            return new MessageObject()
            {
                Type = Type,
                Id = Id,
                Title = Title,
                Message = Message
            };
        }

        // Builds a basic message including extra information from an exception
        public MessageObject BuildMessage(string Type, string Id, string Title, string Message, Exception exception)
        {
            return new MessageObject()
            {
                Type = Type,
                Id = Id,
                Title = Title,
                Message = Message
            };
        }

        // Builds a basic message including extra information from fluent validation & an exception
        public MessageObject BuildMessage(string Type, string Id, string Title, string Message, Exception exception, ValidationResult fluentvalidationResult)
        {
            IList<ValidationObject> validationResults = null;
            if (!fluentvalidationResult.IsValid)
            {
                validationResults = ConvertFluentValidationResults(fluentvalidationResult.Errors);
            }

            int Status = 0;
            string DebugMessage = "";
            if ( exception != null)
            {
                DebugMessage = exception.Message;
                Status = exception.HResult;
            }

            return new MessageObject()
            {
                Type = Type,
                Id = Id,
                Title = Title,
                Message = Message,
                DebugMessage = DebugMessage,
                Status = Status,
                ValidationResults = validationResults
            };
        }

        //Converts Fluent validation results into a common validation result object - so we can have consistent valdation results regardless of if they come from fluent validation or not
        public IList<ValidationObject> ConvertFluentValidationResults(IList<ValidationFailure> fluentValidationResults)
        {
            IList<ValidationObject> validationResults = new List<ValidationObject>();

            //Loop the fluent validation results building up a list of validation objects
            foreach (ValidationFailure result in fluentValidationResults)
            {
                ValidationObject validationObject = new ValidationObject(result);
                validationResults.Add(validationObject);
            }

            return validationResults;
        }




    }
}
