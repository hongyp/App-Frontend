package com.itlize.ResourceApp.service;

import java.util.List;

import com.itlize.ResourceApp.domain.Resource;

public interface ResourceService {
	
	List<Resource> getResourcesByProjectId(int projectId);
	
	Resource getResourceById(int id);

}
