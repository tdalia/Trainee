using Microsoft.EntityFrameworkCore;
/**
usng EF Code-First approach
TraineeAppContext class helps communicate Trainee model to Trainee table
 */
namespace traineeApp.Model
{
    public class TraineeAppContext : DbContext
    {
        public TraineeAppContext(DbContextOptions<TraineeAppContext> options) 
                    : base(options) {
        }

        public DbSet<Trainee> Trainee {
            get;
            set;
        }
    }
}