using FluentValidation;
using System.Collections.Generic;

namespace EpicQuestEntities
{
    public class Quest
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public List<Quest> ChainQuests { get; set; }

        public bool Active { get; set; }

    }

    public class QuestValidator : AbstractValidator<Quest>
    {
        public QuestValidator()
        {
            RuleFor(quest => quest.Id).NotEmpty().WithMessage("Id is required");
            RuleFor(quest => quest.Title).NotEmpty().WithMessage("Title is required");
        }
    }

}
