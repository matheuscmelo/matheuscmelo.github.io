package si1.lab03.services;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import si1.lab03.entities.User;
import si1.lab03.repositories.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository users;
	
	public void saveUser(User user) {
		users.save(user);
	}
	
	public User getUser(Long id) {
		return users.findOne(id);
	}
	
	public Long getUserIdByEmail(String email) {
		String sql = "SELECT * FROM users WHERE email = ?";
		try {
			Connection connection = DriverManager.getConnection("jdbc:postgresql:lab03", "postgres", "12345");
			
			PreparedStatement stmt = connection.prepareStatement(sql);
			stmt.setString(1, email);
			
			ResultSet executeQuery = stmt.executeQuery();
			
			if(executeQuery.next()) {
				Long id = executeQuery.getLong("ID");
				return id;
			}
			stmt.close();
			connection.close();
		} catch (SQLException e) {
			System.err.println(e.getMessage());
		}
		return (long) -1;
	}
	
}
