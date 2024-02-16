using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BackendRestapi.DAL
{
    [Table("tbl_Order")]
    public class OrdersDal
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? OrderId { get; set; }
        public string? OrderDate { get; set; }
        public string? TotalPrice { get; set; }
        public string? OrderStatus { get; set; }
        public string? SupplierId { get; set; }

        public string? SupplierName { get; set; }
    }
}
