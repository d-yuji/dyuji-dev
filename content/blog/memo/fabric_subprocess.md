---
title: "Fabric_subprocess"
date: 2022-03-03T01:45:02+09:00
---

## Python2で使うfabricとsubprocessはエラーハンドリングに気をつける


* [Fabric](https://fabric-ja.readthedocs.io/ja/latest/tutorial.html)は、アプリケーションのデプロイやシステム管理のタスクのためにSSHの利用を簡素化するためのPython2系のライブラリとコマンドラインのツール

* fab {method}でコマンドラインスクリプトで呼び出しができる

* Pythonの[subprocess](https://docs.python.org/ja/3/library/subprocess.html)はサブプロセスを起動するためのモジュール。python内からコマンド実行するのに使う

* この2つの組み合わせでのエラーハンドリングには気をつける

fab_test.py
```py
from fabric.api import local

def hello():
    local("exit 1")
```

cmd.py
```py
import subprocess

def main():
    subprocess.call("fab hello", shell=True)

main()
```

* fab hello で実行して echo $?で確認すると1になる
* python cmd.py で実行して echo $?で確認すると0になる
* subprocess.callっがエラーハンドリングに対応してない。
* 代わりにsubprocess.check_callを使う
* fabricの1系がpython2系の対応のためsubprocess.runが使えないのでエラーハンドリングが異なることに注意
    * 特にデプロイ周りのエラーで注意する
