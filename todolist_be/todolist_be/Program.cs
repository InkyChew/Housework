using Microsoft.EntityFrameworkCore;
using Serilog;
using System.Text.Json.Serialization;
using todolist_be.Models;
using todolist_be.Repos;
using todolist_be.Services;

var builder = WebApplication.CreateBuilder(args);
var allowSpecificOrigins = "_allowSpecificOrigins";

/*
 * Database
 */
builder.Services.AddDbContext<TodoDbContext>(options => {
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("DB connection string 'DefaultConnection' not found.");
    options.UseSqlServer(connectionString);
});

// Log
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .Enrich.FromLogContext()
    .CreateLogger();

builder.Logging.AddSerilog(Log.Logger);

// Add services to the container.
builder.Services.AddScoped<IWorkRepo, WorkRepo>();
builder.Services.AddScoped<IWorkService, WorkService>();

builder.Services.AddControllers()
    .AddJsonOptions(options => {
        options.JsonSerializerOptions.Converters.Add(new DateTimeConverter());
    });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

/*
 * Cors
 */
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: allowSpecificOrigins,
                      policy =>
                      {
                          policy.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost");
                          policy.WithOrigins()
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(allowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
