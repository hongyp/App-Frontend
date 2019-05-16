package com.itlize.ResourceApp.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.itlize.ResourceApp.domain.FeatureValue;
import com.itlize.ResourceApp.service.FeatureValueService;

@RestController
@EnableAutoConfiguration
@CrossOrigin(origins="http://localhost:3000")
public class FeatureValueController {

	@Autowired
	FeatureValueService featureValueService;
	
//	Create API
	@RequestMapping(value = "/project/saveFeatureValue", method = RequestMethod.POST)
	public FeatureValue saveValueOfFeature(@RequestBody FeatureValue featureValue) {
		return featureValueService.saveValueOfFeature(featureValue);
	}
	
//	Read API
	@RequestMapping(value = "/featureValue", method = RequestMethod.POST)
	public FeatureValue getFeatureValueById(@RequestBody FeatureValue featureValue) {
		return featureValueService.getFeatureValueById(featureValue.getId());
	}
	
	@RequestMapping(value = "/project/{projectId}/resource/{resourceId}/feature/{featureId}", method = RequestMethod.GET)
	public FeatureValue getValueByProIdResIdFeaId(@PathVariable("projectId")int projectId, 
													@PathVariable("resourceId")int resourceId, 
													@PathVariable("featureId")int featureId) {
		return featureValueService.getFeatureValuesByThreeId(projectId, resourceId, featureId);
	}
	
//	Update API
	@RequestMapping(value = "/updateFeatureValue", method = RequestMethod.PUT)
	public FeatureValue updateFeatureValue(@RequestBody FeatureValue featureValue) {
		 return featureValueService.updateFeatureValue(featureValue.getValue(), featureValue.getProjectId(), 
														featureValue.getResourceId(), featureValue.getFeatureId());
	}
	
}
