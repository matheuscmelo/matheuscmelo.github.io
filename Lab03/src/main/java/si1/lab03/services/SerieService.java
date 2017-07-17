package si1.lab03.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import si1.lab03.entities.Serie;
import si1.lab03.repositories.SerieRepository;

@Service
public class SerieService {
	@Autowired
	private SerieRepository series;
	
	public void saveSerie(Serie serie) {
		series.save(serie);
		
	}
	
	public Serie getSerie(Long id) {
		return series.findOne(id);
	}
}	
