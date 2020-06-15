package com.cemsoyulmazboot.springboot.controller;

import org.bson.types.ObjectId;
import com.cemsoyulmazboot.springboot.model.Repositories.ContentsRepository;
import com.cemsoyulmazboot.springboot.model.Contents;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.method.annotation.RequestResponseBodyMethodProcessor;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/contents")

public class ContentsController {
    @Autowired
    private ContentsRepository repository;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public List<Contents> getAllContents() {
        return repository.findAll();
    }

    @RequestMapping(value = "/{pageOfContent}", method = RequestMethod.GET)
    public ResponseEntity<List<Contents>> getContent(@PathVariable("pageOfContent") String page) {
        List<Contents> content = repository.findByPageOfContent(page);
        if (content == null) {
            ObjectId cem = new ObjectId();
            List<Contents>  nullContents = new ArrayList<Contents>();
            return new ResponseEntity<List<Contents>>(nullContents, HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<Contents>>(content, HttpStatus.OK);
    }

}

