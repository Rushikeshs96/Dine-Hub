using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendRestapi.DAL
{
    [Table("tbl_Menu")]
    public class MenuDal
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? Id { get; set; }

        public string? MenuName { get; set; }

        public string? ItemType { get; set; }

        public string? Category { get; set; }

        public string? Price { get; set; }
    }
}
