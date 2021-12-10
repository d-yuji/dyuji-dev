# mysqlのkey index

* describeはテーブル情報を出すが、複合キーの場合keyのカラムが1つのみmulになる
* indexを全て確認する際はshow indexを使う


```sql
describe table_name;
```

```sql
show index from table_name;
```

例
```sql 
create table books(book_id int, name varchar(255), author varchar(255), publication_date datetime);
```

```sql
mysql> alter table books add index book_index(name,author);
```

```
mysql> describe books;
+------------------+--------------+------+-----+---------+-------+
| Field            | Type         | Null | Key | Default | Extra |
+------------------+--------------+------+-----+---------+-------+
| book_id          | int          | NO   | PRI | NULL    |       |
| name             | varchar(255) | YES  | MUL | NULL    |       |
| author           | varchar(255) | YES  |     | NULL    |       |
| publication_date | datetime     | YES  |     | NULL    |       |
+------------------+--------------+------+-----+---------+-------+
4 rows in set (0.00 sec)
```

```
mysql> show index from books;
+-------+------------+------------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+---------+------------+
| Table | Non_unique | Key_name   | Seq_in_index | Column_name | Collation | Cardinality | Sub_part | Packed | Null | Index_type | Comment | Index_comment | Visible | Expression |
+-------+------------+------------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+---------+------------+
| books |          0 | PRIMARY    |            1 | book_id     | A         |           0 |     NULL |   NULL |      | BTREE      |         |               | YES     | NULL       |
| books |          1 | book_index |            1 | name        | A         |           0 |     NULL |   NULL | YES  | BTREE      |         |               | YES     | NULL       |
| books |          1 | book_index |            2 | author      | A         |           0 |     NULL |   NULL | YES  | BTREE      |         |               | YES     | NULL       |
+-------+------------+------------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+---------+------------+
3 rows in set (0.00 sec)
```

