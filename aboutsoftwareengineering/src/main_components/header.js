import React, { Component } from 'react';
import './header.css';

export const Header = ({main_title}) =>
   <div className = "header_position">
       <div className = "line_header" />
       <div className = "header_style">
           <div className = "header_title">
            {main_title}
           </div>
        </div>
   </div>
