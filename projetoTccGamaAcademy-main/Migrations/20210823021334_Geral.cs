using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace projetoGamaAcademy.Migrations
{
    public partial class Geral : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "candidatos",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nome = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    cpf = table.Column<string>(type: "varchar(14)", maxLength: 14, nullable: false),
                    cep = table.Column<string>(type: "varchar(9)", maxLength: 9, nullable: false),
                    rua = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    numero = table.Column<string>(type: "varchar(5)", maxLength: 5, nullable: false),
                    bairro = table.Column<string>(type: "varchar(30)", maxLength: 30, nullable: false),
                    cidade = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    estado = table.Column<string>(type: "varchar(2)", maxLength: 2, nullable: false),
                    email = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false),
                    senha = table.Column<string>(type: "varchar(15)", maxLength: 15, nullable: false),
                    data_nascimento = table.Column<DateTime>(type: "datetime2", nullable: false),
                    telefone = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false),
                    formacao = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    id_vaga = table.Column<string>(type: "varchar(64)", nullable: false),
                    CandidatoId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_candidatos", x => x.id);
                    table.ForeignKey(
                        name: "FK_candidatos_candidatos_CandidatoId",
                        column: x => x.CandidatoId,
                        principalTable: "candidatos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "empresas",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nome = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    cpnj = table.Column<string>(type: "varchar(15)", maxLength: 15, nullable: false),
                    cep = table.Column<string>(type: "varchar(9)", maxLength: 9, nullable: false),
                    rua = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    numero = table.Column<string>(type: "varchar(5)", maxLength: 5, nullable: false),
                    bairro = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    cidade = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    estado = table.Column<string>(type: "varchar(2)", maxLength: 2, nullable: false),
                    email = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    senha = table.Column<string>(type: "varchar(10)", maxLength: 10, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_empresas", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "vagas",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nome = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    descricao = table.Column<string>(type: "varchar(1000)", maxLength: 1000, nullable: false),
                    jornada = table.Column<int>(type: "int", nullable: false),
                    id_empresa = table.Column<int>(type: "int", nullable: false),
                    disponivel = table.Column<int>(type: "int", nullable: false),
                    VagaId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_vagas", x => x.id);
                    table.ForeignKey(
                        name: "FK_vagas_vagas_VagaId",
                        column: x => x.VagaId,
                        principalTable: "vagas",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_candidatos_CandidatoId",
                table: "candidatos",
                column: "CandidatoId");

            migrationBuilder.CreateIndex(
                name: "IX_vagas_VagaId",
                table: "vagas",
                column: "VagaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "candidatos");

            migrationBuilder.DropTable(
                name: "empresas");

            migrationBuilder.DropTable(
                name: "vagas");
        }
    }
}
