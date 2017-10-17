using System.Collections.Generic;

namespace EpicQuestServices
{
    public class MessageObject
    {
        //Identifier to identify what went wrong
        public string Id { get; set; }

        //Error,Info or Warning
        public string Type { get; set; }

        //Unique status to identify the error - can be used to hold the excpetion hresult to indicate what expection was thrown
        public int Status { get; set; }

        //Title of the message - can be used in message boxes 
        public string Title { get; set; }

        //User facing message to indicate what went wrong
        public string Message { get; set; }

        //Extra messaging
        public string DebugMessage { get; set; }

        //A list of validation results one for each field
        public IList<ValidationObject> ValidationResults { get; set; }

        public MessageObject()
        {
            if (Message == null)
            {
                Message = "An unexpected error occurred";
            }
        }

    }
}
