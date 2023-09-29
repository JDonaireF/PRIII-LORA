using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace P_Lora.Datos
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser>
    {
		//A realizar el constructor, invocar en la variable options y hereda de una clase options
		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) 
        {  
        }
        //Inyeccion de dependencias
        //Y modelos
        public DbSet<ClienteAPI> ClientesAPI { get; set; }
    }
}
