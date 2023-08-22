package com.conges1.test.Services;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.conges1.test.Enums.UserRole;
import com.conges1.test.Modeles.User;
import com.conges1.test.Repository.UserRepository;

import jakarta.annotation.PostConstruct;

@Service
public class AdminServiceImpl {

    private final UserRepository userRepository;

    public AdminServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostConstruct
    public void createAdminAccount() {

        User adminAccount = userRepository.findByRole(UserRole.ADMIN);
        if (adminAccount == null) {
            User admin = new User();
            admin.setEmail("admin@gmail.com");
            admin.setUsername("admin");
            admin.setRole(UserRole.ADMIN);
            admin.setPassword(new BCryptPasswordEncoder().encode("admin"));
            userRepository.save(admin);
             User admin1 = new User();
            admin1.setEmail("admin1@gmail.com");
            admin1.setUsername("admin1");
            admin1.setRole(UserRole.SALARIE);
            admin1.setPassword(new BCryptPasswordEncoder().encode("admin1"));
            userRepository.save(admin1);
        }
    }

}
