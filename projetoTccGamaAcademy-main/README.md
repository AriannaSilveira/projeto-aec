# Comandos iniciais:
``` bash
  mkdir projetoGamaAcademy
  cd projetoGamaAcademy
  dotnet new webapi
```

# Comandos git:
``` bash
  git init
  git add .
  git commit -m "Iniciando projeto"
  code .gitignore # gerei o conteúdo para ignorar como (Windows, Linux, Mac, DotnetCore, VisualStudioCore) no link: https://www.toptal.com/developers/gitignore
  Criei o repositório e rodei os comandos
  git remote add origin github.com/LLuizEduardo/projetoTccGamaAcademy.git
  git branch -M main
  git push -u origin main
```

# Componentes instalados:
``` bash
  dotnet add package Microsoft.EntityFrameworkCore --version 5.0.9
  dotnet add package Microsoft.EntityFrameworkCore.Tools --version 5.0.9
  dotnet add package Microsoft.EntityFrameworkCore.SqlServer --version 5.0.9
  dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design --version 5.0.2
```

# Comandos para migração:
``` bash
dotnet tool install --global dotnet-ef
dotnet ef migrations add VagaAdd
dotnet ef database update
```

# Instalação do code generator
``` bash
dotnet tool install -g dotnet-aspnet-codegenerator
```

# Gerando o scaffolds
``` bash
dotnet aspnet-codegenerator controller -name VagasController -m Vaga -dc DbContexto --relativeFolderPathControllers

dotnet aspnet-codegenerator controller -name CandidatosController -m Candidato -dc DbContexto--relativeFolderPath Controllers

```
# Abrindo o swagger
``` bash
dotnet watch run
```

# Criar pasta Models
```
incluir classes
Candidato
Empresa
Vaga
```

# Erros encontrados
```
Failed to load API definition >> undefined /swagger/v1/swagger.json
```

