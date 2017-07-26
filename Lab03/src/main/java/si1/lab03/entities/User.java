package si1.lab03.entities;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
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
	@OneToMany
	private Set<Serie> series;
	@OneToMany
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
		this.series.remove(serie);
		this.series.add(serie);	
	}

	public boolean addToWatchlist(Serie serie) {
		return this.watchList.add(serie);
	}
	
	public boolean removeFromMySeries(Serie serie) {
		return this.series.remove(serie);
	}
	
	public boolean removeFromWatchlist(Serie serie) {
		return this.watchList.remove(serie);
	}

	public UserDTO getDTO() {
		return new UserDTO(this.id, this.name, this.email, this.series, this.watchList);
	}

}
