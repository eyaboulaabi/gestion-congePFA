package com.conges1.test.Controller;

import java.util.Optional;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.conges1.test.DAO.AuthenticationRequest;
import com.conges1.test.Modeles.User;
import com.conges1.test.Repository.UserRepository;
import com.conges1.test.Utils.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/auth")

public class AuthenticationController {
   


    @Autowired 
    private AuthenticationManager authenticationManager ;

    @Autowired
    private UserDetailsService userDetailsService ;

     @Autowired          
     private  JwtUtil jwtUtil ;

     @Autowired
     private UserRepository userRepository ;
     
     public static final String TOKEN_PREFIX="Bearer";

     public static final String HEADE_STRING="Authorization";


    @PostMapping
    public ResponseEntity<String> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest, HttpServletResponse response) throws java.io.IOException, JSONException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword()));
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Incorrect email or password.");
        } catch (DisabledException disabledException) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "User is not created");
            return null;
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getEmail());
        Optional<User> optionalUser = userRepository.findFirstByEmail(userDetails.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails.getUsername());

        JSONObject userJson = new JSONObject();
        if (optionalUser.isPresent()) {
            userJson.put("userId", optionalUser.get().getId());
            userJson.put("role", optionalUser.get().getRole());
        }

        response.setHeader("Access-Control-Expose-Headers", "Authorization");
        response.setHeader("Access-Control-Allow-Headers", "Authorization,X-Pingother,Origin,X-Requested-With,Content-Type,Accept,X-Custom-header");
        response.setHeader(HEADE_STRING, TOKEN_PREFIX + jwt);
         //modifier en chaine
        return ResponseEntity.ok(userJson.toString());
    }

}
