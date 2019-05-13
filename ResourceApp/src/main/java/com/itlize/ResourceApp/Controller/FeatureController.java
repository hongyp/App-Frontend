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

@RestController
@EnableAutoConfiguration
public class FeatureController {
	
	@Autowired
	FeatureService featureService;
	
//	Create API
	@RequestMapping(value = "/project/saveFeature", method = RequestMethod.POST)
	public Feature saveFeatureForProject(@RequestBody Feature feature) {
		System.out.println(feature);
		return featureService.saveFeatureForProject(feature, feature.getProjectId());
	}
	
//	Get API
	@RequestMapping(value = "/getFeature/{id}", method = RequestMethod.POST)
	public Feature getFeatureById(@RequestBody Feature feature) {
		return featureService.getFeatureById(feature.getId());
	}
	
	@RequestMapping(value = "/project/{projectId}/getAllFeatures", method = RequestMethod.GET)
	public List<Feature> getFeatruesByResIdProId(@PathVariable("projectId") Project project) {
		return featureService.getFeatruesByProjectId(project.getId());
	}
	
//	Update API
	@RequestMapping(value = "/updateFeature", method = RequestMethod.PUT)
	public Feature updateFeature(@RequestBody Feature feature) {
		return featureService.updateFeatureOfProject(feature);
	}

}
