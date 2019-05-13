package com.itlize.ResourceApp.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itlize.ResourceApp.DAO.FeatureDAO;
import com.itlize.ResourceApp.domain.Feature;
import com.itlize.ResourceApp.exception.InfoConflictException;
import com.itlize.ResourceApp.service.FeatureService;

@Service
@Transactional
public class FeatureServiceImpl implements FeatureService {
	
	@Autowired
	FeatureDAO featureDAO;

//	Create
	@Override
	public Feature saveFeatureForProject(Feature feature, int projectId) {
		// TODO Auto-generated method stub
		if (featureDAO.existsByNameForProject(feature.getName(), projectId)) {
			throw new InfoConflictException("Feature " + feature.getName() + " for the project");
		}
		featureDAO.save(feature);
		return feature;
	}
	
//	Read
	@Override
	public Feature getFeatureById(int id) {
		// TODO Auto-generated method stub
		return featureDAO.findById(id);
	}

	@Override
	public List<Feature> getFeatruesByProjectId(int projectId) {
		// TODO Auto-generated method stub
		return featureDAO.findByProjectId(projectId);
	}

}
