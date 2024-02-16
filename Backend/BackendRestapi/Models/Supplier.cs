namespace BackendRestapi.Models
{
    public class Supplier
    {
        public int? Id { get; set; }
        public string? SupplierName { get; set; }

        public string? SuppAddress { get; set; }

        public string? Password { get; set; }

        public string? GSTNo { get; set; }

        public string? ContactNo { get; set; }

        public string? EmailId { get; set; }
    }
}
