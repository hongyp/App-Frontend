package com.itlize.ResourceApp.service;

import java.util.List;

import com.itlize.ResourceApp.domain.Feature;

public interface FeatureService {
	
//	Create
	public Feature saveFeatureForProject(Feature feature, int projectId);
	
//	Read
	public List<Feature> getFeatruesByProjectId(int projectId);
	public Feature getFeatureById(int id);
	
//	Update
	public Feature updateFeatureOfProject(Feature feature);

}
