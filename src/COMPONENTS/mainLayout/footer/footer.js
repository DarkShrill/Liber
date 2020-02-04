import React from "react";

import footerCss from "../../../CSS/mainLayout/footer/footer.css";

export default class Footer extends React.Component{ 
   constructor(props){ 
      super(props); 
   }
   render(){ 
      return( 
        <div className = "container-fluid footer">
            <div className = "row">
            <div className = "col mr-auto">
                <p>Book Seller Company</p>
                <p>Via Paolo Dell'Aguzzo, 56</p>
                <p>Senigallia, Ancona, Italia</p>
                <p>info@paolodellaguzzo.com</p>
            </div>
            <div className = "col">
                <div className = "pull-right">
                    <a href="https://www.facebook.com/edoardopapa/" target="_blank">
                        <i className = "fa fa-facebook-official fa-2x"></i>
                    </a>
                    <a href="https://twitter.com/EdoardoPapa" target="_blank">
                        <i className = "fa fa-twitter fa-2x"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/edoardopapa" target="_blank">
                        <i className = "fa fa-linkedin-square fa-2x"></i>
                    </a>
                    <a href="https://plus.google.com/u/0/+edoardopapa" target="_blank">
                        <i className = "fa fa-google-plus-official fa-2x"></i>
                    </a>
                </div>
            </div>
            </div>
        </div>
      ); 
   }
}
