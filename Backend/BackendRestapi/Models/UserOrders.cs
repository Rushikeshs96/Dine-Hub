using BackendRestapi.DAL;

namespace BackendRestapi.Models
{
    public class UserOrders
    {
        public string? order_id { get; set; }
        public string? order_date { get; set; }
        public string? UserId { get; set; }

        public string? UserName { get; set; }
        public List<UserOrderDetailsDal> orderDetails { get; set; }
    }
}
