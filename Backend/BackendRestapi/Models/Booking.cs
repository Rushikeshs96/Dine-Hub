namespace BackendRestapi.Models
{
    public class Booking
    {
        public int? Id { get; set; }

        public string? UserId { get; set; }

        public string? UserName { get; set; }

        public string? BookingDate { get; set; }
        public string? BookingTime { get; set; }
        public string? TotalMembers { get; set; }
    }
}
