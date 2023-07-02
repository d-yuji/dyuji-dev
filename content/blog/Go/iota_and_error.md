---
title: "iotaとエラーハンドリング"
date: 2021-12-26T11:15:29+09:00

---

* [jwtのエラー](jwt.md)を調べている時に以下のコードを見て不思議に思った

* [dgrijalva/jwt-go/claims.go#L38-L52](https://github.com/dgrijalva/jwt-go/blob/master/claims.go#L38-L52)

```go

    if c.VerifyExpiresAt(now, false) == false {
		delta := time.Unix(now, 0).Sub(time.Unix(c.ExpiresAt, 0))
		vErr.Inner = fmt.Errorf("token is expired by %v", delta)
		vErr.Errors |= ValidationErrorExpired
	}

	if c.VerifyIssuedAt(now, false) == false {
		vErr.Inner = fmt.Errorf("Token used before issued")
		vErr.Errors |= ValidationErrorIssuedAt
	}

	if c.VerifyNotBefore(now, false) == false {
		vErr.Inner = fmt.Errorf("token is not valid yet")
		vErr.Errors |= ValidationErrorNotValidYet
	}
```

* goで`|=`はOR演算子を表すが、エラーでなんでOR演算子を使うのか？

* [dgrijalva/jwt-go/errors.go](https://github.com/dgrijalva/jwt-go/blob/master/errors.go)をみる

```go
const (
	ValidationErrorMalformed        uint32 = 1 << iota // Token is malformed
	ValidationErrorUnverifiable                        // Token could not be verified because of signing problems
	ValidationErrorSignatureInvalid                    // Signature validation failed

	// Standard Claim validation errors
	ValidationErrorAudience      // AUD validation failed
	ValidationErrorExpired       // EXP validation failed
	ValidationErrorIssuedAt      // IAT validation failed
	ValidationErrorIssuer        // ISS validation failed
	ValidationErrorNotValidYet   // NBF validation failed
	ValidationErrorId            // JTI validation failed
	ValidationErrorClaimsInvalid // Generic claims validation error
)
```
* これはconst識別子iotaを使ってエラーの定数を定義している
* << はbitの左シフトでValidationErrorMalformed以下の定数は1桁ずつ増えていく(1,2,4,8...)
* uint32のなかでビットごとの値をエラーに割り当てることで、エラーのフラグ管理のようなものを上のOR演算子で実現してると解釈できる



### 参考
[Golangのconst識別子iotaの紹介 -Qiita](https://qiita.com/curepine/items/2ae2f6504f0d28016411)
