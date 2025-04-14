using Xunit;
using Microsoft.EntityFrameworkCore;

using MissingPaws.API.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using MissingPaws.Data;
using MissingPaws.Models;

namespace MissingPaws.Tests
{
    public class LostPetsControllerTests
    {

        [Fact]
        public async Task DeleteLostPet_Removes_Pet()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("DeleteTestDb")
                .Options;

            using var context = new ApplicationDbContext(options);

            var pet = new LostPet
            {
                Name = "Rocky",
                MissingDate = DateTime.Now,
                LastSeenLocation = "Lago Oeste",
                ContactInfo = "12345-6789",
                ImageUrl = "rocky.png",
                IsApproved = true
            };

            context.LostPets.Add(pet);
            await context.SaveChangesAsync();

            var controller = new LostPetsController(context);

            var result = await controller.DeleteLostPet(pet.Id);

            Assert.IsType<NoContentResult>(result);

            var petInDb = await context.LostPets.FindAsync(pet.Id);
            Assert.Null(petInDb);
        }

        [Fact]
        public async Task PutLostPet_Updates_Pet_Info()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("PutTestDb")
                .Options;

            using var context = new ApplicationDbContext(options);

            var pet = new LostPet
            {
                Name = "Max",
                MissingDate = DateTime.Now,
                LastSeenLocation = "Rua Azul",
                ContactInfo = "7777-7777",
                ImageUrl = "max.png"
            };

            context.LostPets.Add(pet);
            await context.SaveChangesAsync();

            context.Entry(pet).State = EntityState.Detached;

            var controller = new LostPetsController(context);

            var updatedPet = new LostPet
            {
                Id = pet.Id,
                Name = "Max Atualizado",
                MissingDate = pet.MissingDate,
                LastSeenLocation = "Rua Verde",
                ContactInfo = "7777-0000",
                ImageUrl = "new.png"
            };

            var result = await controller.PutLostPet(pet.Id, updatedPet);

            Assert.IsType<NoContentResult>(result);

            var updatedFromDb = await context.LostPets.FindAsync(pet.Id);
            Assert.Equal("Max Atualizado", updatedFromDb.Name);
            Assert.Equal("Rua Verde", updatedFromDb.LastSeenLocation);
        }


        [Fact]
        public async Task GetLostPet_Returns_Pet_By_Id()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("GetByIdTestDb")
                .Options;

            using var context = new ApplicationDbContext(options);

            var pet = new LostPet
            {
                Name = "Luna",
                MissingDate = DateTime.Now,
                LastSeenLocation = "Av. Norte",
                ContactInfo = "8888-8888",
                ImageUrl = "luna.png"
            };

            context.LostPets.Add(pet);
            await context.SaveChangesAsync();

            var controller = new LostPetsController(context);
            var result = await controller.GetLostPet(pet.Id);

            var actionResult = Assert.IsType<ActionResult<LostPet>>(result);
            var foundPet = Assert.IsType<LostPet>(actionResult.Value);

            Assert.Equal("Luna", foundPet.Name);
        }


        [Fact]
        public async Task PostLostPet_Creates_New_Pet()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "PostTestDb")
                .Options;

            using var context = new ApplicationDbContext(options);

            var controller = new LostPetsController(context);

            var newPet = new LostPet
            {
                Name = "Thor",
                MissingDate = DateTime.Now,
                LastSeenLocation = "Praça Central",
                ContactInfo = "9999-9999",
                ImageUrl = "thor.png"
            };

            var result = await controller.PostLostPet(newPet);

            var actionResult = Assert.IsType<ActionResult<LostPet>>(result);
            var createdAt = Assert.IsType<CreatedAtActionResult>(actionResult.Result);
            var createdPet = Assert.IsType<LostPet>(createdAt.Value);

            Assert.Equal("Thor", createdPet.Name);
        }

        [Fact]
        public async Task GetLostPets_OnlyReturnsApprovedPets()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("OnlyApprovedPetsDb")
                .Options;

            using var context = new ApplicationDbContext(options);

            context.LostPets.AddRange(
                new LostPet { Name = "Rex", IsApproved = true, MissingDate = DateTime.Now, LastSeenLocation = "Rua 1", ContactInfo = "1111", ImageUrl = "img1" },
                new LostPet { Name = "Luna", IsApproved = false, MissingDate = DateTime.Now, LastSeenLocation = "Rua 2", ContactInfo = "2222", ImageUrl = "img2" }
            );

            await context.SaveChangesAsync();

            var controller = new LostPetsController(context);

            var result = await controller.GetLostPets();

            var actionResult = Assert.IsType<ActionResult<IEnumerable<LostPet>>>(result);
            var pets = Assert.IsType<List<LostPet>>(actionResult.Value);

            Assert.Single(pets);
            Assert.Equal("Rex", pets[0].Name);
        }

        [Fact]
        public async Task ApprovePet_SetsIsApprovedToTrue()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("ApprovePetDb")
                .Options;

            using var context = new ApplicationDbContext(options);

            var pet = new LostPet
            {
                Name = "Nina",
                IsApproved = false,
                MissingDate = DateTime.Now,
                LastSeenLocation = "Rua X",
                ContactInfo = "9999",
                ImageUrl = "img.png"
            };

            context.LostPets.Add(pet);
            await context.SaveChangesAsync();

            var controller = new LostPetsController(context);

            var result = await controller.ApprovePet(pet.Id);

            Assert.IsType<NoContentResult>(result);

            var approved = await context.LostPets.FindAsync(pet.Id);
            Assert.True(approved.IsApproved);
        }


        [Fact]
        public async Task GetLostPets_Returns_All_LostPets()
        {
            // 1. Criar opções para o banco em memória
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDb")
                .Options;

            // 2. Criar o contexto e adicionar dados de teste
            using var context = new ApplicationDbContext(options);

            context.LostPets.Add(new LostPet
            {
                Name = "Bolt",
                MissingDate = DateTime.Now,
                LastSeenLocation = "Rua A",
                ContactInfo = "123",
                ImageUrl = "img1.png",
                IsApproved = true
            });

            context.LostPets.Add(new LostPet
            {
                Name = "Milo",
                MissingDate = DateTime.Now,
                LastSeenLocation = "Rua B",
                ContactInfo = "456",
                ImageUrl = "img2.png",
                IsApproved = true
            });

            await context.SaveChangesAsync();

            // 3. Criar o controller com o contexto preenchido
            var controller = new LostPetsController(context);

            // 4. Executar o método
            var result = await controller.GetLostPets();

            // 5. Verificar o retorno
            var actionResult = Assert.IsType<ActionResult<IEnumerable<LostPet>>>(result);
            var pets = Assert.IsType<List<LostPet>>(actionResult.Value);
            Assert.Equal(2, pets.Count);
        }
    }
}
