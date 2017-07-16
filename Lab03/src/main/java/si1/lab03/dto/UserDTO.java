package si1.lab03.dto;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonProperty;

import si1.lab03.entities.Serie;

public class UserDTO {
	@JsonProperty(value = "id")
	private Long id;
	@JsonProperty(value = "name")
	private String name;
	@JsonProperty(value = "email")
	private String email;
	@JsonProperty(value = "series")
	private Set<Serie> series;
	@JsonProperty(value = "watchList")
	private Set<Serie> watchList;

	public UserDTO(Long id, String name, String email, Set<Serie> series, Set<Serie> watchList) {
		if (series == null) {
			series = new HashSet<>();
		}
		if (watchList == null) {
			watchList = new HashSet<>();
		}
		this.id = id;
		this.name = name;
		this.email = email;
		this.series = series;
		this.watchList = watchList;
	}

	public Long getId() {
		return id;
	}

	public String getUsername() {
		return name;
	}

}
