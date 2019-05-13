package com.itlize.ResourceApp.service;

import java.util.List;

import com.itlize.ResourceApp.domain.FeatureValue;

public interface FeatureValueService {
	
//	Create
	public FeatureValue saveValueOfFeature(FeatureValue featureValue);
	public FeatureValue saveValueOfFeature(String value, int projectId, int resourceId, int featureId);
//	Read
	public FeatureValue getFeatureValueById(int id);
	public List<FeatureValue> getFeatureValuesByProjectId(int projectId);
	public FeatureValue getFeatureValuesByThreeId(int projectId, int resourceId, int featureId);

}
