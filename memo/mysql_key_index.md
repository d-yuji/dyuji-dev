# mysqlのkey index

* describeはテーブル情報を出すが、複合キーの場合keyのカラムが1つのみmulになる
* indexを全て確認する際はshow indexを使う

```sql
describe table_name;
```

```sql
show index from table_name;
```
