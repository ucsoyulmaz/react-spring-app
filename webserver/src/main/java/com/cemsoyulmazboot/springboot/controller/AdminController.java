package com.cemsoyulmazboot.springboot.controller;

import org.bson.types.ObjectId;
import com.cemsoyulmazboot.springboot.model.Repositories.ContentsRepository;
import com.cemsoyulmazboot.springboot.model.Contents;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/contentadmin")

public class AdminController {
    @Autowired
    private ContentsRepository repository;

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT, produces = "application/json", consumes = "application/json")
    public ResponseEntity<Contents> modifyContentById(@PathVariable("id") ObjectId id, @Valid @RequestBody Contents content) {

        Contents currentContent = repository.findBy_id(id);

        if (currentContent == null) {
            ObjectId cem = new ObjectId();
            Contents  nullContent = new Contents(cem, "none","none", "none", "none", "none", "none");
            return new ResponseEntity<Contents>(nullContent, HttpStatus.NO_CONTENT);
        }

        currentContent.setTitleOfContent(content.getTitleOfContent());
        currentContent.setTextOfContent(content.getTextOfContent());
        currentContent.setImageOfContent(content.getImageOfContent());
        currentContent.setLastUpdatedBy(content.getLastUpdatedBy());
        currentContent.setDivId(content.getDivId());

        repository.save(currentContent);
        return new ResponseEntity<Contents>(currentContent, HttpStatus.OK);
    }

    @RequestMapping(value = "/", method = RequestMethod.POST, produces = "application/json", consumes = "application/json")
    public ResponseEntity<Contents> addContent( @Valid @RequestBody Contents content) {


        if (content == null) {
            ObjectId cem = new ObjectId();
            Contents  nullContent = new Contents(cem, "none","none", "none", "none", "none", "none");
            return new ResponseEntity<Contents>(nullContent, HttpStatus.NO_CONTENT);
        }


        repository.insert(content);
        return new ResponseEntity<Contents>(content, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Contents>  deleteContent(@PathVariable ObjectId id) {

        repository.delete(repository.findBy_id(id));
        ObjectId cem = new ObjectId();
        Contents  nullContent = new Contents(cem, "deleted","deleted", "deleted", "deleted", "deleted", "deleted");
        return new ResponseEntity<Contents>(nullContent, HttpStatus.OK);
    }

}

