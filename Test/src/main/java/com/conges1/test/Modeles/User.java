package com.conges1.test.Modeles;
 

import com.conges1.test.Enums.UserRole;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@Entity
@NoArgsConstructor

public class User {
   @Id 
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id ;
   private String email ;
   private String username ;
   private String password ;
   private UserRole role ;

}
