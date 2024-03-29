using BackendRestapi.DAL;
using BackendRestapi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackendRestapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly RestDBContext _dbContext;
        CommonDal objCommon;
        public OrderController(RestDBContext _dbContext)
        {
            this._dbContext = _dbContext;
            objCommon = new CommonDal(_dbContext);
        }

        [Route("SaveOrder")]
        [HttpPost]
        public Response Post([FromBody] OrderRequest value)
        {
            try
            {
                OrdersDal objorders = new OrdersDal();
                objorders.OrderDate = value.order_date;
                objorders.SupplierId = value.supp_id;
                objorders.OrderStatus = value.order_status;

                var log = _dbContext.SupplierDal.Where(x => x.Id.ToString().Equals(value.supp_id)).FirstOrDefault();
                if (log != null)
                {
                    objorders.SupplierName = log.SupplierName.ToString();
                }
                Random rnd = new Random();
                int num = rnd.Next();
                string orderId = "order" + num.ToString();
                objorders.OrderId = orderId;
                int cnt = 1;
                foreach (var orderDetails in value.orderDetails)
                {
                    var objOrderDetails = new OrderDetailsDal
                    {
                        Id = orderId + "_" + cnt.ToString(),
                        ProductId = orderDetails.ProductId,
                        ProductName = orderDetails.ProductName,
                        Quantity = orderDetails.Quantity,
                        Price = orderDetails.Price,
                        OrderId = orderId
                    };
                    cnt++;

                    _dbContext.OrderDetailsDal.Add(objOrderDetails);
                    _dbContext.SaveChanges();
                }

                _dbContext.OrdersDal.Add(objorders);
                _dbContext.SaveChanges();
                return new Models.Response { Status = "Success", Message = "Orders added successfully" };

            }
            catch (Exception ex)
            {
                return new Models.Response { Status = "Error", Message = "Something went wrong" };
            }
        }


        [Route("GetOrders")]
        [HttpGet]
        public IEnumerable<OrdersDal> Get()
        {
            return _dbContext.OrdersDal;
        }

        // GET api/<ProductController>/5
        [HttpGet("GetOrdersById/{distId}")]
        public IEnumerable<OrdersDal> Get(int distId)
        {
            return _dbContext.OrdersDal.Where(s => s.SupplierId == distId.ToString());
        }

        // GET api/<ProductController>/5
        [HttpGet("GetOrdersDetails/{distId}")]
        public IEnumerable<OrderDetailsDal> GetOrderDetails(string distId)
        {
            return _dbContext.OrderDetailsDal.Where(s => s.OrderId == distId);
        }

        [Route("updateOrder")]
        [HttpPost]
        public Response UpdateOrder(string id)
        {
            try
            {
                var order = _dbContext.OrdersDal.FirstOrDefault(s => s.OrderId == id);
                if (order != null)
                {

                    var objOrderDetails = _dbContext.OrderDetailsDal.Where(s => s.OrderId == id).ToList();

                    order.OrderStatus = "Complete";
                    _dbContext.Entry<OrdersDal>(order).CurrentValues.SetValues(order);
                    _dbContext.SaveChanges();

                    return new Models.Response { Status = "Success", Message = "Order updated successfully" };
                }
                else
                    return new Models.Response { Status = "Error", Message = "Order Id Not found" };

            }
            catch (Exception ex)
            {
                return new Models.Response { Status = "Error", Message = "Something went wrong" };
            }
        }

        [Route("rejectOrder")]
        [HttpPost]
        public Response rejectOrder(string id)
        {
            try
            {
                var order = _dbContext.OrdersDal.FirstOrDefault(s => s.OrderId == id);
                if (order != null)
                {
                    order.OrderStatus = "Reject";
                    _dbContext.Entry<OrdersDal>(order).CurrentValues.SetValues(order);
                    _dbContext.SaveChanges();

                    return new Models.Response { Status = "Success", Message = "Order updated successfully" };
                }
                else
                    return new Models.Response { Status = "Error", Message = "Order Id Not found" };

            }
            catch (Exception ex)
            {
                return new Models.Response { Status = "Error", Message = "Something went wrong" };
            }
        }
    }
}
