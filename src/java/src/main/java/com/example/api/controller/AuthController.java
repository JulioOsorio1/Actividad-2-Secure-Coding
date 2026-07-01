

private static String sanitizeForLog(String input) {
    if (input == null) return "null";
    String sanitized = input.replaceAll("[\\r\\n\\t]", "_");
    if (sanitized.length() > 100) {
        sanitized = sanitized.substring(0, 100) + "[truncado]";
    }
    return sanitized;
}

@PostMapping("/login")
public ResponseEntity<?> login(@RequestParam String username,
                               @RequestParam String password) {
    // Usar logging parametrizado Y sanitizacion del input
    log.info("Login attempt for user: {}", sanitizeForLog(username));
    return ResponseEntity.ok(Map.of("message", "OK"));
