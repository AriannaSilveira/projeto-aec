using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using projetoGamaAcademy.Models;
using projetoGamaAcademy.Servicos;


namespace projetoGamaAcademy.Controllers
{
    [ApiController]
    //[Route("[controller]")]
    public class CandidatosController : ControllerBase
    {
        private readonly DbContexto _context;

        public CandidatosController(DbContexto context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("/candidatos")]
        public async Task<IActionResult> Index()
        {
            var dbContexto = _context.Candidatos;
            return StatusCode(200, await _context.Candidatos.ToListAsync());
        }

        [HttpPost]
        [Route("/candidatos")]
        public async Task<IActionResult> Create(Candidato candidato)
        {
            var logarUsuario = (await _context.Candidatos.Where(v => v.Email == candidato.Email && v.Senha == candidato.Senha).CountAsync()) > 0;

            if (!logarUsuario)
            {
                return StatusCode(406, new { Message = "E-mail e/ou senha incorretos." });
            }

            else
            {
                return StatusCode(201, candidato);

            }

            // _context.Add(candidato);
            // await _context.SaveChangesAsync();
            // return StatusCode(201, candidato);
        }

        
        [HttpGet]
        [Route("/candidatos/{email}/{senha}")]
        public async Task<IActionResult> Get(string email, string senha)
        
        {
            var logarUsuario = (await _context.Candidatos.Where(v => v.Email == email && v.Senha == senha).CountAsync()) > 0;

            if (!logarUsuario)
            {
                return StatusCode(406, new { Message = "E-mail e/ou senha incorretos." });
            }

            else
            {
                //return StatusCode(201, candidato);
                return StatusCode(201, _context.Candidatos.Where(v => v.Email == email).First());

            }

            // _context.Add(candidato);
            // await _context.SaveChangesAsync();
            // return StatusCode(201, candidato);
        }

        [HttpPut]
        [Route("/candidatos")]
        public async Task<IActionResult> Edit(Candidato candidato)
        {
            var jaExiste = (await _context.Candidatos.Where(v => v.Cpf == candidato.Cpf).CountAsync()) > 0;

            if (jaExiste)
            {
                return StatusCode(406, new { Message = "Você já possui cadastro. Por favor, faça login." });
            }

            jaExiste = (await _context.Candidatos.Where(v => v.Email == candidato.Email).CountAsync()) > 0;

            if (jaExiste)
            {
                return StatusCode(406, new { Message = "O e-mail informado já possui cadastro. Por favor, faça login." });
            }


            try
            {
                _context.Update(candidato);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
                // if (!CandidatoExists(candidato.Id))
                // {
                //     return NotFound();
                // }
                // else
                // {
                //     throw;
                // }
            }

            return StatusCode(200, candidato);
        }

        [HttpGet]
        [Route("/candidatos/{id}")]
        public async Task<Candidato> Get(int id)
        {
            return await _context.Candidatos.FindAsync(id);
        }



        [HttpDelete]
        [Route("/candidatos/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var candidato = await _context.Candidatos.FindAsync(id);
            _context.Candidatos.Remove(candidato);
            await _context.SaveChangesAsync();
            return StatusCode(204);
        }

        // private bool CandidatoExists(int id)
        // {
        //     return _context.Candidatos.Any(e => e.Id == id);
        // }
    }
}
