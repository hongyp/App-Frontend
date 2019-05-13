package com.itlize.ResourceApp.service;

import java.util.List;

import com.itlize.ResourceApp.domain.FeatureValue;

public interface FeatureValueService {
	
	FeatureValue getFeatureValueById(int id);
	List<FeatureValue> getFeatureValuesByProjectId(int projectId);
	
	FeatureValue getFeatureValuesByThreeId(int projectId, int resourceId, int featureId);

}
