package si1.lab03.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name="Serie")
public class Serie {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@Column
	private String title;
	@Column
	private String plot;
	@Column
	private String imdbRating;
	@Column
	private String myScore;
	@Column
	private String linkImage;
}
