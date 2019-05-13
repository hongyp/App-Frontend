package com.itlize.ResourceApp.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.itlize.ResourceApp.domain.Users;

public interface UsersDAO extends CrudRepository<Users, Integer>, JpaRepository<Users, Integer> {

	Users findByEmail(String email);
	
	@Query("SELECT CASE WHEN COUNT(u) > 0 THEN 'true' ELSE 'false' END FROM Users u WHERE u.email = ?1")
	boolean existsByEmail(String email);
	// findById
	
}
