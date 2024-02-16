using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendRestapi.DAL
{
    [Table("tbl_AdminLogin")]
    public class AdminLoginDal
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? Id { get; set; }

        public string? UserName { get; set; }

        public string? Password { get; set; }

        public string? Role { get; set; }
    }
}
