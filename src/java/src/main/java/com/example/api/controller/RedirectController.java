
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
        if (!ALLOWED_REDIRECTS.contains(next)) {
            return "redirect:/dashboard";  // destino seguro por defecto
        }
        return "redirect:" + next;
    }
}
