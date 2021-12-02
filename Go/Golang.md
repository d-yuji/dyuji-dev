# Golang memo

## 他の言語からすると紛らわしい単語
* map
  * Goでは辞書型
* interface


## go
* 環境変数の場所を間違えない
* 基本wslで書いて検証したとしても、vscodeの補完に使うgoのライブラリたちはwindows本体側を参照しているのでちゃんと設定する

## switch と select
見た目が似てるけど、違う用途

``` go
//条件分岐
switch n {
case 1:
    fmt.Println("1")
case 2,3:
    fmt.Println("2 or 3")
default:
    fmt.Println("other")
}

// 条件部分を省略した書き方もできる
switch {
case n == 1:
    fmt.Println("1")
case n == 2 || n == 3:
    fmt.Println("2 or 3")
default:
    fmt.Println("other")
}

// channelの授受の分岐
select {
case v1 := <-ch1:
    fmt.Println(v1)
case v2 := <-ch2:
    fmt.Println(v2)
}


```

### ex 1.1

``` go

```
