using Microsoft.EntityFrameworkCore.Migrations;

namespace DbLibrary.Migrations
{
    public partial class User_AdditionalData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "User",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "User",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "User",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "User",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "User");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "User");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "User");
        }
    }
}
