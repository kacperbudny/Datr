using System;

namespace Application.Activities
{
    public class AttendeeDto
    {
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Image { get; set; }
        public string UserDescription { get; set; }
        public bool IsHost { get; set; }
        public string UserGender { get; set; }
        public DateTime BirthDate { get; set; }
        public string UserCity { get; set; }
        public string Interests { get; set; }

    }
}