package com.itlize.ResourceApp.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.itlize.ResourceApp.exception.ApiErrorResponse;
import com.itlize.ResourceApp.exception.AuthenticationException;
import com.itlize.ResourceApp.exception.InfoConflictException;
import com.itlize.ResourceApp.exception.UserNotFoundException;

// Tag for handle the exceptions globally
@RestControllerAdvice
@CrossOrigin(origins="http://localhost:3000")
public class WebExceptionController {

	@ExceptionHandler(value = UserNotFoundException.class)
	public ResponseEntity<Object> userNotFound(UserNotFoundException exception){
//		return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
		
//		ApiErrorResponse response = new ApiErrorResponse.ApiErrorResonseBuilder()
//				.withStatus(HttpStatus.NOT_FOUND)
//				.withError_code(String.valueOf(HttpStatus.NOT_FOUND.value()))
//				.withMessage(exception.getLocalizedMessage())
//				.withDetail(exception.toString())
//				.build();
//		return new ResponseEntity<>(response, response.getStatus());
		return response(HttpStatus.NOT_FOUND, exception);
	}
	
	@ExceptionHandler(value = InfoConflictException.class)
	public ResponseEntity<Object> infoConflict(InfoConflictException exception) {
		return response(HttpStatus.CONFLICT, exception);
	}
	
	@ExceptionHandler(value = AuthenticationException.class)
	public ResponseEntity<Object> failedAuthenticaiton(AuthenticationException exception) {
		return response(HttpStatus.UNAUTHORIZED, exception);
	}
	
	public ResponseEntity<Object> response(HttpStatus status, Exception exception) {
		ApiErrorResponse response = new ApiErrorResponse.ApiErrorResonseBuilder()
				.withStatus(status)
				.withError_code(String.valueOf(status.value()))
				.withMessage(exception.getLocalizedMessage())
				.withDetail(exception.toString())
				.build();
		return new ResponseEntity<>(response, response.getStatus());
	}
}
