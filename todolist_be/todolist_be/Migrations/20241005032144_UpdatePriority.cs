using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace todolist_be.Migrations
{
    public partial class UpdatePriority : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "Date",
                table: "Works",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTimeOffset),
                oldType: "datetimeoffset(0)");

            migrationBuilder.AddColumn<byte>(
                name: "Priority",
                table: "Works",
                type: "tinyint",
                nullable: false,
                defaultValue: (byte)0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Priority",
                table: "Works");

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "Date",
                table: "Works",
                type: "datetimeoffset(0)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "date");
        }
    }
}
