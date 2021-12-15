# Terraform 勉強


## Introduction to Infrastructure as Code with Terraform

* Infrastructure as Code(IaC)
* Terraformはproviderと呼ばれるTerraformプラグインでAPIを呼び出し、インフラの操作をする
    * AWS GCP Azureなど有名なもののproviderは作成されている
    * 独自でproviderを作成することも可能
* providerがインフラの要素をresourceとして定義
    * インスタンスやネットワークなど
* 様々なproviderのリソースをmoduleに構成
* moduleは再利用可能なTerraformの構成
* Terraformは宣言型
    * インフラの最終状態を記述し、Terraform providerが自動で計算

* Terraformでインフラ展開の流れ
    * Scope 適用範囲の把握
    * Author 構成の記述
    * Initialize 必要プラグインのインストール
    * Plan 変更のプレビュー
    * Apply 変更の実施

* State file
    * インフラの状態を追跡するためのソース
    * これの状態を見て、宣言した構成と合うよう変更を加える

* Terraform Cloud
    * Gitと繋いで自動的に構成の提案したり、実行環境を用意して構成変更の競合を防いだりする

## Install Terraform
* 内容をコピペして動く

### Quick start tutorial
* nginxのdocker image作成

```
terraform init
terraform plan
terraform apply
terraform destroy
```

## Build Infrastructure

* GCPのアカウント作成
* サービスアカウント作成

* terraform ブロック
    * インフラストラクチャのプロビジョニング(準備)に必要な設定を書く
        * provider名
        * providerのソース
            * 大体公式のprovider名を指定
        * バージョン指定がない場合は最新のを用いる

```tf
terraform {
  required_providers {
    google = {
      source = "hashicorp/google" // 指定しないときデフォルトでhashicorpのレジストリを見に行く
      version = "3.5.0" // バージョン指定がない時は最新のものを利用する
    }
  }
}
```

* provider ブロック
    * 指定したproviderの各環境に接続する設定などを記載

```
provider "google" {
  credentials = file("credential.json")

  project = "project-name"
  region  = "us-central1"
  zone    = "us-central1-c"
}

```
