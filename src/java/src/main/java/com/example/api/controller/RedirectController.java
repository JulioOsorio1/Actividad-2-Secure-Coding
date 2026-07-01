@Controller
@RequestMapping("/auth")
public class RedirectController {

    private static final List<String> ALLOWED_REDIRECTS = List.of(
        "/dashboard",
        "/profile",
        "/settings",
        "/orders"
    );

    @GetMapping("/login")
    public String login(@RequestParam(defaultValue = "/dashboard") String next) {

        // Validación estricta: solo rutas internas permitidas
        if (!ALLOWED_REDIRECTS.contains(next)) {
            return ResponseEntity.badRequest().build();
        }

        return "redirect:" + next;
    }
}
