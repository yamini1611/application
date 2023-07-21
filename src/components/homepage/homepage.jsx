import React from "react";
import '../homepage/homepage.css'
import { Link } from "react-router-dom";
const ProtectedPage = ({ name }) => {

  return (
    <div>
      <p ></p>
        <div className="row" id="row">
<div className="col" id="col">
        <h1 data-text="Where teaching and learning come together" className="heading">Where teaching and learning come together</h1> 
        <p data-text="Google Classroom helps educators create engaging learning experiences they can personalize, manage, and measure. Classroom is part of Google Workspace for Education, which empowers your institution with simple, safer, collaborative tools." className="gfe-headline gfe-headline--headline-5 gfe-mod-spacer-2-top">Google Classroom helps educators create engaging learning experiences they can personalize, manage, and measure. Classroom is part of Google Workspace for Education, which empowers your institution with simple, safer, collaborative tools.</p>
        <ul className="gfe-rows gfe-no-bullet gfe-rows--buttons gfe-rows--mobile-stacked gfe-mod-spacer-2-top"><li className="gfe-rows__item  gfe-mod-valign-middle gfe-rows__item--margin-right-2 gfe-mod-spacer-2-top"><a className="gfe-button gfe-button--high-emphasis gfe-button--middle-align" href="https://edu.google.com/intl/ALL_in/workspace-for-education/classroom/editions/?utm_source=10a_googleEDU&amp;utm_medium=organic_search&amp;utm_campaign=EDU-global-operational-cs-edu-fa-fs-om-non-paid-organic-search&amp;utm_content=-&amp;utm_term=-" data-g-type="internal" data-g-action="page intro cta click" data-g-category="component" data-g-label="Where teaching and learning come together - Compare editions - /intl/ALL_in/workspace-for-education/classroom/editions/" data-ga4="{&quot;click&quot;: {&quot;event&quot;: &quot;cta_click&quot;, &quot;link_text&quot;: &quot;Compare editions&quot;, &quot;link_type&quot;: &quot;internal&quot;, &quot;link_url&quot;: &quot;/workspace-for-education/classroom/editions/&quot;, &quot;module_name&quot;: &quot;&quot;, &quot;position&quot;: 1, &quot;section_header&quot;: &quot;&quot;}}" tabIndex="0">
    <span className="gfe-button__label">Compare editions</span>
  </a></li><li className="gfe-rows__item  gfe-mod-valign-middle gfe-mod-spacer-2-top gfe-mod-spacer-2-top-sm-only"><a className="gfe-button gfe-button--medium-emphasis gfe-button--middle-align" href="https://accounts.google.com/ServiceLogin?continue=https%3A%2F%2Fclassroom.google.com&amp;passive=true" target="_blank" rel="noopener noreferrer" data-g-type="outbound" data-g-action="page intro cta click" data-g-category="component" data-g-label="Where teaching and learning come together - Sign in to Classroom - https://accounts.google.com/ServiceLogin?continue=https%3A%2F%2Fclassroom.google.com&amp;passive=true" data-ga4="{&quot;click&quot;: {&quot;event&quot;: &quot;cta_click&quot;, &quot;link_text&quot;: &quot;Sign in to Classroom&quot;, &quot;link_type&quot;: &quot;external&quot;, &quot;link_url&quot;: &quot;https://accounts.google.com/ServiceLogin?continue=https%3A%2F%2Fclassroom.google.com&amp;passive=true&quot;, &quot;module_name&quot;: &quot;&quot;, &quot;position&quot;: 2, &quot;section_header&quot;: &quot;&quot;}}" tabIndex="0">
    <span className="gfe-button__label">Sign in to Classroom</span>
  </a></li><br></br>
  <li>
    <Link to="/View"><span className="gfe-button__label">Go to Class</span></Link>
  </li>
  </ul>
  
</div>
<div className="col"  id="col"> 
<img src="https://lh3.googleusercontent.com/KyRRnjxu7sK27P4WYHUckt-8ilJrLZQSZ_F_r_nA_rnGhsCvTuCvGC_xVMkNWVQCPzx1e5BybYm3ZvC-REz8bJmQDZW0zTPdAU2b2juv-E9AgUtBUCQ=w1296-v0-e30" alt="" id='img' height={550} width={650}></img>

</div>
   
    </div>
      
      
    </div>
  );
};

export default ProtectedPage;