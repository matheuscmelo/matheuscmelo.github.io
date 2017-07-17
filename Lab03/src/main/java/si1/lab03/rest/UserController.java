package si1.lab03.rest;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import si1.lab03.dto.UserDTO;
import si1.lab03.entities.Serie;
import si1.lab03.entities.User;
import si1.lab03.services.SerieService;
import si1.lab03.services.UserService;

@RestController
@RequestMapping(value = "/api/user/")
public class UserController {

	@Autowired
	private UserService users;
	
	@Autowired
	private SerieService series;

	@RequestMapping(value = "register/", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserDTO> registerUser(@RequestBody User user) {
		users.saveUser(user);
		UserDTO userDTO = user.getDTO();
		return new ResponseEntity<UserDTO>(userDTO, HttpStatus.OK);
	}

	@RequestMapping(value = "id/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserDTO> getUser(@PathVariable("id") Long id) {
		User user = users.getUser(id);
		
		if (user == null) {
			return new ResponseEntity<UserDTO>(HttpStatus.NOT_FOUND);
		}
		
		UserDTO userDTO = user.getDTO();
		return new ResponseEntity<UserDTO>(userDTO, HttpStatus.OK);
	}

	@RequestMapping(value = "validate/", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserDTO> validateUser(@RequestBody User user) {
		Long userId = users.getUserIdByEmail(user.getEmail());
		User registeredUser = users.getUser(userId);
		if (registeredUser == null || !registeredUser.getPassword().equals(user.getPassword())) {
			return new ResponseEntity<UserDTO>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<UserDTO>(registeredUser.getDTO(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "id/{userId}/series", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
	public void addToMySeries(@PathVariable("userId") Long userId, @RequestBody Serie serie) {
		System.out.println(serie.getId());
		User user = users.getUser(userId);
		if(user.addToMySeries(serie)) {
			series.saveSerie(serie);
			users.saveUser(user);
		}
	}
	
	@RequestMapping(value = "id/{userId}/watchlist", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
	public void addToWatchlist(@PathVariable("userId") Long userId, @RequestBody Serie serie) {
		System.out.println(serie.getId());
		User user = users.getUser(userId);
		if(user.addToWatchlist(serie)) {
			series.saveSerie(serie);
			users.saveUser(user);
		}
	}

}
