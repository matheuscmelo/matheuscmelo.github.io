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

@Entity(name = "User")
@Table(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@Column
	private String name;
	@Column
	private String email;
	@Column
	private String password;
	@ElementCollection
	private Set<Serie> series;
	@ElementCollection
	private Set<Serie> watchList;

	public String getName() {
		return name;
	}

	public Long getId() {
		return id;
	}

	public String getPassword() {
		return password;
	}
	
	public String getEmail() {
		return this.email;
	}

	public void addToMySeries(Serie serie) {
		this.series.add(serie);
	}

	public void addToWatchlist(Serie serie) {
		this.watchList.add(serie);
	}

	public UserDTO getDTO() {
		return new UserDTO(this.id, this.name, this.email, this.series, this.watchList);
	}

}
