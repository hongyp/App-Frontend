package com.itlize.ResourceApp.service.impl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itlize.ResourceApp.DAO.ProjectDAO;
import com.itlize.ResourceApp.domain.Project;
import com.itlize.ResourceApp.service.ProjectService;

@Service
@Transactional
public class ProjectServiceImpl implements ProjectService {
	
	@Autowired
	ProjectDAO projectDAO;
	
	public Iterable<Project> getProjectList() {
		Iterable<Project> list = projectDAO.findAll();
		return list;
	}

	@Override
	public Project getProjectById(int id) {
		// TODO Auto-generated method stub
		return projectDAO.findById(id);
	}

}
