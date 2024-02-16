using BackendRestapi.DAL;
using BackendRestapi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackendRestapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private readonly RestDBContext _dbContext;
        CommonDal objCommon;
        public MenuController(RestDBContext _dbContext)
        {
            this._dbContext = _dbContext;
            objCommon = new CommonDal(_dbContext);
        }

        [Route("Add")]
        [HttpPost]
        public Models.Response Add([FromBody] Menu value)
        {
            try
            {
                var log = _dbContext.MenuDal.Where(x => x.MenuName.Equals(value.MenuName)).FirstOrDefault();

                MenuDal objReg = new MenuDal();
                objReg.MenuName = value.MenuName;
                objReg.ItemType = value.ItemType;
                objReg.Category = value.Category;
                objReg.Price = value.Price;
                if (log == null)
                {
                    _dbContext.MenuDal.Add(objReg);
                    _dbContext.SaveChanges();
                    return new Models.Response { Status = "Succuss", Message = "Menu Item Added successfully" };
                }
                else
                {
                    return new Models.Response { Status = "Exist", Message = "Menu Item is already exist" };
                }

            }
            catch (Exception ex)
            {
                objCommon.ErrorLog("Menu", "Add", ex.Message.ToString());
                return new Models.Response { Status = "Error", Message = "Something Went Wrongs" };
            }

        }

        [HttpGet("GetById/{distId}")]
        public MenuDal Get(int distId)
        {
            return _dbContext.MenuDal.FirstOrDefault(s => s.Id.ToString() == distId.ToString());
        }

        [Route("UpdateData")]
        [HttpPost]
        public Response Put([FromBody] Menu value)
        {
            var MenuData = _dbContext.MenuDal.FirstOrDefault(s => s.Id.ToString() == value.Id.ToString());
            if (MenuData != null)
            {
                _dbContext.Entry<MenuDal>(MenuData).CurrentValues.SetValues(value);
                _dbContext.SaveChanges();
                return new Models.Response { Status = "Success", Message = "Menu updated successfully" };
            }
            else
                return new Models.Response { Status = "Error", Message = "Menu Id Not found" };
        }
    }
}
