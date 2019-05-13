package com.itlize.ResourceApp.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itlize.ResourceApp.DAO.FeatureValueDAO;
import com.itlize.ResourceApp.domain.FeatureValue;
import com.itlize.ResourceApp.service.FeatureValueService;

@Service
@Transactional
public class FeatureValueServiceImpl implements FeatureValueService {
	
	@Autowired
	FeatureValueDAO featureValueDAO;

//	Create
	@Override
	public FeatureValue saveValueOfFeature(FeatureValue featureValue) {
		// TODO Auto-generated method stub
//		if (featureValueDAO.existsByValue(featureValue.getProjectId(), 
//											featureValue.getResourceId(), 
//											featureValue.getFeatureId())) {
//			throw new InfoConflictException("Value of the feature");
//		}
		return featureValueDAO.save(featureValue);
	}
	
	@Override
	public FeatureValue saveValueOfFeature(String value, int projectId, int resourceId, int featureId) {
		FeatureValue obj = new FeatureValue();
		obj.setValue(value);
		obj.setProjectId(projectId);
		obj.setResourceId(resourceId);
		obj.setFeatureId(featureId);
		return saveValueOfFeature(obj);
	}
	
//	Read
	@Override
	public FeatureValue getFeatureValueById(int id) {
		// TODO Auto-generated method stub
		return featureValueDAO.findById(id);
	}

	@Override
	public List<FeatureValue> getFeatureValuesByProjectId(int projectId) {
		// TODO Auto-generated method stub
		return featureValueDAO.findByProjectId(projectId);
	}

	@Override
	public FeatureValue getFeatureValuesByThreeId(int projectId, int resourceId, int featureId) {
		// TODO Auto-generated method stub
		FeatureValue value = featureValueDAO.findByProIdResIdFeaId(projectId, resourceId, featureId);
		// can be null
		return value;
	}

}
