---
title: "URL Encode"
date: 2021-12-26T11:15:29+09:00

---


* net/urlパッケージのURLエンコードは2種類
* url.QueryEscape()
    * スペースが+になる
* url.PathEscape()
    * スペースが%20になる

[こちらに詳しい URI エンコーディングについて](https://text.baldanders.info/golang/uri-encoding/)

* url.EncodeではQueryEscapeの方が使われているため、URLの+を変換したいときは正規表現を用いる

[こちらに詳しい](https://cipepser.hatenablog.com/entry/2017/07/29/083729)
