package com.conges1.test.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.conges1.test.Enums.UserRole;
import com.conges1.test.Modeles.User;
import com.conges1.test.Repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class SalarieServiceImpl implements SalarieService {
    
    //Injection par constructeur
    private final UserRepository salarieRepository ;
    private final PasswordEncoder passwordEncoder; // Injectez le PasswordEncoder

    @Override
    public User creer(User salarie) {
        // Crypter le mot de passe avant l'enregistrement
        String encryptedPassword = passwordEncoder.encode(salarie.getPassword());
        salarie.setPassword(encryptedPassword);

        return salarieRepository.save(salarie);
    }
    @Override
    public List< User> listeSalarie() {
        return salarieRepository.findAll();
    }

    @Override
    public User modifer(Long id, User salarie) {
        return salarieRepository.findById(id)
            .map(s -> {
                s.setUsername(salarie.getUsername());
                s.setEmail(salarie.getEmail());

                if (!salarie.getPassword().startsWith("$2a$")) {
                    String encryptedPassword = passwordEncoder.encode(salarie.getPassword());
                    s.setPassword(encryptedPassword);
                }

                s.setRole(salarie.getRole());
                return salarieRepository.save(s);
            })
            .orElseThrow(() -> new RuntimeException("Salarie non trouvé !"));
    }

    @Override
    public void supprimer(Long id) {
        salarieRepository.deleteById(id);
    }
    
    @Override
    public User findOrCreateSalarie(String email, String username) {
        Optional<User> existingSalarie = salarieRepository.findFirstByEmail(email);
        
        if (existingSalarie.isPresent()) {
            return existingSalarie.get();
        } else {
            User newSalarie = new User();
            newSalarie.setEmail(email);
            newSalarie.setUsername(username);
            newSalarie.setPassword(""); // Set a temporary password
            newSalarie.setRole(UserRole.SALARIE);
            return creer(newSalarie);
        }
    }
}
