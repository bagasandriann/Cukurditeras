package com.cukurditeras.backend.repository;

import com.cukurditeras.backend.domain.entity.NotificationLog;
import com.cukurditeras.backend.domain.enums.NotificationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface NotificationLogRepository extends JpaRepository<NotificationLog, UUID> {

    List<NotificationLog> findByStatus(NotificationStatus status);
}
