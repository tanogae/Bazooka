﻿using DataAccess.Read;
using System.Collections;
using System.Linq;
using System.Web.Http;
using Microsoft.AspNet.Identity;

namespace Web.Controllers
{
    public class StatusController : ApiController
    {
        private ReadContext db = new ReadContext();


        public ICollection Get()
        {
            var id = User.Identity.GetUserId();

            return db.DeploTasks
                     .GroupBy(x => x.ApplicationName, (key, ele) => new
            {
                Application = key,
                Enviroments = ele.GroupBy(z => z.EnviromentName, (envKey, ele2) => new
                {
                    Enviroment = envKey,
                    Name = key,
                    Configuration = envKey,
                    Id = ele2.FirstOrDefault().EnviromentId,
                    Versions = ele2.Select(y => new
                    {
                        y.Name,
                        y.CurrentlyDeployedVersion
                    }).ToList()
                }).ToList()
            }).ToList();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}