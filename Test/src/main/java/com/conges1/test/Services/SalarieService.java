package com.conges1.test.Services;



import java.util.List;

import com.conges1.test.Modeles.User;

public interface SalarieService {
  User creer (User salarie);
  List< User> listeSalarie ();
   User modifer (Long id ,  User salarie);
  void supprimer (Long id); 
  User findOrCreateSalarie(String email, String username);
}
