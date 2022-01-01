---
title: "Grpc"
date: 2021-12-30T11:14:06+09:00
---

* grpcチュートリアルメモ

* https://github.com/ymmt2005/grpc-tutorial


* Remote Procedure Call
    * リモートで呼び出しする手順
* gRPC
    * Googleで開発された多言語間のRPCを実現するプロトコル
    * 多言語対応であることが特徴
* IDL(interface definition langurage)
    * インターフェース記述言語
    * IDLコンパイラが変換してくれる
* gRPCではIDLにProtocol Buffersを採用
    * 学習コストが低い
* 通信プロトコルはHTTP/2
* ストリーム：不定長の連続したデータ
* リクエストチェーン全体にわたるタイムアウトやキャンセルをプロトコルレベルでサポート
    * マイクロサービスとかで利用

* 他のプロトコル
    * HTTP/REST API
        * OpenAPI
    * Graph QL

* vscode-proto3の拡張を入れると便利

## はじめてのgRPC実装


protoc, protp-gen-docのインストール
```sh
sudo apt install protobuf-compiler # aptで入れるとversionが古いので資料を参考に新しいものを入れる
curl -L -o protoc-gen-doc-1.4.1.linux-amd64.go1.15.2.tar.gz https://github.com/pseudomuto/protoc-gen-doc/releases/download/v1.4.1/protoc-gen-doc-1.4.1.linux-amd64.go1.15.2.tar.gz 
tar -xvf protoc-gen-doc-1.4.1.linux-amd64.go1.15.2.tar.gz
cd protoc-gen-doc-1.4.1.linux-amd64.go1.15.2/
sudo cp protoc-gen-doc /usr/bin/
```

```
curl -L https://github.com/protocolbuffers/protobuf/releases/download/v3.19.1/protoc-3.19.1-linux-x86_64.zip -O protoc-3.19.1-linux-x86_64.zip
unzip protoc-3.19.1-linux-x86_64.zip -d ~/protoc/
export PATH=$(pwd)/bin:$PATH
```

* ドキュメントの生成
```
protoc --doc_out=./doc --doc_opt=html,deepthought.html deepthought.proto
protoc --doc_out=./doc --doc_opt=markdown,deepthought.md deepthought.proto
```
