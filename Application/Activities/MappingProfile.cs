using AutoMapper;
using Domain;

namespace Application.Activities
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Activity, ActivityDto>();
            CreateMap<UserActivity, AttendeeDto>()
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.UserDescription, o => o.MapFrom(s => s.AppUser.UserDescription))
                .ForMember(d => d.UserGender, o => o.MapFrom(s => s.AppUser.UserGender))
                .ForMember(d => d.BirthDate, o => o.MapFrom(s => s.AppUser.BirthDate))
                .ForMember(d => d.UserCity, o => o.MapFrom(s => s.AppUser.UserCity))
                .ForMember(d => d.Interests, o => o.MapFrom(s => s.AppUser.Interests))
                ;
        }
    }
}