﻿// <auto-generated />
using System;
using DbLibrary.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DbLibrary.Migrations
{
    [DbContext(typeof(UniversityManagementContext))]
    [Migration("20190526110031_exam")]
    partial class exam
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.3-servicing-35854")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("DbLibrary.Model.Exam", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Date");

                    b.Property<int>("GroupID");

                    b.Property<int>("StudyClassID");

                    b.Property<int>("UserID");

                    b.HasKey("ID");

                    b.HasIndex("GroupID");

                    b.HasIndex("StudyClassID");

                    b.HasIndex("UserID");

                    b.ToTable("Exam");
                });

            modelBuilder.Entity("DbLibrary.Model.Group", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Title");

                    b.HasKey("ID");

                    b.ToTable("Group");
                });

            modelBuilder.Entity("DbLibrary.Model.StudyClass", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Title");

                    b.HasKey("ID");

                    b.ToTable("StudyClass");
                });

            modelBuilder.Entity("DbLibrary.Model.UserGroup", b =>
                {
                    b.Property<int>("UserID");

                    b.Property<int>("GroupID");

                    b.HasKey("UserID", "GroupID");

                    b.HasIndex("GroupID");

                    b.ToTable("UserGroup");
                });

            modelBuilder.Entity("DbLibrary.Model.UserStudyClass", b =>
                {
                    b.Property<int>("UserID");

                    b.Property<int>("StudyClassID");

                    b.Property<double>("Grade");

                    b.HasKey("UserID", "StudyClassID");

                    b.HasIndex("StudyClassID");

                    b.ToTable("UserStudyClass");
                });

            modelBuilder.Entity("DbLibrary.User", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address");

                    b.Property<string>("Email")
                        .IsRequired();

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<string>("Password")
                        .IsRequired();

                    b.Property<string>("Phone");

                    b.Property<int>("Role");

                    b.HasKey("ID");

                    b.ToTable("User");
                });

            modelBuilder.Entity("DbLibrary.Model.Exam", b =>
                {
                    b.HasOne("DbLibrary.Model.Group", "Group")
                        .WithMany()
                        .HasForeignKey("GroupID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DbLibrary.Model.StudyClass", "StudyClass")
                        .WithMany()
                        .HasForeignKey("StudyClassID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DbLibrary.User", "User")
                        .WithMany()
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DbLibrary.Model.UserGroup", b =>
                {
                    b.HasOne("DbLibrary.Model.Group", "Group")
                        .WithMany("UserGroups")
                        .HasForeignKey("GroupID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DbLibrary.User", "User")
                        .WithMany("UserGroups")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DbLibrary.Model.UserStudyClass", b =>
                {
                    b.HasOne("DbLibrary.Model.StudyClass", "StudyClass")
                        .WithMany("UserStudyClasses")
                        .HasForeignKey("StudyClassID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DbLibrary.User", "User")
                        .WithMany("UserStudyClasses")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
