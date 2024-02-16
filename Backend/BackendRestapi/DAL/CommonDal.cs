using BackendRestapi.Models;
using Microsoft.AspNetCore.Mvc;

namespace BackendRestapi.DAL
{
   
    public class CommonDal : RestDBContext
    {

        private readonly RestDBContext _context;

        public CommonDal(RestDBContext context)
        {
            _context = context;
        }
        public void ErrorLog(string controllerName,string methodName, string errorMsg)
        {
            ErrorLogDal objError = new ErrorLogDal();

            objError.Controller_Name = controllerName;
            objError.Error_Msg = errorMsg;
            objError.DateTime = DateTime.Now.ToString();
            objError.MethodName = methodName;
            _context.ErrorLogDal.Add(objError);
            _context.SaveChanges();

        }

    }
}
