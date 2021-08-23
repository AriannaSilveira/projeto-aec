using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace projetoGamaAcademy.Models
{
    [Table("empresas")]
    public class Empresa
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public int Id { get; set; }


        [Column("nome", TypeName = "varchar")]
        [MaxLength(100)]
        [Required]
        public string Nome { get; set; }

        [Column("cpnj", TypeName = "varchar")]
        [MaxLength(15)]
        [Required]
        public string Cpnj { get; set; }


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
        [MaxLength(50)]
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
        [MaxLength(10)]
        [Required]
        public string Senha { get; set; }

        // public ICollection<Empresa> Empresas { get; }
    }
}