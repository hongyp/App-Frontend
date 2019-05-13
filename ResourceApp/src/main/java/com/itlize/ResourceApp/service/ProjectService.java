package com.itlize.ResourceApp.service;

import com.itlize.ResourceApp.domain.Project;

public interface ProjectService {

//	Create
	public Project saveProject(Project project);
//	Read
	public Iterable<Project> getProjectList();
	public Project getProjectById(int id);
//	Update
	public Project updateProject(Project project);
//	Delete
	
}
