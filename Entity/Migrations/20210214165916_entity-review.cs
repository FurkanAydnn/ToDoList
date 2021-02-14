using Microsoft.EntityFrameworkCore.Migrations;

namespace Entity.Migrations
{
    public partial class entityreview : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "ToDoListItems");

            migrationBuilder.DropColumn(
                name: "Priority",
                table: "ToDoListItems");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "ToDoListItems",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Priority",
                table: "ToDoListItems",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
