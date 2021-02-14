using Microsoft.EntityFrameworkCore.Migrations;

namespace Entity.Migrations
{
    public partial class addpropertyIsAlertDisplayed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsAlertDisplayed",
                table: "ToDoListItems",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsAlertDisplayed",
                table: "ToDoListItems");
        }
    }
}
