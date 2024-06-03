- create project
```
#!/usr/bin/env bash
green="\033[1;32m"
reset="\033[m"

echo "About to create the directory"
mkdir Reactivities
cd Reactivities

echo -e "${green}Creating solution and projects${reset}"
dotnet new sln
dotnet new webapi -n API --use-controllers
dotnet new classlib -n Application
dotnet new classlib -n Domain
dotnet new classlib -n Persistence

echo -e "${green}Adding projects to the solution${reset}"
dotnet sln add API/API.csproj
dotnet sln add Application/Application.csproj
dotnet sln add Domain/Domain.csproj
dotnet sln add Persistence/Persistence.csproj

echo -e "${green}Setting up project dependancies${reset}"
cd API
dotnet add reference ../Application/Application.csproj
cd ../Application
dotnet add reference ../Domain/Domain.csproj
dotnet add reference ../Persistence/Persistence.csproj
cd ../Persistence
dotnet add reference ../Domain/Domain.csproj
cd ..

echo -e "${green}Executing dotnet restore${reset}"
dotnet restore

echo -e "${green}Finished!${reset}"
```

- Added the Activities.cs to Domain
- Added DataContext.cs to Persistance
- Added the lines to API/Program.cs
```
builder.Services.AddDbContext<DataContext>(opt => { 
    opt.UseSqlite(builder.Configuration.GetConnectionString("SQLLiteConnectionString"));
});
```
- Added connection string to API/appsettings.Development.json
```
"ConnectionStrings": {
"SQLLiteConnectionString": "Data Source=fakesocials.db"
}
```
- Install entityframework in Persistence
```
cd Persistence/
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
```
- Install dotnet ef tool
```
dotnet tool list -g
dotnet tool install --global dotnet-ef --version 8
```

- First migration, run at root, this will create Persistance/Migrations folder
```
dotnet ef migrations add InitialCreate -s API -p Persistence
```

- Adding these lines to Program.cs, after running the app with dtonet run, can see .db files created in API
```
try 
{
    var context = services.GetRequiredService<DataContext>();
    context.Database.Migrate();
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
}
```
- Create seed.cs in Persistence/, also added the line to Program.cs
```
await Seed.SeedData(context);
```
- Defined baseController to save repeating controller class decorations
- Defined activities controller

- Creating the UI app with Vite
```
npm create vite@latest
```

- Adding mediator from the architecture approach to the Application/ where the business logic sits
```
dotnet add package MediatR --version 12.2.0
```

- Added List.cs to Application/Activities/List.cs

- Removed directly inject context to ActivitiesController, replced with IMediator
```
    private readonly DataContext _context;
    public ActivitiesController(Context context) {
        _context = context;
    }
```

- In Program.cs, registring the Mediator
```
using Application.Activities;

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(List.Handler).Assembly));
```

- One of the goals is to keep the controller as thing as possible
    - Adding mediator to the basecontroller