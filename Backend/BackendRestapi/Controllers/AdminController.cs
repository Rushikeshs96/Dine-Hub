using BackendRestapi.DAL;
using BackendRestapi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackendRestapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly RestDBContext _dbContext;
        CommonDal objCommon;

        public AdminController(RestDBContext _dbContext)
        {
            this._dbContext = _dbContext;
            objCommon = new CommonDal(_dbContext);
        }

        [Route("ALogin")]
        [HttpPost]
        public Models.Response Login([FromBody] UserReg value)
        {
            try
            {
                var log = _dbContext.AdminLoginDal.Where(x => x.UserName.Equals(value.UserName) && x.Password.Equals(value.Password)).FirstOrDefault();
                if (log != null)
                {
                    return new Models.Response { Status = log.Role, Message = "User login successfully" };
                }
                else
                {
                    return new Models.Response { Status = "Exist", Message = "Login Failed" };
                }

            }
            catch (Exception ex)
            {
                objCommon.ErrorLog("User", "Login", ex.Message.ToString());
                return new Models.Response { Status = "Error", Message = "Something Went Wrongs" };
            }

        }

        [Route("AddStaff")]
        [HttpPost]
        public Models.Response AddStaff([FromBody] AdminLogin value)
        {
            try
            {
                var log = _dbContext.AdminLoginDal.Where(x => x.UserName.Equals(value.UserName)).FirstOrDefault();

                AdminLoginDal objReg = new AdminLoginDal();
                objReg.UserName = value.UserName;
                objReg.Password = value.Password;
                objReg.Role = value.Role;
                if (log == null)
                {
                    _dbContext.AdminLoginDal.Add(objReg);
                    _dbContext.SaveChanges();
                    return new Models.Response { Status = "Succuss", Message = "User registered successfully" };
                }
                else
                {
                    return new Models.Response { Status = "Exist", Message = "User is already exist" };
                }

            }
            catch (Exception ex)
            {
                objCommon.ErrorLog("User", "Register", ex.Message.ToString());
                return new Models.Response { Status = "Error", Message = "Something Went Wrongs" };
            }

        }

        [Route("GetStaff")]
        [HttpGet]
        public IEnumerable<AdminLoginDal> GetStaff()
        {
            return _dbContext.AdminLoginDal.Where(s => s.Role.Equals("User") || s.Role.Equals("Staff"));
        }

        [Route("GetCustomers")]
        [HttpGet]
        public IEnumerable<UserRegDal> GetCustomers()
        {
            return _dbContext.UserRegDal;
        }

        [Route("GetSuppliers")]
        [HttpGet]
        public IEnumerable<SupplierDal> GetSuppliers()
        {
            return _dbContext.SupplierDal;
        }

        [Route("GetMenu")]
        [HttpGet]
        public IEnumerable<MenuDal> GetMenu()
        {
            return _dbContext.MenuDal;
        }
    }
}
