package com.itlize.ResourceApp.service;

import java.util.List;

import com.itlize.ResourceApp.domain.Resource;

public interface ResourceService {
	
//	Create
	Resource saveResourceForProject(Resource resource, int projectId);
//	Read
	List<Resource> getResourcesByProjectId(int projectId);
	Resource getResourceById(int id);
//	Update
	Resource updateResourceOfProject(Resource resource);

}
