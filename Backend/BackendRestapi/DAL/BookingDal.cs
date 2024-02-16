using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BackendRestapi.DAL
{
    [Table("tbl_Booking")]
    public class BookingDal
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? Id { get; set; }

        public string? UserId { get; set; }

        public string? UserName { get; set; }

        public string? BookingDate { get; set; }
        public string? BookingTime { get; set; }
        public string? TotalMembers { get; set; }

    }
}
