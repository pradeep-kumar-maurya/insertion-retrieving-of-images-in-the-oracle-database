package com.javainuse.db;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.javainuse.model.ImageModel;

@Repository
public interface ImageRepository extends JpaRepository<ImageModel, Integer>{
	
	@Query("select img from ImageModel img where name=?1")
	Optional<ImageModel> findByName(String name);
}
