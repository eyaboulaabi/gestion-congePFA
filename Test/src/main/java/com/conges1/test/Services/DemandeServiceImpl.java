package com.conges1.test.Services;

import java.sql.Date;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.conges1.test.Modeles.Demande;
import com.conges1.test.Modeles.User;
import com.conges1.test.Repository.DemandeRepository;
import com.conges1.test.Security.NotificationHandler;

import io.jsonwebtoken.io.IOException;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor

public class DemandeServiceImpl implements DemandeService {

    private final DemandeRepository demandeRepository;
    private final NotificationHandler notificationHandler;

    @Override
    public List<Demande> listeDemande() {
        return demandeRepository.findAll();
    }

    @Override
    public Demande ajouterDemande(Demande demande) {
        if (isDateDifferenceValid(demande.getDateDebut(), demande.getDateFin())) {
            return demandeRepository.save(demande);
        } else {

            throw new RuntimeException("La différence entre les dates de début et de fin dépasse 20 jours.");
        }
    }
     private boolean isDateDifferenceValid(LocalDate dateDebut, LocalDate dateFin) {
        long differenceInDays = ChronoUnit.DAYS.between(dateDebut, dateFin);
        return differenceInDays <= 20;
    }
    @Override
    public Demande modifierDemande(Long id, Demande demande) {
        return demandeRepository.findById(id)
                .map(d -> {
                    d.setNomSalarie(demande.getNomSalarie());
                    d.setType(demande.getType());
                    d.setDescription(demande.getDescription());
                    d.setDateDebut(demande.getDateDebut());
                    d.setDateFin(demande.getDateFin());
                    d.setEtat(demande.getEtat());
                    return demandeRepository.save(d);
                }).orElseThrow(() -> new RuntimeException("Demande non trouvé !"));
    }

    @Override
    public List<Demande> listeDemandeEnCours() {
        return demandeRepository.findByEtat("En cours");
    }

    @Override
    public List<Demande> listeDemandeRefusee() {
        return demandeRepository.findByEtat("Refusée");

    }

    @Override
    public List<Demande> listeDemandeTerminee() {
        return demandeRepository.findByEtat("Acceptée");

    }

    @Override
    public Demande accepterDemande(Long id) throws java.io.IOException {
        Demande demande = changeDemandeEtat(id, "Acceptée");
        // Send a notification to the concerned employee via WebSocket
        sendNotificationToSalarie(demande.getNomSalarie().getId(), demande);
        return demande;
    }

    @Override
    public Demande refuserDemande(Long id) throws java.io.IOException {
        Demande demande = changeDemandeEtat(id, "Refusée");
        // Send a notification to the concerned employee via WebSocket
        sendNotificationToSalarie(demande.getNomSalarie().getId(), demande);
        return demande;
    }

    private void sendNotificationToSalarie(Long salarieId, Demande demande) throws java.io.IOException {
        String message = "Votre demande a été " + demande.getEtat() + ".";
        try {
            notificationHandler.sendNotificationToUser(salarieId, message);
        } catch (IOException e) {
            // Handle the IOException here
            e.printStackTrace();
        }
    }
    
    private Demande changeDemandeEtat(Long id, String nouvelEtat) {
        return demandeRepository.findById(id)
                .map(demande -> {
                    demande.setEtat(nouvelEtat);
                    return demandeRepository.save(demande);
                })
                .orElseThrow(() -> new RuntimeException("Demande non trouvée !"));
    }

}
