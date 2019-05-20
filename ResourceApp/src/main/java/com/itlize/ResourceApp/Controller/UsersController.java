package com.itlize.ResourceApp.Controller;

import static org.springframework.http.ResponseEntity.ok;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.itlize.ResourceApp.domain.Users;
import com.itlize.ResourceApp.exception.AuthenticationException;
import com.itlize.ResourceApp.exception.InfoConflictException;
import com.itlize.ResourceApp.exception.UserNotFoundException;
import com.itlize.ResourceApp.security.JwtTokenProvider;
import com.itlize.ResourceApp.service.UsersService;

@RestController
@EnableAutoConfiguration
@CrossOrigin(origins="http://localhost:3000")
public class UsersController {

	@Autowired
	UsersService usersService;
	@Autowired
	JwtTokenProvider jwtTokenProvider;
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public ResponseEntity<?> loginValidation(@RequestBody Users user) throws Throwable {
		String email = user.getEmail();
		String password = user.getPassword();
		Map<Object, Object> model = new HashMap<>();
		try {
			usersService.loginValidation(email, password);
			String token = jwtTokenProvider.createTokenWithClaim(email);
			System.err.println(token);
//		jwtTokenProvider.verifyToken(token);
			model.put("username", email);
//			model.put("firstName", user.getFirstName());
//			model.put("lastName", user.getLastName());
//			model.put("roles", user.getRoles());
			model.put("token", token);
			return ok(model);
		} catch (AuthenticationException authenticationException) {
//			e.printStackTrace();
			throw authenticationException;
		} catch (UserNotFoundException userNotFoundException) {
			throw userNotFoundException;
		} catch (Exception e) {
			throw new Exception();
		}
	}
	
	@RequestMapping(value = "/signup", method = RequestMethod.POST)
	public ResponseEntity<?> signupProcess(@RequestBody Users user) throws Throwable {
		Map<Object, Object> model = new HashMap<>();
		try {
			user.setRoles("USER");
			usersService.createUser(user);
			model.put("username", user.getEmail());
			model.put("email", user.getEmail());
			model.put("firstname", user.getFirstName());
			model.put("lastname", user.getLastName());
			return ok(model);
		} catch (InfoConflictException infoConflictException) {
			throw infoConflictException;
		} catch (Exception exception) {
			throw exception;
		}
		
	}
	
}
