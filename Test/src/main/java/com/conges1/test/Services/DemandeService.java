package com.conges1.test.Services;

import java.util.List;

import com.conges1.test.Modeles.Demande;

import io.jsonwebtoken.io.IOException;


public interface DemandeService {

    Demande ajouterDemande(Demande demande);
    Demande modifierDemande(Long id ,Demande demande );
    List< Demande> listeDemande ();
    List<Demande> listeDemandeEnCours();
    List<Demande> listeDemandeRefusee();
    List<Demande> listeDemandeTerminee();
    Demande accepterDemande(Long id) throws java.io.IOException;
    Demande refuserDemande(Long id) throws IOException, java.io.IOException;
} 
    
