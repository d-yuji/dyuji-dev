---
title: "Docker×Goのマルチステージビルドで必要になるcgoのオプションについて"
date: 2022-05-04T23:51:56+09:00
draft: true
---

## Docker×Goのマルチステージビルドで必要になるcgoのオプションについて
* CGO_ENABLED=0を設定しないと動かない

* CGO_ENABLEDは環境変数
* クロスコンパイルするときは明示的に0を指定する
* CGO_ENABLED=1のときになぜ上手く動かないか
    * standard pkgの場所が違う
    * go buildの動的リンクと静的リンク
* こういう知識がどういうときに必要になるか→Dockerimageの軽量化
    * 軽量化は奥が深い


```dockerfile
FROM golang:1.18 as builder

WORKDIR /go/src/

COPY . ./
RUN go mod download

RUN CGO_ENABLED=0 GOOS=linux go build -v -o server ./cmd

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /go/src/server ./

EXPOSE 8080
CMD ["./server"]

```
Goの環境変数について

https://pkg.go.dev/cmd/go#hdr-Environment_variables


https://christina04.hatenablog.com/entry/installsuffix-cgo-is-no-longer-required

Docker imageのgo env
```
GO111MODULE=""
GOARCH="amd64"
GOBIN=""
GOCACHE="/root/.cache/go-build"
GOENV="/root/.config/go/env"
GOEXE=""
GOEXPERIMENT=""
GOFLAGS=""
GOHOSTARCH="amd64"
GOHOSTOS="linux"
GOINSECURE=""
GOMODCACHE="/go/pkg/mod"
GONOPROXY=""
GONOSUMDB=""
GOOS="linux"
GOPATH="/go"
GOPRIVATE=""
GOPROXY="https://proxy.golang.org,direct"
GOROOT="/usr/local/go"
GOSUMDB="sum.golang.org"
GOTMPDIR=""
GOTOOLDIR="/usr/local/go/pkg/tool/linux_amd64"
GOVCS=""
GOVERSION="go1.18.1"
GCCGO="gccgo"
GOAMD64="v1"
AR="ar"
CC="gcc"
CXX="g++"
CGO_ENABLED="1"
GOMOD="/dev/null"
GOWORK=""
CGO_CFLAGS="-g -O2"
CGO_CPPFLAGS=""
CGO_CXXFLAGS="-g -O2"
CGO_FFLAGS="-g -O2"
CGO_LDFLAGS="-g -O2"
PKG_CONFIG="pkg-config"
GOGCCFLAGS="-fPIC -m64 -pthread -fmessage-length=0 -fdebug-prefix-map=/tmp/go-build1287595694=/tmp/go-build -gno-record-gcc-switches"

```
https://megamorf.gitlab.io/2019/09/08/alpine-go-builds-with-cgo-enabled/

CGO_ENABLEDは環境変数
クロスコンパイルするときは明示的に0を指定する
CGO_ENABLED=1のときになぜ上手く動かないか
    standard pkgの場所が違う
    動的リンクと静的リンク

https://wa3.i-3-i.info/word14695.html

https://blog.icttoracon.net/2020/11/02/%E3%81%BE%E3%81%9F%E3%83%93%E3%83%AB%E3%83%89%E5%A4%B1%E6%95%97%E3%81%97%E3%81%A1%E3%82%83%E3%81%A3%E3%81%9F%EF%BD%9E/


https://blog.potproject.net/2019/05/29/golang-docker-image-bin

