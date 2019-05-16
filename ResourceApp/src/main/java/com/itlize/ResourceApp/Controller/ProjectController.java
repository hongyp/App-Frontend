package com.itlize.ResourceApp.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.itlize.ResourceApp.domain.Project;
import com.itlize.ResourceApp.service.ProjectService;

@RestController
@EnableAutoConfiguration
@CrossOrigin(origins="http://localhost:3000")
public class ProjectController {
	
	@Autowired
	ProjectService projectService;
	
//	Create API
	@RequestMapping(value = "/saveProject", method = RequestMethod.POST)
	public Project saveProject(@RequestBody Project project) {
		return projectService.saveProject(project);
	}

	
//	Read API
	@RequestMapping(value = "/getProject", method = RequestMethod.POST)
	public Project getProjectById(@RequestBody Project project) {
		return projectService.getProjectById(project.getId());
	}
	
	@RequestMapping(value = "/getAllProjects", method = RequestMethod.GET)
	public Iterable<Project> getAllProjects() {
		Iterable<Project> list = projectService.getProjectList();
		return list;
	}

//	Update API
	@RequestMapping(value = "/updateProject", method = RequestMethod.PUT)
	public Project updateProject(@RequestBody Project project) {
		return projectService.updateProject(project);
	}
}
