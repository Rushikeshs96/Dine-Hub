using BackendRestapi.DAL;
using BackendRestapi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackendRestapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly RestDBContext _dbContext;
        CommonDal objCommon;
        public UserController(RestDBContext _dbContext)
        {
            this._dbContext = _dbContext;
            objCommon = new CommonDal(_dbContext);
        }

        [Route("Register")]
        [HttpPost]
        public Models.Response Register([FromBody] UserReg value)
        {
            try
            {
                var log = _dbContext.UserRegDal.Where(x => x.EmailId.Equals(value.EmailId)).FirstOrDefault();

                UserRegDal objReg = new UserRegDal();
                objReg.UserName = value.UserName;
                objReg.Password = value.Password;
                objReg.UserAddress = value.UserAddress;
                objReg.ContactNo = value.ContactNo;
                objReg.EmailId = value.EmailId;

                if (log == null)
                {
                    _dbContext.UserRegDal.Add(objReg);
                    _dbContext.SaveChanges();
                    return new Models.Response { Status = "Succuss", Message = "User Register Succesfully" };
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


        [Route("Login")]
        [HttpPost]
        public Models.Response Login([FromBody] UserReg value)
        {
            try
            {
                var log = _dbContext.UserRegDal.Where(x => x.EmailId.Equals(value.EmailId) && x.Password.Equals(value.Password)).FirstOrDefault();
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
                objCommon.ErrorLog("User", "Login", ex.Message.ToString());
                return new Models.Response { Status = "Error", Message = "Something Went Wrongs" };
            }

        }

        [Route("Booking")]
        [HttpPost]
        public Models.Response Booking([FromBody] Booking value)
        {
            try
            {
                var log = _dbContext.UserRegDal.Where(x => x.Id.ToString().Equals(value.UserId)).FirstOrDefault();

                BookingDal objReg = new BookingDal();
                objReg.UserId = value.UserId;
                objReg.UserName = log.UserName;
                objReg.BookingDate = value.BookingDate;
                objReg.BookingTime = value.BookingTime;
                objReg.TotalMembers = value.TotalMembers;

                _dbContext.BookingDal.Add(objReg);
                _dbContext.SaveChanges();
                return new Models.Response { Status = "Succuss", Message = "Booking Successful" };
            }
            catch (Exception ex)
            {
                objCommon.ErrorLog("User", "Register", ex.Message.ToString());
                return new Models.Response { Status = "Error", Message = "Something Went Wrongs" };
            }

        }

        [Route("GetBookings")]
        [HttpGet]
        public IEnumerable<BookingDal> GetMenu()
        {
            return _dbContext.BookingDal;
        }

        [HttpGet("GetById/{distId}")]
        public UserRegDal Get(int distId)
        {
            return _dbContext.UserRegDal.FirstOrDefault(s => s.Id.ToString() == distId.ToString());
        }

        [Route("UpdateData")]
        [HttpPost]
        public Response Put([FromBody] UserReg value)
        {
            var data = _dbContext.UserRegDal.FirstOrDefault(s => s.Id.ToString() == value.Id.ToString());
            if (data != null)
            {
                _dbContext.Entry<UserRegDal>(data).CurrentValues.SetValues(value);
                _dbContext.SaveChanges();
                return new Models.Response { Status = "Success", Message = "Profile updated successfully" };
            }
            else
                return new Models.Response { Status = "Error", Message = "User Id Not found" };
        }
    }
}
