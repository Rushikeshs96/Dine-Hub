using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendRestapi.DAL
{
    [Table("tbl_ErrorLog")]
    public class ErrorLogDal
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Controller_Name { get; set; }
        public string Error_Msg { get; set; }
        public string MethodName { get; set; }
        public string DateTime { get; set; }
    }
}
