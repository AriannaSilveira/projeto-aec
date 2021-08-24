using System.Collections.Generic;

namespace projetoGamaAcademy.Apresentacao
{
    public class HomeView
    {
        public string Mensagem
        {
            get{ return "Jobs Net"; }
            
        }

        public List<string> Endpoints
        {
            get{ return new List<string>()
            {
                "/candidatos",
                "/vagas",
                "/empresas",
                "/curriculos",
                "/swagger"
            }; 
        }
            
        }
    }

}