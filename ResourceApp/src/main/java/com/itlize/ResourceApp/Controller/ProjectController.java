package com.itlize.ResourceApp.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.itlize.ResourceApp.domain.Project;
import com.itlize.ResourceApp.service.ProjectService;

@RestController
@EnableAutoConfiguration
public class ProjectController {
	
	@Autowired
	ProjectService projectService;

	@RequestMapping(value = "/project", method = RequestMethod.POST)
	public Project getProjectById(@RequestBody Project project) {
		return projectService.getProjectById(project.getId());
	}
	
	@RequestMapping(value = "/projects", method = RequestMethod.GET)
	public Iterable<Project> getAllProjects() {
		Iterable<Project> list = projectService.getProjectList();
		for (Project each : list) {
			System.out.println(each.getName());
		}
		return list;
	}

}
