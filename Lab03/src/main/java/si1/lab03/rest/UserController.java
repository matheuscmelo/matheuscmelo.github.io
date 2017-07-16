package si1.lab03.rest;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import si1.lab03.dto.UserDTO;
import si1.lab03.entities.Serie;
import si1.lab03.entities.User;
import si1.lab03.repositories.UserRepository;

@RestController
@RequestMapping(value = "/api/user/")
public class UserController {

	@Autowired
	private UserRepository users;

	@RequestMapping(value = "register/", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserDTO> registerUser(@RequestBody User user) {
		users.save(user);
		UserDTO userDTO = user.getDTO();
		return new ResponseEntity<UserDTO>(userDTO, HttpStatus.OK);
	}

	@RequestMapping(value = "id/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserDTO> getUser(@PathVariable("id") Long id) {
		User user;
		try {
			user = users.getOne(id);
		} catch (EntityNotFoundException e) {
			return new ResponseEntity<UserDTO>(HttpStatus.NOT_FOUND);
		}
		UserDTO userDTO = user.getDTO();
		return new ResponseEntity<UserDTO>(userDTO, HttpStatus.OK);
	}

	@RequestMapping(value = "validate/", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserDTO> validateUser(@RequestBody User user) {
		User registeredUser = users.getOne(user.getId());
		if (registeredUser == null) {
			return new ResponseEntity<UserDTO>(HttpStatus.NOT_FOUND);
		}

		if (!registeredUser.getPassword().equals(user.getPassword())) {
			return new ResponseEntity<UserDTO>(HttpStatus.UNAUTHORIZED);
		} else {
			return new ResponseEntity<UserDTO>(registeredUser.getDTO(), HttpStatus.OK);
		}
	}

	public void addSerie(@RequestParam("userId") Long userId, @RequestParam("serieId") Long serieId) {

	}

}
