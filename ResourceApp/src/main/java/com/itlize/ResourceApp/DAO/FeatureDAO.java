package com.itlize.ResourceApp.DAO;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.itlize.ResourceApp.domain.Feature;

public interface FeatureDAO extends CrudRepository<Feature, Integer> {
	
	public Feature findById(int id);
	public List<Feature> findByProjectId(int projectId);

}
