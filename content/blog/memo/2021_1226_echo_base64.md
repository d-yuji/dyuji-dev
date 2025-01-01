---
title: "echoとbase64"
date: 2021-12-26T11:15:29+09:00

---

* echoコマンドはデフォルトでは改行文字が含まれるため、暗号化時などに気をつける
    * これが原因でmysqlのdsnでエラーが発生した
* 改行なしオプションは-n

**例**

```sh
## 改行あり
echo "hogehoge" | base64
> aG9nZWhvZ2UK
```

```sh
## 改行なし
echo -n "hogehoge" | base64
> aG9nZWhvZ2U=
```


