package com.itlize.ResourceApp.DAO;

import org.springframework.data.repository.CrudRepository;

import com.itlize.ResourceApp.domain.Project;

public interface ProjectDAO extends CrudRepository<Project, Integer> {
	
	Project findById(int id);

}
