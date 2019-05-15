package com.itlize.ResourceApp.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.itlize.ResourceApp.domain.Data;
import com.itlize.ResourceApp.domain.Project;
import com.itlize.ResourceApp.service.AppService;

@RestController
@EnableAutoConfiguration
@CrossOrigin(origins="http://localhost:3000")
public class AppController  {

	@Autowired
	AppService appService;
	
//	Create API
	@RequestMapping(value = "/saveData", method = RequestMethod.POST)
	public Data saveDataToProject(@RequestBody Data data) {
		return appService.saveDataToProject(data);
	}
	
//	Read API
	@RequestMapping(value = "/getProject/{projectId}", method = RequestMethod.GET)
	public List<Data> getTableByProjectId(@PathVariable("projectId") Project project) {
		return appService.generateRows(project.getId());
	}
	
//	Update API
	@RequestMapping(value = "/updateData", method = RequestMethod.PUT)
	public Data updateData(@RequestBody Data data) {
		return appService.updateRow(data);
	}
	
}
