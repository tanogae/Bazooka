﻿namespace DataAccess.Write
{
    public class RemoteScriptTask
    {
        public virtual  int Id { get; set; }

        public virtual string Script { get; set; }

        public virtual string Machine { get; set; }

        public virtual string Name { get; set; }

        public virtual string Folder { get; set; }

        public virtual int EnviromentId { get; set; }
    }
}
