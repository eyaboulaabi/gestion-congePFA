package com.conges1.test.Controller;


import java.sql.Date;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.conges1.test.Modeles.Demande;
import com.conges1.test.Modeles.User;
import com.conges1.test.Services.DemandeService;
import com.conges1.test.Services.SalarieService;

import io.jsonwebtoken.io.IOException;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/demandes")
public class DemandeController {
  @Autowired
  private final DemandeService demandeService ;
  @Autowired
  private final SalarieService salarieService;

 @GetMapping("/liste")
    public List<Demande> getDemandesConge() {
        return demandeService.listeDemande();
    }

    @PostMapping("/ajouter")
    public Demande creerDemande(@RequestBody Demande demande) {
        return demandeService.ajouterDemande(demande);
    }

   @PutMapping("/update/{id}")
    public Demande updateDemande(@PathVariable Long id,@RequestBody Demande demande) {
        return demandeService.modifierDemande(id,demande);
    }
    
    @GetMapping("/en-cours")
    public List<Demande> getDemandesEnCours() {
        return demandeService.listeDemandeEnCours();
    }

    @GetMapping("/refusees")
    public List<Demande> getDemandesRefusees() {
        return demandeService.listeDemandeRefusee();
    }

    @GetMapping("/terminees")
    public List<Demande> getDemandesTerminees() {
        return demandeService.listeDemandeTerminee();
    }

    @PutMapping("/accepter/{id}")
    public Demande accepterDemande(@PathVariable Long id) throws java.io.IOException {
        return demandeService.accepterDemande(id);
    }

    @PutMapping("/refuser/{id}")
    public Demande refuserDemande(@PathVariable Long id) throws IOException, java.io.IOException {
        return demandeService.refuserDemande(id);
    }

    @PostMapping("/create-demande-with-salarie")
    public Demande createDemandeWithSalarie() {
        // Create a new Demande object
        Demande demande = new Demande();

        // Create or find the Salarie (User) object
        User salarie = salarieService.findOrCreateSalarie("salarie@example.com", "Salarie User");
        LocalDate startDate = LocalDate.of(2023, 8, 1);
        LocalDate endDate = LocalDate.of(2023, 8, 5);
        demande.setNomSalarie(salarie);

        demande.setDateDebut(startDate);
        demande.setDateFin(endDate);
        demande.setType("Conge");
        demande.setDescription("Sample description");
        demande.setEtat("En cours");

        return demandeService.ajouterDemande(demande);
       
    }
}
