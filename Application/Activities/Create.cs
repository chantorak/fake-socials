using System.ComponentModel.DataAnnotations;
using System.Formats.Asn1;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create 
    {
        public class Command : IRequest
        {
            [Required]
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);

                await _context.SaveChangesAsync();
            }

        }
    }
}