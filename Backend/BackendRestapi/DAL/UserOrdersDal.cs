using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BackendRestapi.DAL
{
    [Table("tbl_UserOrders")]
    public class UserOrdersDal
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? OrderId { get; set; }
        public string? OrderDate { get; set; }
        public string? TotalPrice { get; set; }

        public string? UserId { get; set; }

        public string? UserName { get; set; }
    }
}
