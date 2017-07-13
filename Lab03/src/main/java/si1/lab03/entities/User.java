package si1.lab03.entities;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import si1.lab03.dto.UserDTO;

@Entity(name="User")
@Table(name="users")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@Column
	private String username;
	@Column
	private String password;
	@ElementCollection
	private Set<Serie> series;
	@ElementCollection
	private Set<Serie> watchList;

	public String getUsername() {
		return username;
	}

	public Long getId() {
		return id;
	}
	
	public void addToMySeries(Serie serie) {
		this.series.add(serie);
	}
	
	public void addToWatchlist(Serie serie) {
		this.watchList.add(serie);
	}
	
	public UserDTO getDTO() {
		return new UserDTO(this.id, this.username, this.series, this.watchList);
	}
	
}
