package com.itlize.ResourceApp.service.impl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itlize.ResourceApp.DAO.UsersDAO;
import com.itlize.ResourceApp.domain.Users;
import com.itlize.ResourceApp.exception.AuthenticationException;
import com.itlize.ResourceApp.exception.InfoConflictException;
import com.itlize.ResourceApp.service.UsersService;

@Service
@Transactional
public class UsersServiceImpl implements UsersService {
	
	@Autowired
	UsersDAO usersDAO;

	@Override
	public void createUser(Users user) {
		// TODO Auto-generated method stub
		boolean userExists = usersDAO.existsByEmail(user.getEmail());
		if (userExists) {
			throw new InfoConflictException("Username");
		}
		usersDAO.save(user);
	}

	@Override
	public Users getUserByUsername(String email) {
		// TODO Auto-generated method stub
		boolean userExists = usersDAO.existsByEmail(email);
		if (!userExists) {
//			throw new UserNotFoundException(email);
			throw new AuthenticationException();
		}
		return usersDAO.findByEmail(email);
	}

	@Override
	public void updateUser(Users user) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Users loginValidation(String username, String password) {
		// TODO Auto-generated method stub
		Users user = this.getUserByUsername(username);
		String pwd = user.getPassword();
		if (!pwd.equals(password)) {
			throw new AuthenticationException();
		}
		return user;
	}

}
