using BackendRestapi.DAL;
using BackendRestapi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackendRestapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupplierController : ControllerBase
    {
        private readonly RestDBContext _dbContext;
        CommonDal objCommon;
        public SupplierController(RestDBContext _dbContext)
        {
            this._dbContext = _dbContext;
            objCommon = new CommonDal(_dbContext);
        }

        [Route("Register")]
        [HttpPost]
        public Models.Response Register([FromBody] Supplier value)
        {
            try
            {
                var log = _dbContext.SupplierDal.Where(x => x.EmailId.Equals(value.EmailId)).FirstOrDefault();

                SupplierDal objReg = new SupplierDal();
                objReg.SupplierName = value.SupplierName;
                objReg.SuppAddress = value.SuppAddress;
                objReg.Password = value.Password;
                objReg.GSTNo = value.GSTNo;
                objReg.ContactNo = value.ContactNo;
                objReg.EmailId = value.EmailId;
                if (log == null)
                {
                    _dbContext.SupplierDal.Add(objReg);
                    _dbContext.SaveChanges();
                    return new Models.Response { Status = "Succuss", Message = "Supplier registered successfully" };
                }
                else
                {
                    return new Models.Response { Status = "Exist", Message = "Supplier is already exist" };
                }

            }
            catch (Exception ex)
            {
                objCommon.ErrorLog("Supplier", "Register", ex.Message.ToString());
                return new Models.Response { Status = "Error", Message = "Something Went Wrongs" };
            }

        }

        [Route("Login")]
        [HttpPost]
        public Models.Response Login([FromBody] Supplier value)
        {
            try
            {
                var log = _dbContext.SupplierDal.Where(x => x.EmailId.Equals(value.EmailId) && x.Password.Equals(value.Password)).FirstOrDefault();
                if (log != null)
                {
                    return new Models.Response { Status = "Succuss", Message = log.Id.ToString() };
                }
                else
                {
                    return new Models.Response { Status = "Exist", Message = "Login Failed" };
                }

            }
            catch (Exception ex)
            {
                objCommon.ErrorLog("Supplier", "Login", ex.Message.ToString());
                return new Models.Response { Status = "Error", Message = "Something Went Wrongs" };
            }

        }

        [HttpGet("GetById/{distId}")]
        public SupplierDal Get(int distId)
        {
            return _dbContext.SupplierDal.FirstOrDefault(s => s.Id.ToString() == distId.ToString());
        }

        [Route("UpdateData")]
        [HttpPost]
        public Response Put([FromBody] Supplier value)
        {
            var SuppData = _dbContext.SupplierDal.FirstOrDefault(s => s.Id.ToString() == value.Id.ToString());
            if (SuppData != null)
            {
                _dbContext.Entry<SupplierDal>(SuppData).CurrentValues.SetValues(value);
                _dbContext.SaveChanges();
                return new Models.Response { Status = "Success", Message = "Supplier updated successfully" };
            }
            else
                return new Models.Response { Status = "Error", Message = "Supplier Id Not found" };
        }

        [HttpGet("GetProducts/{distId}")]
        public IEnumerable<ProductDal> GetProducts(int distId)
        {
            return _dbContext.ProductDal.Where(s => s.SupplierId.Equals(distId.ToString()));
        }
    }
}
