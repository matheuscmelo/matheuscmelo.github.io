package si1.lab03.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import si1.lab03.entities.User;
import si1.lab03.repositories.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository users;
	
	public boolean registerUser(User user) {
		return false;
	}
	
}
