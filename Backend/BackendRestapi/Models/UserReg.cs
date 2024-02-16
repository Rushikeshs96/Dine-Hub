namespace BackendRestapi.Models
{
    public class UserReg
    {
        public int? Id { get; set; }
        public string? UserName { get; set; }

        public string? Password { get; set; }

        public string? UserAddress { get; set; }

        public string? ContactNo { get; set; }

        public string? EmailId { get; set; }
    }
}
