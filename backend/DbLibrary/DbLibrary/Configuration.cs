using System;
using System.Collections.Generic;
using System.Text;

namespace DbLibrary
{
    public static class Configuration
    {
        public static string ConnectionString
        {
            get
            {
                return "Data Source=.;Initial Catalog=UniversityManagement;Integrated Security=True;";
            }
        }
    }
}
