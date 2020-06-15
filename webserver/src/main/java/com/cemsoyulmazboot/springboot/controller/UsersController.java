package com.cemsoyulmazboot.springboot.controller;

import org.bson.types.ObjectId;
import com.cemsoyulmazboot.springboot.model.Repositories.UsersRepository;
import com.cemsoyulmazboot.springboot.model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.servlet.mvc.method.annotation.RequestResponseBodyMethodProcessor;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/users")

public class UsersController {
    @Autowired
    private UsersRepository repository;

    @RequestMapping(value = "/loginresult", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Integer> isLoggedIn() {
        RequestResponseBodyMethodProcessor a = null;

        Map <String, Integer> result = new HashMap<String, Integer>();
        result.put("status", 1000);

        return result;
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public List<Users> getAllUsers() {
        return repository.findAll();
    }
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Users getUserById(@PathVariable("id") ObjectId id) {
        return repository.findBy_id(id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public void modifyUserById(@PathVariable("id") ObjectId id, @Valid @RequestBody Users users) {
        users.set_id(id);
        repository.save(users);
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public Users createUser(@Valid @RequestBody Users users) {
        users.set_id(ObjectId.get());
        repository.save(users);
        return users;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteUser(@PathVariable ObjectId id) {
        repository.delete(repository.findBy_id(id));
    }
}
