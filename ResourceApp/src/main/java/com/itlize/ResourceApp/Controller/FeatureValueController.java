package com.itlize.ResourceApp.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.itlize.ResourceApp.domain.FeatureValue;
import com.itlize.ResourceApp.domain.Project;
import com.itlize.ResourceApp.service.FeatureValueService;

@RestController
@EnableAutoConfiguration
public class FeatureValueController {

	@Autowired
	FeatureValueService featureValueService;
	
	@RequestMapping(value = "/featureValue", method = RequestMethod.POST)
	public FeatureValue getFeatureValueById(@RequestBody FeatureValue featureValue) {
		return featureValueService.getFeatureValueById(featureValue.getId());
	}
	
//	@RequestMapping(value = "project/{projectId}/features", method = RequestMethod.GET)
//	public List<FeatureValue> getFeatureValuesByProjectId(@PathVariable("projectId") Project project) {
//		return featureValueService.getFeatureValuesByProjectId(project.getId());
//	}
	
	@RequestMapping(value = "/project/{projectId}/resource/{resourceId}/feature/{featureId}", method = RequestMethod.GET)
	public FeatureValue getValueByProIdResIdFeaId(@PathVariable("projectId")int projectId, 
													@PathVariable("resourceId")int resourceId, 
													@PathVariable("featureId")int featureId) {
		return featureValueService.getFeatureValuesByThreeId(projectId, resourceId, featureId);
	}
	
//	@RequestMapping(value = "/featureValues", method = RequestMethod.GET)
//	public Iterable<FeatureValue> getFeatureValuesByThreeId() {
//		return featureValueService.getFeatureValuesByThreeId(1, 1, 1);
//		return null;
//	}
	
}
