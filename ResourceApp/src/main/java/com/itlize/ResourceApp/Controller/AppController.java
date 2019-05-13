package com.itlize.ResourceApp.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.itlize.ResourceApp.domain.Data;
import com.itlize.ResourceApp.domain.Project;
import com.itlize.ResourceApp.service.AppService;

@RestController
@EnableAutoConfiguration
public class AppController  {

	@Autowired
	AppService appService;
	
	@RequestMapping(value = "/getProject/{projectId}", method = RequestMethod.POST)
	public List<Data> getTableByProjectId(@PathVariable("projectId") Project project) {
		return appService.generateRows(project.getId());
	}
	
}
