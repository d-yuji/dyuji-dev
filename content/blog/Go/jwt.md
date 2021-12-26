## jwtの"Token used before issued" Error

* Token used before issued はjwtのParseの時iatが現在時刻より未来の場合発生する
* サーバー間の時刻のずれでも発生するので注意する
* Parseはerrroがnilでない時もtokenを返すので、後処理はできる


```go
package main

import (
	"fmt"

	"github.com/dgrijalva/jwt-go"
)

func main() {

	// iatが2030年になっている
	tokenstring := "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxOTE2MjM5MDIyfQ.jHQiBm09vEVjEx9347u2hU7LTreUVtEbWRPWrr9DG_A"

	secret := "my_secret_token"

	token, err := tokenParse(tokenstring, []byte(secret))

	if err != nil {
		fmt.Printf("Error:%v\n", err)
		return
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if ok {
		fmt.Println(claims)
		fmt.Println(claims["name"])
		return
	}
}

func tokenParse(idToken string, hmacSecret []byte) (*jwt.Token, error) {
	token, err := jwt.Parse(idToken, func(token *jwt.Token) (interface{}, error) {
		// アルゴリズムの判定
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return hmacSecret, nil
	})
	return token, err
}

```
