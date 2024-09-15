using Application.Core;
using Domain;

namespace Application.Activities;

public class Details
{
    public class Query : MediatR.IRequest<Result<Domain.Activity>> {
        public Guid Id { get; set; }
    }

    public class Handler : MediatR.IRequestHandler<Query, Result<Domain.Activity>>
    {
        private readonly Persistence.DataContext _context;

        public Handler(Persistence.DataContext context)
        {
            _context = context;
        }

        public async Task<Result<Domain.Activity>> Handle(Query request, CancellationToken cancellationtoken) {
            var activity = await _context.Activities.FindAsync(request.Id);

            return Result<Activity>.Sucess(activity);
        }
    }
}