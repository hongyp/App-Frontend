package com.itlize.ResourceApp.service.impl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itlize.ResourceApp.DAO.ProjectDAO;
import com.itlize.ResourceApp.domain.Project;
import com.itlize.ResourceApp.exception.InfoConflictException;
import com.itlize.ResourceApp.service.ProjectService;

@Service
@Transactional
public class ProjectServiceImpl implements ProjectService {
	
	@Autowired
	ProjectDAO projectDAO;

//	Create
	@Override
	public Project saveProject(Project project) {
		// TODO Auto-generated method stub
		if (projectDAO.existsByName(project.getName())) {
			throw new InfoConflictException("Project");
		}
		projectDAO.save(project);
		return project;
	}
	
//	Read
	public Iterable<Project> getProjectList() {
		Iterable<Project> list = projectDAO.findAll();
		return list;
	}

	@Override
	public Project getProjectById(int id) {
		// TODO Auto-generated method stub
		return projectDAO.findById(id);
	}

//	Update
	@Override
	public Project updateProject(Project project) {
		// TODO Auto-generated method stub
		Project projectToUpdate = projectDAO.getOne(project.getId());
		if (projectDAO.existsByName(project.getName())) {
			throw new InfoConflictException("Project name");
		}
		projectToUpdate.setName(project.getName());
		return projectDAO.save(projectToUpdate);
	}

}
