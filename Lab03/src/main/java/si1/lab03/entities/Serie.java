package si1.lab03.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity(name="Serie")
//@Table(name="series")
public class Serie {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@Column
	@JsonProperty(value="imdbID")
	private String imdb;
	@Column
	@JsonProperty(value="Title")
	private String title;
	@Column
	@JsonProperty(value="Plot")
	private String plot;
	@Column
	@JsonProperty(value="imdbRating")
	private String imdbRating;
	@Column
	@JsonProperty(value="MyScore")
	private String myScore;
	@Column
	@JsonProperty(value="LastEpisode")
	private String lastEpisode;
	@Column
	@JsonProperty(value="Poster")
	private String Poster;
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((imdb == null) ? 0 : imdb.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Serie other = (Serie) obj;
		if (imdb == null) {
			if (other.imdb != null)
				return false;
		} else if (!imdb.equals(other.imdb))
			return false;
		return true;
	}
	
	public Long getId() {
		return this.id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
}
