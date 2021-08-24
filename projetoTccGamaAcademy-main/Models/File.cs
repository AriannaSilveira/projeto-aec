// using System;
// using System.Collections.Generic;
// using System.ComponentModel.DataAnnotations;
// using System.ComponentModel.DataAnnotations.Schema;
// using System.Text.Json.Serialization;

// namespace projetoGamaAcademy.Models
// {
//     public class File 
//     {
//         public int FileId { get; set; }
//         [StringLength(255)]
//         public string FileName { get; set; }
//         [StringLength(100)]
//         public string ContentType { get; set; }
//         public byte[] Content { get; set; }
//         public FileType FileType { get; set; }
//         public int CandidatoId { get; set; }
//         public virtual Candidato Candidato { get; set; }
//     }
// }