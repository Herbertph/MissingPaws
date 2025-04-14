using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MissingPaws.Migrations
{
    /// <inheritdoc />
    public partial class AddIsApprovedToLostPet : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsApproved",
                table: "LostPets",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsApproved",
                table: "LostPets");
        }
    }
}
