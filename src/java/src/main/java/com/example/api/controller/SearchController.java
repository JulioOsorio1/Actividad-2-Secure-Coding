

package com.example.api.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.HtmlUtils;

@RestController
@RequestMapping("/api/xss")
public class SearchController {

    @GetMapping("/search")
    @ResponseBody
    public String search(@RequestParam String q) {
        String safeQ = HtmlUtils.htmlEscape(q);
        return "<html><body><h2>Resultados para: " + safeQ + "</h2></body></html>";
    }
}
