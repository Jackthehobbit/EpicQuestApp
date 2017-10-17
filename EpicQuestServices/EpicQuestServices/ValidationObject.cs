using FluentValidation;
using FluentValidation.Results;

namespace EpicQuestServices
{
    public class ValidationObject
    {
        public string Type { get; set; }

        public string PropertyName { get; set; }

        public string Message { get; set; }

        public ValidationObject(ValidationFailure result)
        {
            Type = GetType(result.Severity);
            PropertyName = result.PropertyName;
            Message = result.ErrorMessage;
        }

        //Returns the string representation of the severity values available for ValidationFailures
        private string GetType(Severity severity)
        {
            switch (severity)
            {
                case Severity.Warning:
                    return "Warning";
                case Severity.Info:
                    return "Info";
                default:
                    return "Error";
            }
        }
    }
}
