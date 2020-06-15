package com.cemsoyulmazboot.springboot.model.Repositories;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.cemsoyulmazboot.springboot.model.Contents;
import org.springframework.http.ResponseEntity;

import java.util.List;


public interface ContentsRepository extends MongoRepository<Contents, String> {
    Contents findBy_id(ObjectId _id);
    List<Contents> findByPageOfContent(String pageOfContent);
}
