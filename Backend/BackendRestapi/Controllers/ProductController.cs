using BackendRestapi.DAL;
using BackendRestapi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackendRestapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
            private readonly RestDBContext _dbContext;
            CommonDal objCommon;
            public ProductController(RestDBContext _dbContext)
            {
                this._dbContext = _dbContext;
                objCommon = new CommonDal(_dbContext);
            }

            [Route("Add")]
            [HttpPost]
            public Models.Response Add([FromBody] Product value)
            {
                try
                {
                    var log = _dbContext.ProductDal.Where(x => x.ProductName.Equals(value.ProductName)).FirstOrDefault();

                    ProductDal objReg = new ProductDal();
                    objReg.ProductName = value.ProductName;
                    objReg.Price = value.Price;
                    objReg.SupplierId = value.SupplierId;
                    objReg.Status = "Active";
                    if (log == null)
                    {
                        _dbContext.ProductDal.Add(objReg);
                        _dbContext.SaveChanges();
                        return new Models.Response { Status = "Succuss", Message = "Product Added successfully" };
                    }
                    else
                    {
                        return new Models.Response { Status = "Exist", Message = "Product is already exist" };
                    }

                }
                catch (Exception ex)
                {
                    objCommon.ErrorLog("Product", "Add", ex.Message.ToString());
                    return new Models.Response { Status = "Error", Message = "Something Went Wrongs" };
                }

            }

            // GET api/<ProductController>/5
            [HttpGet("GetProductByDid/{Did}")]
            public IEnumerable<ProductDal> GetProduct(int Did)
            {
                return _dbContext.ProductDal.Where(s => s.SupplierId == Did.ToString());
            }

            [Route("DeleteProduct")]
            [HttpPost]
            public Response Delete(int distId)
            {
                var objData = _dbContext.ProductDal.FirstOrDefault(s => s.Id == distId);
                if (objData != null)
                {
                    objData.Status = "Inactive";
                    _dbContext.Entry<ProductDal>(objData).CurrentValues.SetValues(objData);
                    _dbContext.SaveChanges();
                    return new Models.Response { Status = "Success", Message = "Product deleted successfully" };
                }
                else
                    return new Models.Response { Status = "Error", Message = "Product Id Not found" };
            }


            // GET api/<ProductController>/5
            [HttpGet("GetProductById/{productId}")]
            public ProductDal Get(int productId)
            {
                return _dbContext.ProductDal.FirstOrDefault(s => s.Id == productId);
            }
        }
}
