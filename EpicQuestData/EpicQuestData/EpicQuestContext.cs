using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EpicQuestEntities;
using Microsoft.Extensions.Configuration;

namespace EpicQuestData
{
    public class EpicQuestContext : DbContext
    {
        private IConfigurationRoot _config;
        public EpicQuestContext(IConfigurationRoot config,DbContextOptions options) : base(options)
        {
            _config = config;
        }

        //The Entites available in this context
        public DbSet<Quest> Quests { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);

            optionsBuilder.UseSqlServer(_config["Data:EpicQuestContextConnection"]);
        }
    }
}
