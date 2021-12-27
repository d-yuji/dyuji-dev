---
title: "go testをDockerfileで実施する"
date: 2021-12-26T11:15:29+09:00

---

* gorm v2がgo v1.14以降じゃないとビルドできない
* Jenkinsサーバーがgo v1.12でgo testのときにエラーがでる
* docker imageのビルドの時にgo imageでgo testがしたいができるのか?
    * テストが落ちたらビルドも止まるか


### 試作コード
**cmd/main.go**
```go
package main

import (
	"docker-gotest/service"
	"fmt"
)

func main() {
	_ = service.Add(1, 2)
	fmt.Println("Hello World")
}

```

**service/calc.go**
```go
package service

func Add(a int, b int) int {
	return a + b
}

```

**service/calc_test.go**
```go
package service

import "testing"

func Test_Add(t *testing.T) {
	result := Add(1, 2)
	if result != 3 {
		t.Errorf("Error")
	}
}

```


**Dockerfile**
```Dockerfile
FROM golang:1.14.4 as builder

WORKDIR /go/src

COPY . ./
RUN go test ./...

ARG CGO_ENABLED=0
ARG GOOS=linux
ARG GOARCH=amd64
RUN go build -o /go/bin/main -ldflags '-s -w' cmd/main.go

FROM scratch as runner

COPY --from=builder /go/bin/main /app/main

ENTRYPOINT ["/app/main"]
```

### 結果
* テストも動いて失敗したら止まることを確認
* テストが通ればビルドに進む
* テストのログは出力される

### 感想
* あれこれぐぐるより作って動かしたほうが早いときもある
