using System;

/**
Trainee Model
 */
namespace traineeApp.Model
{
    public class Trainee
    {
        public long ? id {
            get;
            set;
        }

        public string name {
            get;
            set;
        }

        public string email {
            get;
            set;
        }

        public byte gender {
            get;
            set;
        }

        public DateTime ? birth {
            get;
            set;
        }

        public string experiencedTechno {
            get;
            set;
        }

        public string message {
            get;
            set;
        }
    }
}