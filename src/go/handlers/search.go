
package handlers

import (
    "net/http"
    "regexp"
)
const maxInputLength = 254  // longitud maxima de email segun RFC 5321
var safeEmailPattern = regexp.MustCompile(
    `^[a-zA-Z0-9._%+\-]+@example\.com$`,
)


func SearchHandler(w http.ResponseWriter, r *http.Request) {
    input := r.URL.Query().Get("q")

    // Limitar longitud antes de evaluar la regex
    if len(input) > maxInputLength {
        http.Error(w, "Input too long", http.StatusBadRequest)
        return
    }
	

    if safeEmailPattern.MatchString(input) {
        w.Write([]byte("valid"))
		
    } else {
        w.Write([]byte("invalid"))
    }
}
