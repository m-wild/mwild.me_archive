---
layout: post.pug
title: SQL Snippets
category: tech
excerpt: Useful(?) SQL snippets for MSSQL
comments: true
---

Snippets for quickly creating/backup/dropping dbs. All should be run on `master`.

Create a database
```sql
create database <db_name>
    on primary ( name = '<db_name>', filename = 'g:\.db\<db_name>.mdf' )
    log on ( name = '<db_name>_log', filename = 'g:\.db\<db_name>_log.ldf' );
```

Backup a database
```sql
backup database <db_name>
    to disk = 'g:\.db\backups\<db_name>_<date>.bak'
```

Restore a backup
```sql
restore database <db_name>
    from disk = 'g:\.db\backups\<db_name>_<date>.bak'
    with replace; -- overwrite existing mdf
```

Drop a database
```sql
alter database <db_name> set single_user with rollback immediate;
drop database <db_name>;
```

Detach a database
```sql
alter database <db_name> set offline with rollback immediate;
execute sp_detach_db '<db_name>';
```

Attach a database
```sql
execute sp_attach_db 
	@dbname = '<db_name>',
	@filename1 = 'g:\.db\<db_name>.mdf', 
	@filename2 = 'g:\.db\<db_name>_log.ldf'
```
