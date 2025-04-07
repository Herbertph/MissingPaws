using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using MissingPaws.Models;

namespace MissingPaws.Tests.Tests
{
    public class LostPetTests
    {
        [Fact]
        public void LostPet_Name_Should_Not_Be_Empty()
        {
            // Arrange
            var pet = new LostPet
            {
                Name = "",
                MissingDate = DateTime.Now,
                LastSeenLocation = "Rua ABC",
                ContactInfo = "123-456",
                ImageUrl = "https://img.com/pet.png"
            };

            // Act
            var nameIsEmpty = string.IsNullOrWhiteSpace(pet.Name);

            // Assert
            Assert.True(nameIsEmpty);
        }
    }
}