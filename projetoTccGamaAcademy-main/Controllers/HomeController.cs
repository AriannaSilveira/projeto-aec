using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using projetoGamaAcademy.Apresentacao;

namespace projetoGamaAcademy.Controllers
{
    [ApiController]
    
    public class HomeController : ControllerBase
    {
        [HttpGet]
        [Route("/")]
        public HomeView Get()
        {
           return new HomeView();
        }
    }
}
