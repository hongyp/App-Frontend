package com.itlize.ResourceApp.service;

import com.itlize.ResourceApp.domain.Project;

public interface ProjectService {

	public Iterable<Project> getProjectList();
	
	public Project getProjectById(int id);
	
}
