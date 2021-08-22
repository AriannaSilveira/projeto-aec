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
    public class EmpresasController : ControllerBase
    {
        private readonly DbContexto _context;

        public EmpresasController(DbContexto context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("/empresas")]
        public async Task<IActionResult> Index()
        {
            var dbContexto = _context.Empresas;
            return StatusCode(200, await _context.Empresas.ToListAsync());
        }

        [HttpPost]
        [Route("/empresas")]
        public async Task<IActionResult> Create([Bind("Id,Nome,CPF,Nascimento,Telefone,Email,Logradouro,Numero,Bairro,Cidade,Estado,VagaId")] Empresa empresa)
        {
            _context.Add(empresa);
            await _context.SaveChangesAsync();
            return StatusCode(201, empresa);
        }

        [HttpPut]
        [Route("/empresas")]
        public async Task<IActionResult> Edit(Empresa empresa)
        {
            var jaExiste = (await _context.Empresas.Where(v => v.Cpnj == empresa.Cpnj).CountAsync()) > 0;

            if (jaExiste)
            {
                return StatusCode(406, new { Message = "A empresa já possui cadastro. Por favor, faça login." });
            }

            jaExiste = (await _context.Empresas.Where(v => v.Email == empresa.Email).CountAsync()) > 0;

            if (jaExiste)
            {
                return StatusCode(406, new { Message = "O e-mail informado já possui cadastro. Por favor, faça login." });
            }

            try
            {
                _context.Update(empresa);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
                // if (!EmpresaExists(empresa.Id))
                // {
                //     return NotFound();
                // }
                // else
                // {
                //     throw;
                // }
            }

            return StatusCode(200, empresa);
        }

        [HttpGet]
        [Route("/empresas/{id}")]
        public async Task<Empresa> Get(int id)
        {
            return await _context.Empresas.FindAsync(id);
        }



        [HttpDelete]
        [Route("/empresas/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var empresa = await _context.Empresas.FindAsync(id);
            _context.Empresas.Remove(empresa);
            await _context.SaveChangesAsync();
            return StatusCode(204);
        }

        // private bool EmpresaExists(int id)
        // {
        //     return _context.Empresas.Any(e => e.Id == id);
        // }
    }
}
