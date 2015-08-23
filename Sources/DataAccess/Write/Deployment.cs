﻿using System;

namespace DataAccess.Write
{
    public class Deployment
    {
        public virtual int Id { get; set; }

        public virtual int EnviromentId { get; set; }

        public virtual DateTime? StartDate { get; set; }

        public virtual DateTime? EndDate { get; set; }

        public virtual Status Status { get; set; }

        public virtual string Version { get; set; }

        public virtual string UserId { get; set; }

        public virtual bool Scheduled { get; set; }
    }

    public enum Status
    {
        Queud = 0,

        Running = 1,

        Ended = 2,

        Failed = 3,

        Scheduled = 4,

        Canceled = 5
    }
}