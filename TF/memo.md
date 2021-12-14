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

