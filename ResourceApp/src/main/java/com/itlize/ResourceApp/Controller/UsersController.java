package com.itlize.ResourceApp.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.itlize.ResourceApp.domain.Users;
import com.itlize.ResourceApp.service.UsersService;

@RestController
@EnableAutoConfiguration
public class UsersController {

	@Autowired
	UsersService usersService;
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public Users loginValidation(@RequestBody Users user) throws Exception {
		String email = user.getEmail();
		String password = user.getPassword();
		return usersService.loginValidation(email, password);
//		return usersService.getUserByUsername(user.getEmail());
	}
	
	@RequestMapping(value = "/signup", method = RequestMethod.POST)
	public void signupProcess(@RequestBody Users user) {
		user.setRoles("USER");
		usersService.createUser(user);
	}
	
}
