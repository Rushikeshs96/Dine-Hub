namespace BackendRestapi.Models
{
    public class Product
    {
        public int? Id { get; set; }

        public string ProductName { get; set; }

        public string? Price { get; set; }

        public string? SupplierId { get; set; }

        public string? Status { get; set; }
    }
}
