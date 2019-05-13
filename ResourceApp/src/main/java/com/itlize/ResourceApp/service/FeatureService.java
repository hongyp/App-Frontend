package com.itlize.ResourceApp.service;

import java.util.List;

import com.itlize.ResourceApp.domain.Feature;

public interface FeatureService {
	
	List<Feature> getFeatruesByProjectId(int projectId);
	Feature getFeatureById(int id);

}
