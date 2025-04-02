using Microsoft.EntityFrameworkCore;
using MissingPaws.Models;

namespace MissingPaws.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
           : base(options)
        {
        }

        public DbSet<LostPet> LostPets { get; set; }
    }
}
