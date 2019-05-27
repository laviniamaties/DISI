using Microsoft.EntityFrameworkCore.Migrations;

namespace DbLibrary.Migrations
{
    public partial class UserStudyClass_Grade : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Grade",
                table: "UserStudyClass",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Grade",
                table: "UserStudyClass");
        }
    }
}
