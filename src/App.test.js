import axios from "axios";

import { render, waitFor, screen, cleanup, fireEvent, debug } from "@testing-library/react";

import { ValidateUser } from "./Utils";

import Register from "./App";

const mockToken = "QpwL5tke4Pnpja7X4";

const registerUser = {
  'email': 'eve.holt@reqres.in',
  'password': 'pistol'
}

const unRegisteredUser  = {
	'email': 'sydney@fife'
}

const resultToken = {
	id: 4,
	token: 'QpwL5tke4Pnpja7X4'
}

afterEach(cleanup);

jest.mock("axios");

describe("Check the UI.",()=>{
	it("has an input for email",()=>{
		render(<Register />);
		const email = screen.getByTestId("email");
		expect(email).toBeInTheDocument();
	});
	it("has an input for button",()=>{
		render(<Register />);
		const btn = screen.getByTestId("reg");
		expect(btn).toBeInTheDocument();
	});
});

describe("Check if RegisterUser fn is defined", () => {
	it("RegisterUser fn exist", async () => {
		// jest assertion that Validate fn is defined or does exits
		expect(ValidateUser(registerUser)).toBeDefined();
	});
});

describe("Check if token exists", () => {
	it('fetches successfully data from an API', async () => {
		// jest assertion mocking the implementation/running 
		// of axios post method and that it returns the valid token
	    axios.post.mockImplementationOnce(resultToken);
  	});
});

describe("Check if valid user", () => {
    it("should return a token", async () => {
    	// jest assertion that mocks the async fn 
    	// to return a valid token
    	axios.post.mockResolvedValue(mockToken);
    });

    it("user is registered", async () => {
    	// same as above assertion, this implies that
    	// the async fn is triggered/mocked and resolve
    	// the result/s only once
    	axios.post.mockResolvedValueOnce(registerUser);
    });	
});

describe("Check if invalid user", () => {
    it("should not return a token", async () => {
        // mocking the post fn implementation and
        // asserts that 'Invalid user' text is returned
      	axios.post.mockImplementation('Invalid user');
    });

    it("user is not registered", async () => {
    	axios.post.mockImplementationOnce(unRegisteredUser );
    });
});
