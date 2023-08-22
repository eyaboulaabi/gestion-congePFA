package com.conges1.test.Modeles;



import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class Salarie  {
   @Id 
   @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    private String username ;
    private String password ;
    private String email ;
   

}
