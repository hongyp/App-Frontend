package com.itlize.ResourceApp.exception;

import org.springframework.http.HttpStatus;

public class ApiErrorResponse {
	
	private HttpStatus status;
	private String error_code;
	private String message;
	private String detail;
	
	// Builder
	public static final class ApiErrorResonseBuilder {
		private HttpStatus status;
		private String error_code;
		private String message;
		private String detail;
		
		public ApiErrorResonseBuilder() {
		}
		
		public static ApiErrorResonseBuilder anApiErrorResonseBuilder() {
			return new ApiErrorResonseBuilder();
		}
		
		public ApiErrorResonseBuilder withStatus(HttpStatus status) {
			this.status = status;
			return this;
		}
		
		public ApiErrorResonseBuilder withError_code(String error_code) {
			this.error_code = error_code;
			return this;
		}
		
		public ApiErrorResonseBuilder withMessage(String message) {
			this.message = message;
			return this;
		}
		
		public ApiErrorResonseBuilder withDetail(String detail) {
			this.detail = detail;
			return this;
		}
		
		public ApiErrorResponse build() {
			ApiErrorResponse apiErrorResponse = new ApiErrorResponse();
			apiErrorResponse.status = this.status;
			apiErrorResponse.error_code = this.error_code;
			apiErrorResponse.message = this.message;
			apiErrorResponse.detail = this.detail;
			return apiErrorResponse;
		}
	}

	// Setter & Getter
	public HttpStatus getStatus() {
		return status;
	}

	public void setStatus(HttpStatus status) {
		this.status = status;
	}

	public String getError_code() {
		return error_code;
	}

	public void setError_code(String error_code) {
		this.error_code = error_code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getDetail() {
		return detail;
	}

	public void setDetail(String detail) {
		this.detail = detail;
	}
	
}
