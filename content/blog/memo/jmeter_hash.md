---
title: "Jmeter Hash"
date: 2021-12-28T23:46:09+09:00
draft: true
---

* JMeterのシナリオで変数をHash化する時はBeanShell PreProcesserを使う

```java
import java.security.MessageDigest;

String token = vars.get("token"); // Jmeterの変数を取得
String api_key = "hogehuga";
String encrypt_str = token+api_key;

MessageDigest digest = MessageDigest.getInstance("SHA-256");
byte[] hash = digest.digest(encrypt_str.getBytes());

StringBuilder sb = new StringBuilder(2*hash.length);

for (byte b: hash) {
    String hexStr = Integer.toHexString(b).replaceAll("ffffff","");
    String hex = (hexStr.length() == 1) ? "0" + hexStr : hexStr;
    sb.append(hex);
} 
String newVariable = sb.toString();
var.put("ENCRYPTED_TOKEN",newVariable); // Jmeterの変数にセット


```
