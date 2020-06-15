package com.cemsoyulmazboot.springboot.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

public class Contents {
    @Id
    public ObjectId _id;

    public String pageOfContent;
    public String titleOfContent;
    public String textOfContent;
    public String imageOfContent;
    public String lastUpdatedBy;
    public String divId;


    public Contents(ObjectId _id,String pageOfContent, String titleOfContent, String textOfContent, String imageOfContent, String lastUpdatedBy, String divId){
        this._id = _id;
        this.pageOfContent = pageOfContent;
        this.titleOfContent = titleOfContent;
        this.textOfContent = textOfContent;
        this.imageOfContent = imageOfContent;
        this.lastUpdatedBy = lastUpdatedBy;
        this.divId = divId;
    }

    public Contents(String pageOfContent, String titleOfContent, String textOfContent, String imageOfContent, String lastUpdatedBy, String divId){
        this.pageOfContent = pageOfContent;
        this.titleOfContent = titleOfContent;
        this.textOfContent = textOfContent;
        this.imageOfContent = imageOfContent;
        this.lastUpdatedBy = lastUpdatedBy;
        this.divId = divId;
    }


    public Contents(){

    }


    public String get_id() { return _id.toHexString(); }
    public void set_id(ObjectId _id) { this._id = _id; }


    public String getPageOfContent() { return pageOfContent; }
    public void setPageOfContent(String pageOfContent) { this.pageOfContent = pageOfContent; }


    public String getTitleOfContent() { return titleOfContent; }
    public void setTitleOfContent(String titleOfContent) { this.titleOfContent = titleOfContent; }

    public String getTextOfContent() { return textOfContent; }
    public void setTextOfContent(String textOfContent) { this.textOfContent = textOfContent; }

    public String getImageOfContent() { return imageOfContent; }
    public void setImageOfContent(String imageOfContent) { this.imageOfContent = imageOfContent; }

    public String getLastUpdatedBy() { return lastUpdatedBy; }
    public void setLastUpdatedBy(String lastUpdatedBy) { this.lastUpdatedBy = lastUpdatedBy; }

    public String getDivId() { return divId; }
    public void setDivId(String divId) { this.divId = divId; }
}
