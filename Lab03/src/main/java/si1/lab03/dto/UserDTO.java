package si1.lab03.dto;

import java.util.Set;

import si1.lab03.entities.Serie;

public class UserDTO {
	private Long id;
	private String username;
	private Set<Serie> series;
	private Set<Serie> watchList;
	
	public UserDTO(Long id, String username, Set<Serie> series, Set<Serie> watchList){
		this.id = id;
		this.username = username;
		this.series = series;
		this.watchList = watchList;
	}
	
	public Long getId() {
		return id;
	}
	
	public String getUsername() {
		return username;
	}
	
	
	
}
