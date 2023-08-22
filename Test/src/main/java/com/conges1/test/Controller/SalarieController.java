package com.conges1.test.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.conges1.test.Modeles.User;
import com.conges1.test.Services.SalarieService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/salaries")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")

public class SalarieController {
       
    //Injection par constructeur
    private final SalarieService salarieService ;

    @PostMapping("/create")
    public  User create (@RequestBody  User salarie){
        return salarieService.creer(salarie);
    }

    @GetMapping("/read")
    public List< User >read(){
        return salarieService.listeSalarie();
    }

    @PutMapping("/update/{id}")
    public User update (@PathVariable Long id ,@RequestBody User salarie){
        return salarieService.modifer(id, salarie);
    }
    
    @DeleteMapping("/delete")
    public void delete (@RequestParam Long id){
         salarieService.supprimer(id);
    }
 
}
