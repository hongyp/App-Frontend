package com.itlize.ResourceApp.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itlize.ResourceApp.DAO.ResourceDAO;
import com.itlize.ResourceApp.domain.Resource;
import com.itlize.ResourceApp.exception.InfoConflictException;
import com.itlize.ResourceApp.service.ResourceService;

@Service
@Transactional
public class ResourceServiceImpl implements ResourceService {
	
	@Autowired
	ResourceDAO resourceDAO;

//	Create
	@Override
	public Resource saveResourceForProject(Resource resource, int projectId) {
		// TODO Auto-generated method stub
		if (resourceDAO.existsByCodeForProject(resource.getCode(), projectId)) {
			throw new InfoConflictException("Code " + resource.getCode() + " for the project ");
		}
		resourceDAO.save(resource);
		return resource;
	}
	
//	Read
	@Override
	public List<Resource> getResourcesByProjectId(int projectId) {
		// TODO Auto-generated method stub
		return resourceDAO.findByProjectId(projectId);
	}

	@Override
	public Resource getResourceById(int id) {
		// TODO Auto-generated method stub
		return resourceDAO.findById(id);
	}

//	Update
	@Override
	public Resource updateResourceOfProject(Resource resource) {
		// TODO Auto-generated method stub
		Resource resourceToUpdate = resourceDAO.getOne(resource.getId());
		if (resourceDAO.existsByCodeForProject(resource.getCode(), resource.getProjectId())) {
			throw new InfoConflictException("Resource code of this project");
		}
		resourceToUpdate.setCode(resource.getCode());
		resourceToUpdate.setName(resource.getName());
		return resourceDAO.save(resourceToUpdate);
	}

}
