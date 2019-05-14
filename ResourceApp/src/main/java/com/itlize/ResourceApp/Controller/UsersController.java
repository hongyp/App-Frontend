package com.itlize.ResourceApp.Controller;

import static org.springframework.http.ResponseEntity.ok;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.itlize.ResourceApp.domain.Users;
import com.itlize.ResourceApp.security.JwtTokenProvider;
import com.itlize.ResourceApp.service.UsersService;

@RestController
@EnableAutoConfiguration
public class UsersController {

	@Autowired
	UsersService usersService;
	@Autowired
	JwtTokenProvider jwtTokenProvider;
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public ResponseEntity<?> loginValidation(@RequestBody Users user) throws Exception {
		String email = user.getEmail();
		String password = user.getPassword();
		usersService.loginValidation(email, password);
		String token = jwtTokenProvider.createTokenWithClaim(email);
		System.err.println(token);
//		jwtTokenProvider.verifyToken(token);
		Map<Object, Object> model = new HashMap<>();
        model.put("username", email);
        model.put("token", token);
        return ok(model);
	}
	
	@RequestMapping(value = "/signup", method = RequestMethod.POST)
	public void signupProcess(@RequestBody Users user) {
		user.setRoles("USER");
		usersService.createUser(user);
	}
	
}
