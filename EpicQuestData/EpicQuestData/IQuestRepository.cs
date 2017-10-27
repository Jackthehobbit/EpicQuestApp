using EpicQuestEntities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EpicQuestData
{
    public interface IQuestRepository
    {
        void CreateQuest(Quest quest);
        void DeleteQuest(Quest quest);
        IList<Quest> GetAllQuests(bool includeInactive);
        Quest GetQuestById(int id);
        Task<bool> SaveChangesAsync();
    }
}
