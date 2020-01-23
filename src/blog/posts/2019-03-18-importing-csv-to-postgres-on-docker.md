---
layout: post.pug
title: Importing CSV to Postgres on Docker
category: tech
excerpt: As painless as locally!
---

First, start postgres in Docker, we'll use a persistent volume just incase we want to drop and re-create the container.

```sh
## create volume
$ docker volume create pgdata

## run postgres
$ docker run --name postgres -d -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e PGDATA=/var/lib/postgresql/data/pgdata  -v pgdata:/var/lib/postgresql/data/pgdata postgres:latest
```

Asuming our CSV looks like this:

```csv
id,name,category
1,foo,bar
2,fizz,buzz
3,foobar,bar
```

Run psql and create a table for our data.

```sh
$ docker exec -it postgres psql -U postgres
```

```sql
create table t1 (
    id int,
    name citext,
    category citext
);
```

And finally, import the CSV by piping to STDIN.

```sh
$ cat data.csv | docker exec -i postgres psql -U postgres -c "copy t1 from stdin with (format csv, header true);"
COPY 3
```

Done!

```sh
$ docker exec -i postgres psql -U postgres -c "select * from t1"
 id |  name  | category
----+--------+----------
  1 | foo    | bar
  2 | fizz   | buzz
  3 | foobar | bar
(3 rows)
```
