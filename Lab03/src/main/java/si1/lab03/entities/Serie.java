package si1.lab03.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity(name="Serie")
public class Serie {
	@Id
	@JsonProperty(value="id")
	private Long id;
	@Column
	@JsonProperty(value="imdbID")
	private String imdbID;
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
	@JsonProperty(value="Poster")
	private String Poster;
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((imdbID == null) ? 0 : imdbID.hashCode());
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
		if (imdbID == null) {
			if (other.imdbID != null)
				return false;
		} else if (!imdbID.equals(other.imdbID))
			return false;
		return true;
	}
	
	
}
