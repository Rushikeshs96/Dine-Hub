using BackendRestapi.DAL;

namespace BackendRestapi.Models
{
    public class OrderRequest
    {
        public string? order_id { get; set; }
        public string? order_date { get; set; }
        public string? supp_id { get; set; }
        public string? supp_name { get; set; }
        public string? order_status { get; set; }

        public List<OrderDetailsDal> orderDetails { get; set; }
    }
}
