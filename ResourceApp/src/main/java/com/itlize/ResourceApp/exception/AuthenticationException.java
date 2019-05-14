package com.itlize.ResourceApp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class AuthenticationException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	
	public AuthenticationException () {
		super("Invalid Username or Password!!!");
	}

}
