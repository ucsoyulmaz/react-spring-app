package com.cemsoyulmazboot.springboot.model.Repositories;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.cemsoyulmazboot.springboot.model.Users;

public interface UsersRepository extends MongoRepository<Users, String> {
    Users findBy_id(ObjectId _id);
    Users findByUsername(String username);
}
