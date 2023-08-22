package com.conges1.test.DAO;

public record AuthenticationResponse(String jwt, String jsonData) {
    // Include any other fields or methods you need

    public AuthenticationResponse(String jwt) {
        this(jwt, null); // Call the parameterized constructor with null as jsonData
    }

    // Getters and setters (if needed) for jwt and jsonData
}

