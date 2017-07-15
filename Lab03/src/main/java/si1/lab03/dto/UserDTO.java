package si1.lab03.dto;

import java.util.HashSet;
import java.util.Set;

import si1.lab03.entities.Serie;

public class UserDTO {
	private Long id;
	private String username;
	//por algum motivo essas listas nao estao entrando no json caso sejam private
	public Set<Serie> series;
	public Set<Serie> watchList;

	public UserDTO(Long id, String username, Set<Serie> series, Set<Serie> watchList) {
		if (series == null) {
			series = new HashSet<>();
		}
		if (watchList == null) {
			watchList = new HashSet<>();
		}
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
