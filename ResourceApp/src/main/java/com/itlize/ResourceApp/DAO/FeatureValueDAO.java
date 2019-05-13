package com.itlize.ResourceApp.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.itlize.ResourceApp.domain.FeatureValue;

public interface FeatureValueDAO extends CrudRepository<FeatureValue, Integer> {
	
	FeatureValue findById(int id);
	List<FeatureValue> findByProjectId(int projectId);

	@Query("SELECT u FROM FeatureValue u WHERE u.projectId = ?1 AND u.resourceId = ?2 AND u.featureId = ?3")
	FeatureValue findByProIdResIdFeaId(int projectId, int resourceId, int featureId);
	
//	@Query("SELECT CASE WHEN COUNT(u) > 0 THEN 'true' ELSE 'false' END FROM Users u WHERE u.email = ?1")
//	boolean exisasdtsByEmaasdfil(String email);
}
