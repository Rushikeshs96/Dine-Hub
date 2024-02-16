using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendRestapi.DAL
{
    [Table("tbl_Product")]
    public class ProductDal
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string ProductName { get; set; }


        public string? Price { get; set; }

        public string? SupplierId { get; set; }

        public string? Status { get; set; }
    }
}
