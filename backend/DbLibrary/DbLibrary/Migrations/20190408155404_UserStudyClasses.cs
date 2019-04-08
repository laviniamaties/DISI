using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DbLibrary.Migrations
{
    public partial class UserStudyClasses : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "StudyClass",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Title = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudyClass", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "UserStudyClass",
                columns: table => new
                {
                    UserID = table.Column<int>(nullable: false),
                    StudyClassID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserStudyClass", x => new { x.UserID, x.StudyClassID });
                    table.ForeignKey(
                        name: "FK_UserStudyClass_StudyClass_StudyClassID",
                        column: x => x.StudyClassID,
                        principalTable: "StudyClass",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserStudyClass_User_UserID",
                        column: x => x.UserID,
                        principalTable: "User",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserStudyClass_StudyClassID",
                table: "UserStudyClass",
                column: "StudyClassID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserStudyClass");

            migrationBuilder.DropTable(
                name: "StudyClass");
        }
    }
}
