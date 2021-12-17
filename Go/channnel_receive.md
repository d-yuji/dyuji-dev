# チャネルの受信とClose

* チャネルはCloseしたら0値を返すので、受信側がCloseかどうかは第二引数をとって判別する


```go
package main

import (
	"fmt"
	"time"
)

func A(ch chan int) {
	for {
		select {
		case v, ok := <-ch:
			fmt.Println(v, ok)
		}
	}
}

func main() {
	ch := make(chan int, 10)
	go A(ch)
	for i := 1; i <= 5; i++ {
		ch <- i
	}
	close(ch)
	time.Sleep(100 * time.Microsecond)
}

```

結果
```
1 true
2 true
3 true
4 true
5 true
0 false
0 false
0 false
0 false
0 false
0 false
0 false
0 false
0 false
0 false
0 false
0 false
0 false
0 false
0 false
0 false
以下略
```

### 参考
* [Go の channel 処理パターン集](https://hori-ryota.com/blog/golang-channel-pattern/)
