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
