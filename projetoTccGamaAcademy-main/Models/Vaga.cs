using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace projetoGamaAcademy.Models
{
    [Table("vagas")]
    public class Vaga
    {
        [Key]
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }


        [Column("nome", TypeName = "varchar")]
        [MaxLength(100)]
        [Required]
        public string Nome { get; set; }

        [Column("descricao", TypeName = "varchar")]
        [MaxLength(1000)]
        [Required]
        public string Descricao { get; set; }

        // [Column("salario", TypeName = "float")]
        // [MaxLength(100)]
        // [Required]
        // public double Salario { get; set; }

        [Column("jornada", TypeName = "int")]
        [Required]
        public int Jornada { get; set; }

        [Column("id_empresa", TypeName = "int")]
        [Required]
        public int IdEmpresa { get; set; }

        [Column("disponivel", TypeName = "int")]
        [Required]
        public int Disponivel { get; set; }

        // public ICollection<Vaga> Vagas { get; set; }
    }
}