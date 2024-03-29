using BackendRestapi.DAL;
using BackendRestapi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackendRestapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserOrdersController : ControllerBase
    {
        private readonly RestDBContext _dbContext;
        CommonDal objCommon;
        public UserOrdersController(RestDBContext _dbContext)
        {
            this._dbContext = _dbContext;
            objCommon = new CommonDal(_dbContext);
        }


        [Route("SaveOrder")]
        [HttpPost]
        public Response Post([FromBody] UserOrders value)
        {
            try
            {
                var log = _dbContext.UserRegDal.Where(x => x.Id.ToString().Equals(value.UserId)).FirstOrDefault();
                UserOrdersDal objorders = new UserOrdersDal();
                objorders.OrderDate = value.order_date;

                Random rnd = new Random();
                int num = rnd.Next();
                string orderId = "order" + num.ToString();
                objorders.OrderId = orderId;
                if (log == null)
                {
                    objorders.UserId = "AdminUser";
                    objorders.UserName = "AdminUser";
                }
                else
                {
                    objorders.UserId = log.Id.ToString();
                    objorders.UserName = log.UserName;
                }
                int cnt = 1;
                foreach (var orderDetails in value.orderDetails)
                {
                    var objOrderDetails = new UserOrderDetailsDal
                    {
                        Id = orderId + "_" + cnt.ToString(),
                        ProductId = orderDetails.ProductId,
                        ProductName = orderDetails.ProductName,
                        Quantity = orderDetails.Quantity,
                        Price = orderDetails.Price,
                        OrderId = orderId
                    };
                    cnt++;

                    _dbContext.UserOrderDetailsDal.Add(objOrderDetails);
                    _dbContext.SaveChanges();
                }

                _dbContext.UserOrdersDal.Add(objorders);
                _dbContext.SaveChanges();
                return new Models.Response { Status = "Success", Message = "Order Placed successfully" };

            }
            catch (Exception ex)
            {
                return new Models.Response { Status = "Error", Message = "Something went wrong" };
            }
        }


        [Route("GetOrders")]
        [HttpPost]
        public IEnumerable<UserOrdersDal> GetOrders(string userId)
        {
            return _dbContext.UserOrdersDal.Where(x => x.UserId.Equals(userId));
        }

        [Route("GetAllOrders")]
        [HttpPost]
        public IEnumerable<UserOrdersDal> GetAllOrders()
        {
            return _dbContext.UserOrdersDal;
        }


        // GET api/<ProductController>/5
        [HttpGet("GetOrdersDetails/{distId}")]
        public IEnumerable<UserOrderDetailsDal> GetOrderDetails(string distId)
        {
            return _dbContext.UserOrderDetailsDal.Where(s => s.OrderId == distId);
        }

        [Route("GetMenu")]
        [HttpPost]
        public IEnumerable<MenuDal> GetMenu(string type, string category)
        {
            return _dbContext.MenuDal.Where(x => x.ItemType.Equals(type) && x.Category.Equals(category));
        }
    }
}
