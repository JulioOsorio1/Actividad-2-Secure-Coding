import java.security.SecureRandom;
import java.util.Base64;

private final SecureRandom secureRandom = new SecureRandom();

@PostMapping("/reset-password")
public ResponseEntity<?> requestReset(@RequestParam String email) {
    byte[] tokenBytes = new byte[32];  
    secureRandom.nextBytes(tokenBytes);
    String token = Base64.getUrlEncoder().withoutPadding().encodeToString(tokenBytes);
    saveResetToken(email, token);
    return ResponseEntity.ok(Map.of("message", "Reset email sent"));
}
