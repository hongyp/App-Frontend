package com.itlize.ResourceApp.DAO;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.itlize.ResourceApp.domain.Resource;

public interface ResourceDAO extends CrudRepository<Resource, Integer> {
	
	List<Resource> findByProjectId(int projectId);
	
	Resource findById(int id);
	
}
