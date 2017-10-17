using System.Threading.Tasks;
using EpicQuestEntities;
using System.Linq;
using System.Collections.Generic;

namespace EpicQuestData
{
    public class QuestRepository : IQuestRepository
    {
        private EpicQuestContext _context;

        public QuestRepository(EpicQuestContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Adds a Quest to the Database
        /// </summary>
        /// <param name="quest">Quest to Add</param>
        public void AddQuest(Quest quest)
        {
            _context.Quests.Add(quest);
        }

        /// <summary>
        /// Deletes a quest from the database
        /// </summary>
        /// <param name="quest">Quest to Delete</param>
        public void DeleteQuest(Quest quest)
        {
            _context.Quests.Remove(quest);
        }

        /// <summary>
        /// Returns a list of all quests
        /// </summary>
        /// <param name="includeInactive">Should inactive quests be included. False by default</param>
        /// <returns>A List of Quests</returns>
        public IList<Quest> GetAllQuests(bool includeInactive = false)
        {
            if (includeInactive) //Return all quests
            {
                return _context.Quests.ToList();
            }
            else // Only return active quests
            {
                return _context.Quests.Where(quest => quest.Active == true).ToList();
            }
            
        }

        /// <summary>
        /// Returns a Quest matching a given Id
        /// </summary>
        /// <param name="id">The Id of the quest to return</param>
        /// <returns>Returns the quest matching the given id if it exists</returns>
        public Quest GetQuestById(int id)
        {
            return _context.Quests.Where(quest => quest.Id == id).FirstOrDefault();
        }

        /// <summary>
        /// Commits any pending changes to the database
        /// </summary>
        public async Task<bool> SaveChangesAsnc()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }
    }
}
