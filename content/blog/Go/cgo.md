---
title: "Docker×Goのマルチステージビルドで必要になるcgoのオプションについて"
date: 2022-05-04T23:51:56+09:00
---

## Docker×Goのマルチステージビルドで必要になるcgoのオプションについて

### 背景
* Dockerfileでマルチステージビルドの構築をしていたが、DockerImageのビルドに成功するも、docker runでエラーが出て動かなかった

```dockerfile
FROM golang:1.18 as builder

WORKDIR /go/src/

COPY . ./
RUN go mod download

RUN go build -v -o server ./cmd

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /go/src/server ./

EXPOSE 8080
CMD ["./server"]

```

エラーメッセージ
```
standard_init_linux.go:211: exec user process caused "no such file or directory"
```

### 対策
* go envの環境変数CGO_ENABLED=0を設定しないとランタイムエラーになるので設定する

``` dockerfile
# 誤
RUN go build -v -o server ./cmd

# 正
RUN CGO_ENABLED=0 GOOS=linux  go build -v -o server ./cmd

```

### なぜ設定が必要なのか？
* CGO_ENABLEDは環境変数で、デフォルトが1になっている
* バイナリのサイズを小さく、かつ高速化するためにcgoを使ったモジュールはOS側にあるC/C++ライブラリを使う(動的リンク)設定でビルドされる
* クロスコンパイルするときは明示的に0を指定する

#### CGO_ENABLED=1のときになぜ上手く動かないか
* golangで書いたプログラムをgo buildすると、基本的には静的リンクになるがnetパッケージを使用していた場合、自動的に動的リンクになる
* これはnetパッケージがC版とGo版の2種があってデフォルトでは高速なC版が使われる
* このように動的リンクでビルドした場合、alpine linuxだとstandard pkgの場所が違う(パッケージが存在しない)問題が発生する
* よって正しくシングルバイナリにするときには CGO_ENABLED=0が必要。ただ、バイナリのサイズ(Dockerimageのサイズ)が大きくなる

### 参考文献

[Go -Environment variables](https://pkg.go.dev/cmd/go#hdr-Environment_variables)


[cgoを使わないGoのクロスコンパイル時に -installsuffix cgo が不要になってた -Carpe Diem](https://christina04.hatenablog.com/entry/installsuffix-cgo-is-no-longer-required)


[Alpine go builds with cgo enabled -Seb's IT blog](https://megamorf.gitlab.io/2019/09/08/alpine-go-builds-with-cgo-enabled/)


[スタティックリンク -「分かりそう」で「分からない」でも「分かった」気になれるIT用語辞典](https://wa3.i-3-i.info/word14695.html)


[またビルド失敗しちゃった～… -ICTSC Tech blog](https://blog.icttoracon.net/2020/11/02/%E3%81%BE%E3%81%9F%E3%83%93%E3%83%AB%E3%83%89%E5%A4%B1%E6%95%97%E3%81%97%E3%81%A1%E3%82%83%E3%81%A3%E3%81%9F%EF%BD%9E/)


[Golangのシングルバイナリをいい感じでDocker Image化する -blog.potproject.net](https://blog.potproject.net/2019/05/29/golang-docker-image-bin)


[【Golang】"net" モジュールを使った静的リンクバイナリを Docker + scratch で使う際のビルドの注意【"net/http" "net/url" など】 -Qiita](https://qiita.com/KEINOS/items/739f83cb9ddfed43404b)
