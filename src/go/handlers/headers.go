

package handlers
import (
    "net/http"
    "strings"
)
var allowedRedirects = map[string]bool{
    "/home":      true,
    "/dashboard": true,
    "/profile":   true,
}
func sanitizeHeaderValue(value string) string {
    value = strings.ReplaceAll(value, "\r", "")
    value = strings.ReplaceAll(value, "\n", "")
    return value
}
func RedirectHandler(w http.ResponseWriter, r *http.Request) {
    next := r.URL.Query().Get("next")
    sanitized := sanitizeHeaderValue(next)
	
    if !allowedRedirects[sanitized] {
        sanitized = "/home"
    }

    w.Header().Set("Location", sanitized)
    w.WriteHeader(http.StatusFound)
}
