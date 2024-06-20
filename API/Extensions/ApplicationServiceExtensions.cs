using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;
using Application.Activities;

namespace API.Extensions;

public static class ApplicationServiceExtensions {
    
    public static IServiceCollection AddApplicationService
        (this IServiceCollection services, IConfiguration config) 
    {
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
        services.AddDbContext<DataContext>(opt => {
            opt.UseSqlite(config.GetConnectionString("SQLLiteConnectionString"));
        });

        services.AddCors(opt =>
        {
            opt.AddPolicy("CorsPolicy", policy =>
            {
                policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
            });
        });
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(List.Handler).Assembly));
        services.AddAutoMapper(typeof(MappingProfiles).Assembly);

        return services;
    }

}