package com.lms.api.config;

import com.lms.api.models.user.UserDTO;
import com.lms.api.services.JwtUserDetailsService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

// Creating our custom filter for JWT authentication we should add this before the username authentication in the filter chain
// Because we need to check the token before checking the username and password
@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        String username=null;
        String jwt=null;
        // Check if auth header starts with bearer

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            try{
             jwt = authHeader.substring(7);
             System.out.println(jwt);
             username=jwtTokenUtil.getUsernameFromToken(jwt);

             }catch (IllegalArgumentException e) {
             response.setStatus(403);
             response.getOutputStream().write("Unable to get JWT Token".getBytes());
                System.out.println("Unable to get JWT Token");
            } catch (ExpiredJwtException e) {
                response.setStatus(403);
                response.getOutputStream().write("JWT token is expired".getBytes());
            }
        }else{
//            response.resetBuffer();
//            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
//            response.setHeader(HttpHeaders.CONTENT_TYPE, "application/json");
//            response.getOutputStream().print(new ObjectMapper().writeValueAsString("JWT Token does not begin with Bearer String"));
//            response.flushBuffer();
            System.out.println("JWT Token does not begin with Bearer String");
             response.setStatus(422);
            response.getOutputStream().write("JWT Token does not begin with Bearer String".getBytes());
            return ;
        }

        // Validating Token
        if(jwtTokenUtil.validateToken(jwt,username)){
            UserDTO userDTO= jwtUserDetailsService.loadUserByUsername(username);
            System.out.print(userDTO);
            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                    userDTO, null, userDTO.getAuthorities());
            usernamePasswordAuthenticationToken
                    .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            // After setting the Authentication in the context, we specify
            // that the current user is authenticated. So it passes the
            // Spring Security Configurations successfully.
            SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
        }

        filterChain.doFilter(request, response);
    }
    // We are adding this method to exclude the register and login endpoints from the filter
    @Override
    public boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getServletPath();
        System.out.println(path);
        return path.equals("/register") || path.equals("/login")||path.equals("/swagger-ui")||path.equals("/swagger-ui/index.html")||path.matches("/swagger-ui/.*")||path.matches(
                "/swagger-ui/")||path.matches("/v3/api-docs/*")||path.matches("/v3/api-docs")||path.matches("/v3/api-docs/.*")||path.matches("/v3/api-docs/");

    }

}
