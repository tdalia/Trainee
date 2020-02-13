using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;

using traineeApp.Model;
using System.IO;

namespace traineeApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Register Database
            services.AddDbContext<TraineeAppContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("TraineeDb")));
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
           /* else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseMvc();*/

            // Redirect non-api calls to angular app that will handle
            // routing of the app
            app.Use(async (context, next) => {
              await next();
              if (context.Response.StatusCode == 404 &&
                !Path.HasExtension(context.Request.Path.Value) &&
                !context.Request.Path.Value.StartsWith("/api/")) {

                  context.Request.Path = "/index.html";
                  await next();
              }
            });

            // Configure app to serve static files from wwwroot
            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure app for usage as api
            app.UseMvcWithDefaultRoute();
        }
    }
}
