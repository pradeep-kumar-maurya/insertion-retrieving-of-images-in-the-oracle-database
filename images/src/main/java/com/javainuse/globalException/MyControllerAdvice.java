package com.javainuse.globalException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.javainuse.exception.ImageNotFoundException;

@ControllerAdvice
public class MyControllerAdvice {
	
	@ExceptionHandler
	public ResponseEntity<String> imageNotFound(ImageNotFoundException i){
		return new ResponseEntity<String>(i.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	}

}
