package com.itlize.ResourceApp.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.itlize.ResourceApp.domain.Feature;
import com.itlize.ResourceApp.domain.Project;
import com.itlize.ResourceApp.service.FeatureService;
import com.itlize.ResourceApp.service.FeatureValueService;

@RestController
@EnableAutoConfiguration
public class FeatureController {
	
	@Autowired
	FeatureService featureService;
	@Autowired
	FeatureValueService featureValueService;
	
	@RequestMapping(value = "/feature/{id}", method = RequestMethod.POST)
	public Feature getFeatureById(@RequestBody Feature feature) {
		return featureService.getFeatureById(feature.getId());
	}
	
	@RequestMapping(value = "/project/{projectId}/features", method = RequestMethod.GET)
	public List<Feature> getFeatruesByResIdProId(@PathVariable("projectId") Project project) {
//		featureValueService.getFeatureValuesByThreeId(1, 1, 100);
		return featureService.getFeatruesByProjectId(project.getId());
	}

}
