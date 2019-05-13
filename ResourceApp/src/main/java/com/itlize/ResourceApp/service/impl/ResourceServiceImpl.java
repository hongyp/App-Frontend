package com.itlize.ResourceApp.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itlize.ResourceApp.DAO.ResourceDAO;
import com.itlize.ResourceApp.domain.Resource;
import com.itlize.ResourceApp.service.ResourceService;

@Service
@Transactional
public class ResourceServiceImpl implements ResourceService {
	
	@Autowired
	ResourceDAO resourceDAO;

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

}
