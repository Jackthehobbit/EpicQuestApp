using EpicQuestEntities;
using System.Collections.Generic;

namespace EpicQuestApp.ViewModels
{
    public class QuestViewModel
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public List<Quest> ChainQuests { get; set; }

        public bool Active { get; set; }
    }
}
