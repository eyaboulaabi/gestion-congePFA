package com.conges1.test.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.conges1.test.Modeles.Demande;

public interface  DemandeRepository extends JpaRepository<Demande,Long> {
    List<Demande> findByEtat(String etat);
}
