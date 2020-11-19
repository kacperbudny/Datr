using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.Validators;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.User
{
    public class Register
    {
        public class Command : IRequest<User>
        {
            public string DisplayName { get; set; }
            public string Username { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public string UserDescription { get; set; }
            public string UserGender { get; set; }
            public DateTime BirthDate { get; set; }
            public string UserCity { get; set; }
            public bool UserRelationshipStatus { get; set; }
            public string Interests { get; set; }
            
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.DisplayName).NotEmpty()
                    .Must(x => x.Contains(" ") && System.Text.RegularExpressions.Regex.Matches(x," ").Count == 1)
                    .WithMessage("Nazwa musi posiadać jeden odstęp");
                RuleFor(x => x.Username);
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
                RuleFor(x => x.Password).Password();
                RuleFor(x => x.UserDescription).NotEmpty();
                RuleFor(x => x.UserGender).NotEmpty();
                RuleFor(x => x.BirthDate).NotEmpty();
                RuleFor(x => x.UserCity).NotEmpty();
                RuleFor(x => x.Interests).NotEmpty();
            }
            
            
        }

        public class Handler : IRequestHandler<Command, User>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwtGenerator _jwtGenerator;

            public Handler(DataContext context, UserManager<AppUser> userManager, IJwtGenerator jwtGenerator)
            {
                _jwtGenerator = jwtGenerator;
                _userManager = userManager;
                _context = context;
            }

            public async Task<User> Handle(Command request, CancellationToken cancellationToken)
            {
                if (await _context.Users.Where(x => x.Email == request.Email).AnyAsync())
                    throw new RestException(HttpStatusCode.BadRequest, new { Email = "Email already exists" });

                if (await _context.Users.Where(x => x.UserName == request.Username).AnyAsync())
                    throw new RestException(HttpStatusCode.BadRequest, new { Username = "Username already exists" });

                var user = new AppUser
                {
                    DisplayName = request.DisplayName,
                    Email = request.Email,
                    UserName = request.Email,
                    UserDescription = request.UserDescription,
                    UserGender = request.UserGender,
                    BirthDate = request.BirthDate,
                    UserCity = request.UserCity,
                    Interests = request.Interests,
                };

                var result = await _userManager.CreateAsync(user, request.Password);

                if (result.Succeeded)
                {
                    return new User
                    {
                        DisplayName = user.DisplayName,
                        Token = _jwtGenerator.CreateToken(user),
                        Username = user.UserName,
                        Image = null
                    };
                }

                throw new Exception("Problem creating user");
            }
        }
    }
}