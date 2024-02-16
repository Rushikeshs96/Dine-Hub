using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BackendRestapi.DAL
{
    [Table("tbl_delicious")]
    public class UserLoginDal
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int User_Id { get; set; }

        public string User_name { get; set; }

        public int Use { get; set; }

        public string Password { get; set; }
    }
}
