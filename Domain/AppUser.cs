using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string UserDescription { get; set; }
        public string UserGender { get; set; }
        public DateTime BirthDate { get; set; }
        public string UserCity { get; set; }
        public bool UserRelationshipStatus { get; set; }
        public string Interests { get; set; }
        public virtual ICollection<UserActivity> UserActivities { get; set; }
    }
}