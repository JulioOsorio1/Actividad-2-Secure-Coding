package handlers

import (
    "encoding/json"
    "net/http"
)

func GetOrder(w http.ResponseWriter, r *http.Request) {
    orderID := r.URL.Query().Get("id")

    authenticatedUserID := r.Header.Get("X-User-ID")
    if authenticatedUserID == "" {
        http.Error(w, "unauthorized", http.StatusUnauthorized)
        return
    }
    order := findOrderByID(orderID)

    if order == nil || order.UserID != authenticatedUserID {
        // Mismo error para "no existe" y "no es tuyo"
        http.Error(w, "forbidden", http.StatusForbidden)
        return
    }
    json.NewEncoder(w).Encode(order)
}
