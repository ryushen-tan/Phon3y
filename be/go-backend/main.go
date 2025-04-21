// main.go
package main

import (
    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
    "github.com/go-resty/resty/v2"
    "net/http"
	"github.com/ryushen-tan/go-backend/config"
	"fmt"
)

func main() {

    r := gin.Default()

    // Add this!
    r.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:5173"},
        AllowMethods:     []string{"POST", "GET", "OPTIONS"},
        AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
        AllowCredentials: true,
    }))

    r.POST("/signup", func(c *gin.Context) {
        var body struct {
            Email    string `json:"email"`
            Password string `json:"password"`
        }

        if err := c.ShouldBindJSON(&body); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
            return
        }

        client := resty.New()

		resp, err := client.R().
		SetHeader("apikey", config.SupabaseAnonKey).
		SetHeader("Content-Type", "application/json").
		SetBody(map[string]interface{}{
			"email":    body.Email,
			"password": body.Password,
		}).
		Post(fmt.Sprintf("%s/auth/v1/signup", config.SupabaseURL))


		if err != nil {
			fmt.Println("Resty Error:", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
			return
		}

		fmt.Println("Supabase Status Code:", resp.StatusCode())
		fmt.Println("Supabase Response Body:", resp.String())

		if resp.StatusCode() >= 400 {
			c.JSON(http.StatusBadRequest, gin.H{
				"error":   "Signup failed",
				"details": resp.String(),
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Signup successful"})
	})
	r.POST("/login", func(c *gin.Context) {
		var body struct {
			Email    string `json:"email"`
			Password string `json:"password"`
		}
	
		if err := c.ShouldBindJSON(&body); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
			return
		}
	
		url := fmt.Sprintf("%s/auth/v1/token?grant_type=password", config.SupabaseURL)
		fmt.Println("LOGIN URL:", url)
	
		client := resty.New()
		resp, err := client.R().
			SetHeader("apikey", config.SupabaseAnonKey).
			SetHeader("Content-Type", "application/json").
			SetBody(map[string]string{
				"email":    body.Email,
				"password": body.Password,
			}).
			Post(url)
	
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal error", "details": err.Error()})
			return
		}
	
		if resp.StatusCode() >= 400 {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Login failed", "details": resp.String()})
			return
		}
	
		c.JSON(http.StatusOK, gin.H{"message": "Login successful", "data": resp.String()})
	})
	
		
	r.Run(":8080")
}
