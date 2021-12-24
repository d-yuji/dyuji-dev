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

```tf
provider "google" {
  credentials = file("credential.json")

  project = "project-name"
  region  = "us-central1"
  zone    = "us-central1-c"
}

```

* ロックファイル(.lock.hcl)
    * すべてのTerraform実行に一貫性を持たせるために使用される正確なprovider versionを指定

```
terraform fmt : フォーマットチェック
terraform validate : 構文チェック
```

* メモ：GCPアカウントを作りたてだとComputeEngineAPIが有効化されていないので有効化する
* サービスアカウントの権限が足りないときは IMAと管理/IAM でプリンシパルを編集する

* terraform show // 現在の状態を表示

https://github.com/github/gitignore/blob/main/Terraform.gitignore


## Change Infrastructure
* 実運用するときはバージョン管理を使うことを勧める

### Create New resource

* VMインスタンス作成の定義
* (Resource Type).(Reference name).(field)
* Terraform はリソースの依存関係グラフを作成して適切な順序で作成されるよう制御
* access_configブロックが存在すると引数がなくてもVMに外部IPが与えられれインターネット経由でアクセスできる
    * こういう仕様はちゃんとドキュメントを読む

```tf
resource "google_compute_instance" "vm_instance" {
  name         = "terraform-instance"
  machine_type = "f1-micro"

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-9"
    }
  }

  network_interface {
    network = google_compute_network.vpc_network.name
    access_config {
    }
  }
}

```

* tags - (Optional) インスタンスにつけるネットワークタグのリスト
* ネットワークタグ：VMインスタンスに適用されるファイアウォールのルールやトラフィックの経路を設定できる
    * https://cloud.google.com/vpc/docs/add-remove-network-tags
* `~`は変更がある個所を示す

### Introduce destructive changes
* 破壊的変更をともなうもの(ex インスタンスのimageを変更)
* `-/+`は破棄と作成を行うことを示す


## Destroy Infrastructure
```
terraform destroy
```
* 管理しているインフラをすべて終了する
* リソースの破棄の順序も依存関係に基づいて破棄してくれる


## Define Input Variables
* Terraformは.tfのファイルをすべて読み込むため、構成ファイルに任意の名前をつけることができる
* .tfvars または .auto.tfvars のファイルは自動的にロードされ変数を取り扱うことができる
