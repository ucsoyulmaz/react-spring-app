package com.cemsoyulmazboot.springboot.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

public class Users {
    @Id
    public ObjectId _id;

    public String password;
    public String username;

    public Users(ObjectId _id,String password, String username){
        this._id = _id;
        this.password = password;
        this.username = username;
    }

    public String get_id() { return _id.toHexString(); }
    public void set_id(ObjectId _id) { this._id = _id; }


    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }


    public String getUsername() { return username; }
    public void setUsername(String tagname) { this.username = tagname; }
}
