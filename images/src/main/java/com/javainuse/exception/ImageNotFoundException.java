package com.javainuse.exception;

@SuppressWarnings("serial")
public class ImageNotFoundException extends Exception {
	public ImageNotFoundException(String error_Msg) {
		super(error_Msg);
	}
}
