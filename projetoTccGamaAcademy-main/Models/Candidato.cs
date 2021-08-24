using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace projetoGamaAcademy.Models
{
    [Table("candidatos")]
    public class Candidato
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public int Id { get; set; }


        [Column("nome", TypeName = "varchar")]
        [MaxLength(100)]
        [Required]
        public string Nome { get; set; }

        [Column("cpf", TypeName = "varchar")]
        [MaxLength(14)]
        [Required]
        public string Cpf { get; set; }


        [Column("cep", TypeName = "varchar")]
        [MaxLength(9)]
        [Required]
        public string Cep { get; set; }

        [Column("rua", TypeName = "varchar")]
        [MaxLength(100)]
        [Required]
        public string Rua { get; set; }

        [Column("numero", TypeName = "varchar")]
        [MaxLength(5)]
        [Required]
        public string Numero { get; set; }

        [Column("bairro", TypeName = "varchar")]
        [MaxLength(30)]
        [Required]
        public string Bairro { get; set; }

        [Column("cidade", TypeName = "varchar")]
        [MaxLength(50)]
        [Required]
        public string Cidade { get; set; }

        [Column("estado", TypeName = "varchar")]
        [MaxLength(2)]
        [Required]
        public string Estado { get; set; }

        [Column("email", TypeName = "varchar")]
        [MaxLength(100)]
        [Required]
        public string Email { get; set; }

        [Column("senha", TypeName = "varchar")]
        [MaxLength(15)]
        [Required]
        public string Senha { get; set; }

        

        [Column("data_nascimento")]
        [Required]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:yyyy-MM-dd}")]
        public DateTime DataNascimento { get; set; }
      

        
        [Column("telefone", TypeName = "varchar")]
        [MaxLength(20)]
        [Required]
        public string Telefone { get; set; }

        [Column("formacao", TypeName = "varchar")]
        [MaxLength(100)]
        [Required]
        public string Formacao { get; set; }

        [Column("id_vaga", TypeName = "varchar")]
        [Required]
        public int IdVaga { get; set; }

        
        // public virtual ICollection<File> Files { get; set; }
        
        // public List<Curriculo> Curriculos { get; internal set; }

        // public ICollection<Candidato> Candidatos { get; set; }

    }
}