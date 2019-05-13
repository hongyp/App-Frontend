package com.itlize.ResourceApp.service;

import com.itlize.ResourceApp.domain.Users;

public interface UsersService {
	
	void createUser(Users user);
	Users getUserByUsername(String email) throws Exception;
	void updateUser(Users user);
	
	Users loginValidation(String username, String password) throws Exception;
}
